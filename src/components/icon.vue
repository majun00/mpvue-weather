<template>
  <div style="display: inline-block;">
    <span class="iconfont" :class="'icon-'+type"></span>
  </div>
</template>
<script>
  export default {
    name: 'icon',
    props: {
      type: String
    },
    computed: {
      iconTypeStr () {
        console.log(`icon-${this.type}`)
        return `icon-${this.type}`
      }
    },
    data () {
      return {
        type: this.type
      }
    },
    mounted () {
      console.log(this.type)
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'iconfont';  /* project id 880833 */
    src: url('//at.alicdn.com/t/font_880833_4f23kp1csw3.eot');
    src: url('//at.alicdn.com/t/font_880833_4f23kp1csw3.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.woff') format('woff'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_880833_4f23kp1csw3.svg#iconfont') format('svg');
  }

  .iconfont {
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

  /*多云*/
  .icon-101:before { content: "\e68a"; }

  .icon-qingzhuanduoyun:before { content: "\e68b"; }

  .icon-yintian:before { content: "\e68c"; }

  .icon-xiaoyu:before { content: "\e68d"; }

  .icon-zhongyu:before { content: "\e68e"; }

  .icon-dayu:before { content: "\e68f"; }

  .icon-baoyu:before { content: "\e690"; }

  .icon-leiyu:before { content: "\e691"; }

  .icon-zhenyu:before { content: "\e692"; }

  .icon-leizhenyu:before { content: "\e693"; }

  .icon-xiaoxue:before { content: "\e694"; }

  .icon-zhongxue:before { content: "\e695"; }

  .icon-daxue:before { content: "\e696"; }

  .icon-baoxue:before { content: "\e697"; }

  .icon-yujiaxue:before { content: "\e698"; }

  .icon-bingbao:before { content: "\e699"; }

  .icon-feng:before { content: "\e69a"; }

  .icon-shachengbao:before { content: "\e69b"; }

  .icon-shachengbao1:before { content: "\e69c"; }

  .icon-youwu:before { content: "\e69d"; }

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

