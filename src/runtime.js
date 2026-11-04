// Build-time constants keep production free of test controls and respect subpath deployments.
export const DEV_TOOLS = typeof __DAZI_DEV_TOOLS__ !== 'undefined' ? __DAZI_DEV_TOOLS__ : true;
export const basePath = typeof __DAZI_BASE__ !== 'undefined' ? __DAZI_BASE__ : '/';
const assets = typeof __DAZI_ASSETS__ !== 'undefined' ? __DAZI_ASSETS__ : {};
export function assetUrl(path) {
  if (/^(?:https?:|data:|blob:)/.test(path)) return path;
  const relative = String(path).replace(/^\/+/, '');
  return assets[relative] || basePath + relative;
}
export const isAdminPath = () => location.pathname.startsWith(basePath + 'admin');
