<template>
  <div class="container" :style="{backgroundColor: backgroundColor}">
    <div :style="{textAlign: 'center', paddingTop: paddingTop + 'px'}">
      <div class="location" @click="chooseLocation">
        <i class="icon iconfont icon-shouye"></i>
        {{address}}
      </div>
    </div>
    <div class="today">
      <canvas canvas-id="effect" id="effect"></canvas>
      <div class="temp">
        <span class="tmp">{{now.tmp}}</span>
        <span class="degree">°</span>
      </div>
      <div class="condTxt">
        <i class="iconfont" :class="'icon-' + now.cond_code"></i>
        <span>{{now.cond_txt}}</span>
      </div>
      <div class="shidu">
        <div class="sd">湿度 {{now.hum}}%</div>
        <div class="wind">{{now.wind_dir}} {{now.wind_sc}}级</div>
      </div>
      <div>{{oneWord}}</div>
      <div class="twoDay">
        <div class="today" v-if="daily[0]">
          <div>
            <div>今天</div>
            <div>{{daily[0].tmp_min}}/{{daily[0].tmp_max}}°</div>
          </div>
          <div class="mt10">
            <div>{{daily[0].cond_txt_d}}</div>
            <i class="iconfont" :class="'icon-' + daily[0].cond_code_d"></i>
          </div>
        </div>
        <div v-if="daily[1]">
          <div>
            <div>明天</div>
            <div>{{daily[1].tmp_min}}/{{daily[1].tmp_max}}°</div>
          </div>
          <div class="mt10">
            <div>{{daily[1].cond_txt_d}}</div>
            <i class="iconfont" :class="'icon-' + daily[1].cond_code_d"></i>
          </div>
        </div>
      </div>
    </div>
    <scroll-view class="hourly" :scroll-x="true" :style="{'width': '100%'}" v-if="hourly && hourly.length > 0">
      <div style="width: 480px;">
        <div class="hour" v-for="item in hourly">
          <div>{{item.hours}}</div>
          <i class="iconfont" :class="'icon-' + item.cond_code"></i>
          <div>{{item.tmp}}</div>
        </div>
      </div>
    </scroll-view>
    <div class="sevenday" v-if="daily && daily.length > 0">
      <div class="sevenTop">
        <div v-for="item in daily">
          <div>{{item.formatDate}}</div>
          <div class="mt10">{{item.cond_txt_d}}</div>
          <i class="iconfont" :class="'icon-' + item.cond_code_d"></i>
          <div class="mt10">{{item.tmp_max}}°</div>
        </div>
      </div>
      <canvas canvas-id="lineCanvas" style="width: 100%"></canvas>
      <div class="sevenTop" style="margin-top: -60px;">
        <div v-for="item in daily">
          <div class="mt10">{{item.tmp_min}}°</div>
          <i class="iconfont" :class="'icon-' + item.cond_code_n"></i>
          <div class="mt10">{{item.cond_txt_n}}</div>
          <div class="mt10 font12">{{item.wind_dir}}</div>
          <div class="font12">{{item.wind_sc}}级</div>
        </div>
      </div>
    </div>
    <div class="life">
      <div v-for="item in lifeStyle" @click="showDetail(item)">
        <div class="title">
          <i class="icon iconfont" :class="'icon-' + item.icon_type"></i>
          {{item.type_txt}}
        </div>
        <div class="content">{{item.brf}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from '@/components/icon'
import Charts from '../../../lib/wxcharts-min.js'
import _ from '../../utils/index'
export default {
  data () {
    return {
      lng: '',
      lat: '',
      address: '定位中...',
      userInfo: {},
      basic: {},
      now: {
        tmp: 0,
        hum: 0,
        wind_sc: 0,
        wind_dir: '无风'
      },
      oneWord: '',
      backgroundColor: '',
      hourly: [],
      daily: [],
      lifeStyle: [],
      screenWidth: 0,
      paddingTop: 0,
      effectInstance: null
    }
  },

  components: {
    icon
  },

  created () {
    wx.getSystemInfo({
      success: (res) => {
        this.screenWidth = res.screenWidth
        this.paddingTop = res.statusBarHeight + 12
        this.getLocation()
      }
    })
  },

  methods: {
    /**
     * @discription 选择地理位置
     */
    chooseLocation () {
      _.chooseLocation().then((res) => {
        this.lng = res.longitude
        this.lat = res.latitude
        this.getAddress()
        this.getWeather()
      })
    },
    /**
     * @discription 获取经纬度
     */
    getLocation () {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log('获取经纬度', res)
          this.lng = res.longitude
          this.lat = res.latitude
          this.getAddress()
          this.getWeather()
        },
        fail: () => _.showToast('检测到您未授权使用位置权限，请先开启哦')
      })
    },
    /**
     * @discription 获取位置
     */
    getAddress () {
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        data: {
          location: `${this.lat},${this.lng}`,
          key: 'EVRBZ-REGWU-GCCVM-2LK2F-QOCET-CABO3'
        },
        success: (res) => {
          console.log('获取位置', res)
          this.address = res.data.result.formatted_addresses.recommend
        },
        fail: (res) => _.showToast()
      })
    },
    /**
     * @discription 获取天气
     */
    getWeather () {
      wx.showLoading({
        title: '获取数据中',
        mask: true
      })
      wx.request({
        url: 'https://free-api.heweather.com/s6/weather',
        data: {
          location: `${this.lng},${this.lat}`,
          key: '62bf2ddadf534eb882cbeacffa21e04a'
        },
        success: (res) => {
          console.log('获取天气', res)
          this.stopEffect()
          wx.hideLoading()
          wx.stopPullDownRefresh()
          const {basic, now, daily_forecast, lifestyle, hourly} = res.data.HeWeather6[0]
          this.basic = basic
          this.now = now
          this.oneWord = _.getOneWord(now.cond_code)
          this.backgroundColor = _.getBackgroundColor(_.getWeatherName(now.cond_code))
          this.hourly = hourly
          this.lifeStyle = lifestyle
          this.daily = daily_forecast
          this.daily.forEach(v => {
            v.formatDate = v.date.substr(v.date.indexOf('-') + 1, 5).replace('-', '/')
          })
          this.lifeStyle.forEach(v => _.setIcon(v))
          this.hourly.forEach(v => {
            v.hours = v.time.split(' ')[1]
            v.tmp = v.tmp + '°'
          })
          const effect = _.getEffectSettings(now.cond_code)
          if (effect && effect.name) {
            this.effectInstance = _.drawEffect(
              'effect',
              effect.name,
              this.screenWidth, 768 / 2 * (this.screenWidth / 375),
              effect.amount
            )
          }
          this.setChart()
        },
        fail: (res) => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          _.showToast()
        }
      })
    },
    /**
     * @discription 清除canvas画布
     */
    stopEffect() {
      if (this.effectInstance && this.effectInstance.clear) {
        this.effectInstance.clear()
      }
    },
    /**
     * @discription 点击查看详情
     * @param item
     */
    showDetail (item) {
      wx.showModal({
        title: item.type_txt,
        content: item.txt,
        showCancel: false
      })
    },
    /**
     * @discription 绘制图表
     */
    setChart () {
      new Charts({
        canvasId: 'lineCanvas',
        width: this.screenWidth,
        height: 150,
        type: 'line',
        legend: false,
        dataLabel: false,
        categories: this.daily.map(v => v.date),
        series: [{
          data: this.daily.map(v => v.tmp_min),
          color: '#4FC3F7',
          format: function (val) {
            return val + '°'
          }
        }, {
          data: this.daily.map(v => v.tmp_max),
          color: '#FFB74D',
          format: function (val) {
            return val + '°'
          }
        }],
        yAxis: {
          gridColor: 'rgba(0,0,0,0)',
          disabled: true
        },
        xAxis: {
          disableGrid: true,
          fontColor: 'rgba(0,0,0,0)'
        }
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getWeather()
  },
  // 分享
  onShareAppMessage () {
    return {
      title: '我发现一个好玩的天气小程序，分享给你看看！',
      path: '/pages/index/main'
    }
  }
}
</script>

<style scoped>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    font-weight: normal;
  }
  .location {
    font-size: 12px;
    display: inline-block;
    text-align: center;
    width: 50%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  #effect {
    width: 750rpx;
    height: 768rpx;
    position: absolute;
    top: 0;
    right: 0;
  }
  .today {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .today .temp {
    margin-top: 10px;
    font-size: 120px;
    font-weight: 200;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .today .degree {
    font-size: 60px;
  }

  .today .shidu,
  .today .condTxt {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
  }

  .today .shidu .sd {
    border-right: 2rpx solid rgba(255, 255, 255, .4);
    text-align: right;
    padding-right: 10px;
  }

  .today .shidu .wind {
    text-align: left;
    margin-left: 10px;
  }

  .today .shidu div {
    flex: 1;
  }

  .today .condTxt .iconfont {
    font-size: 18px;
    margin-right: 5px;
  }

  .twoDay {
    padding: 10px;
    display: flex;
    flex-direction: row;
  }
  .twoDay .today {
    border-right: 2rpx solid rgba(255, 255, 255, .4);
  }

  .twoDay > div {
    padding: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .twoDay > div > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .twoDay .iconfont {
    font-size: 20px;
    margin-right: 10px;
  }

  .hourly {
    height: 88px;
    margin-top: 20px;
    padding: 10px 0;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  .hourly .hour {
    width: 60px;
    text-align: center;
    display: inline-block;
  }

  .hourly .iconfont {
    font-size: 28px;
    margin: 10px 0;
  }

  .sevenday {
    background: rgba(0, 0, 0, 0.1);
  }

  .sevenTop {
    display: flex;
    flex-direction: row;
    padding: 12px;
  }

  .sevenTop .iconfont {
    font-size: 28px;
    margin-top: 10px;
  }

  .sevenTop > div {
    flex: 1;
  }

  .sevenTop div {
    text-align: center;
  }

  .life {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    text-align: center;
  }
  .life .title {
    font-size: 12px;
    color: #fff;
    opacity: 0.7;
  }
  .life .content {
    font-size: 18px;
  }
  .life > div {
    width: 25%;
    padding: 10px 0;
    box-sizing: border-box;
    border-right: 2rpx solid rgba(255, 255, 255, .1);
    border-bottom: 2rpx solid rgba(255, 255, 255, .1);
  }
  .life > div > div {
    margin: 10px 0;
  }
</style>
