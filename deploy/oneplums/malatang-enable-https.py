#!/usr/bin/python3
"""Enable this site's TLS once its A record reaches this server; leave other sites alone."""
import re, fcntl, hashlib, pathlib, shutil, socket, subprocess, time
DOMAIN='malatang.oneplums.cn'
IP='SERVER_IPV4'
SITE=pathlib.Path('/etc/nginx/sites-available')/DOMAIN
STATE=pathlib.Path('/var/lib/malatang-deploy')
STATE.mkdir(mode=0o700,exist_ok=True)
lock=(STATE/'https.lock').open('w')
try: fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
except BlockingIOError: raise SystemExit(0)

def run(*args): return subprocess.run(args,check=True)
try: addresses={item[4][0] for item in socket.getaddrinfo(DOMAIN,80,socket.AF_INET)}
except socket.gaierror:
    print('Waiting for the domain A record.');raise SystemExit(0)
if addresses!={IP}:
    print('Waiting for the domain A record to point only to this server.');raise SystemExit(0)
body=SITE.read_text()
expected=(STATE/'http-config.sha256').read_text().strip()
if hashlib.sha256(body.encode()).hexdigest()!=expected:
    if (STATE/'https-enabled').exists():
        run('/bin/systemctl','disable','--now','malatang-https-bootstrap.timer');raise SystemExit(0)
    raise RuntimeError('Site config changed since deployment; refusing to overwrite it.')
attempt=STATE/'last-certificate-attempt'
if attempt.exists() and time.time()-attempt.stat().st_mtime<10800:
    print('Waiting before retrying a previous certificate attempt.');raise SystemExit(0)
# Reuse the existing production ACME account. Do not register or accept new terms.
renewal=pathlib.Path('/etc/letsencrypt/renewal/regex.oneplums.cn.conf')
match=re.search(r'(?m)^account\s*=\s*([a-zA-Z0-9_-]+)\s*$',renewal.read_text())
account=match.group(1) if match else ''
server='https://acme-v02.api.letsencrypt.org/directory'
accounts=pathlib.Path('/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory')
if not account or not (accounts/account).is_dir():
    candidates=[p.name for p in accounts.iterdir() if p.is_dir()]
    if len(candidates)!=1: raise RuntimeError('Cannot select a unique existing production ACME account.')
    account=candidates[0]
attempt.touch()
run('/usr/local/bin/certbot','certonly','--non-interactive','--webroot','-w','/var/www/letsencrypt',
    '--server',server,'--account',account,'--cert-name',DOMAIN,'-d',DOMAIN,'--keep-until-expiring',
    '--deploy-hook','/usr/sbin/nginx -t && /bin/systemctl reload nginx')
cert=pathlib.Path('/etc/letsencrypt/live')/DOMAIN
if not (cert/'fullchain.pem').exists() or not (cert/'privkey.pem').exists(): raise RuntimeError('Certificate files missing.')
backup=STATE/'http-config.backup';shutil.copy2(SITE,backup)
tls=body.replace('listen 80;','listen 443 ssl;').replace('listen [::]:80;','listen [::]:443 ssl;')
tls=tls.replace('    server_name '+DOMAIN+';',f'    server_name {DOMAIN};\n    ssl_certificate {cert}/fullchain.pem;\n    ssl_certificate_key {cert}/privkey.pem;\n    include /etc/letsencrypt/options-ssl-nginx.conf;')
redirect='''server {
    listen 80;
    listen [::]:80;
    server_name malatang.oneplums.cn;
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
        default_type text/plain;
        try_files $uri =404;
    }
    location / { return 301 https://malatang.oneplums.cn$request_uri; }
}
'''
# Atomic replacement, validate, and retain the working HTTP config on failure.
temporary=SITE.with_name(DOMAIN+'.pending')
temporary.write_text(redirect+'\n'+tls);temporary.chmod(0o644);temporary.replace(SITE)
try:
    run('/usr/sbin/nginx','-t')
    run('/bin/systemctl','reload','nginx')
except Exception:
    shutil.copy2(backup,SITE);run('/usr/sbin/nginx','-t');run('/bin/systemctl','reload','nginx');raise
(STATE/'https-enabled').write_text(time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())+'\n')
run('/bin/systemctl','disable','--now','malatang-https-bootstrap.timer')
print('HTTPS enabled; certificate renewal is handled by the existing certbot renewal timer.')
