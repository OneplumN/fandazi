const KEYS=['dazi.wallet.v1','dazi.outing.v1','dazi.consumer.v1','dazi.dining.v1','dazi.experience.v1','malatang.settings','malatang.budget','dazi.native-id.v1'];
Page({
 data:{src:''},
 onLoad(q){this.game=['malatang','bbq'].includes(q.game)?q.game:'malatang';const ticket=/^[a-f0-9]{48}$/.test(q.restore||'')?q.restore:'';this.setData({src:getApp().globalData.origin+'/?mini=1'+(ticket?'&restore='+ticket:'')+'#'+this.game});wx.showShareMenu({menus:['shareAppMessage']});},
 receive(e){
  for(const item of e.detail.data||[]){
   try{
    if(item.type==='fandazi:backup-too-large'){wx.setStorageSync('fandazi.backup-status','存档较大，这次未写入小程序；网页原记录仍然保留。');continue;}
    if(item.type!=='fandazi:backup'||item.version!==1||!item.values||typeof item.bootId!=='string'||!/^[-a-zA-Z0-9]{16,100}$/.test(item.bootId)||typeof item.syncId!=='string'||!/^[-a-zA-Z0-9]{16,100}$/.test(item.syncId))continue;
    const values={};let size=0;
    for(const key of KEYS){const raw=item.values[key];if(raw===undefined)continue;if(typeof raw!=='string'||raw.length>50000)throw Error('Invalid backup');if(key!=='malatang.budget')JSON.parse(raw);size+=raw.length;values[key]=raw;}
    if(size>60000||!values['dazi.wallet.v1'])continue;
    const wallet=JSON.parse(values['dazi.wallet.v1']);if(wallet?.version!==2||!Number.isInteger(wallet.balance)||wallet.balance<0||!Array.isArray(wallet.owned))continue;
    const previous=wx.getStorageSync('fandazi.native-backup.v1');
    // A fresh WebView gift is not newer progress. Only its own identity or an
    // explicitly restored snapshot may replace an existing native backup.
    if(previous?.values?.['dazi.wallet.v1']&&!item.restored&&(previous.syncId!==item.syncId||(item.freshStart&&previous.bootId!==item.bootId))){
     wx.setStorageSync('fandazi.backup-status','网页与小程序的存档不同，已保留两份。可从首页主动带回存档。');continue;
    }
    wx.setStorageSync('fandazi.native-backup.v1',{version:1,values,syncId:item.syncId,bootId:item.bootId,at:Date.now()});
    wx.setStorageSync('fandazi.backup-status','');
   }catch{ /* Keep the last valid native backup when a write or validation fails. */ }
  }
 },
 failed(){wx.showToast({title:'小馆暂时没连上，请稍后再来',icon:'none'});},loaded(){},
 onShareAppMessage(){return {title:'饭搭子 · 一起慢慢吃',path:'/shops/pages/entry/index?game='+this.game,imageUrl:getApp().globalData.origin+'/share-cover-v2.png'};}
});
