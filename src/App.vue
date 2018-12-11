<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
//    const logs = wx.getStorageSync('logs') || []
//    logs.unshift(Date.now())
//    wx.setStorageSync('logs', logs)
//
//    console.log('app created and cache logs by setStorageSync')
  }
}
</script>
<style>
  .mt10 {
    margin-top: 10px;
  }
  .font12 {
    font-size: 12px;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 880833 */
    src: url('//at.alicdn.com/t/font_880833_4f23kp1csw3.eot');
    src: url('//at.alicdn.com/t/font_880833_4f23kp1csw3.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.woff') format('woff'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.svg#iconfont') format('svg');
  }

  .iconfont {
    display: inline-block;
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-iconmoshishushireshuiqi:before { content: "\e652"; }

  .icon-cheliang:before { content: "\e62b"; }

  .icon-shouye:before { content: "\e619"; }

  .icon-shouye1:before { content: "\e62a"; }

  .icon-lvyou:before { content: "\e657"; }

  .icon-yifu:before { content: "\e666"; }

  .icon-kouzhao:before { content: "\e6e4"; }

  .icon-yaowan:before { content: "\e64d"; }

  .icon-taiyang:before { content: "\e7ed"; }

  /*晴天*/
  .icon-100:before { content: "\e689"; }

  /*多云, 阴天*/
  .icon-101:before,
  .icon-104:before { content: "\e68c"; }

  /*小雨*/
  .icon-305:before { content: "\e68d"; }

  /*中雨*/
  .icon-306:before { content: "\e68e"; }

  /*大雨*/
  .icon-307:before { content: "\e68f"; }

  /*暴雨*/
  .icon-310:before { content: "\e690"; }


  .icon-leiyu:before { content: "\e691"; }

  /*阵雨*/
  .icon-300:before { content: "\e692"; }

  /*雷阵雨*/
  .icon-302:before { content: "\e693"; }

  /*小雪*/
  .icon-400:before { content: "\e694"; }

  /*中雪*/
  .icon-401:before { content: "\e695"; }

  /*大雪*/
  .icon-402:before { content: "\e696"; }

  /*暴雪*/
  .icon-403:before { content: "\e697"; }

  /*雨夹雪*/
  .icon-404:before { content: "\e698"; }

  /*冰雹*/
  .icon-304:before { content: "\e699"; }

  /*有风*/
  .icon-200:before { content: "\e69a"; }

  /*沙尘暴*/
  .icon-507:before { content: "\e69b"; }

  /*强沙尘暴*/
  .icon-508:before { content: "\e69c"; }

  /*雾*/
  .icon-509:before { content: "\e69d"; }

  .icon-baitianyoufeng:before { content: "\e69e"; }

  .icon-baitianyangsha:before { content: "\e69f"; }

  .icon-taiyangshengqi:before { content: "\e6a0"; }

  .icon-taiyangxiala:before { content: "\e6a1"; }

  .icon-yewan:before { content: "\e6a2"; }

  .icon-yejianduoyun:before { content: "\e6a3"; }

  .icon-yejianyouyu:before { content: "\e6a4"; }

  .icon-yejianyouxue:before { content: "\e6a5"; }

  .icon-yejianzhenyu:before { content: "\e6a6"; }
</style>
