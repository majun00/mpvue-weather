import effect from '../../lib/effect'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const getOneWord = (code) => {
  const list = [
    '生活是天气，有阴有晴有风雨',
    '心怀感恩，幸福常在',
    '心累的时候，换个心情看世界',
    '想获得人生的金子，就必须淘尽生活的沙烁',
    '因为有明天，今天永远只是起跑线',
    '只要心情是晴朗的，人生就没有雨天',
    '有你的城市下雨也美丽',
    '雨划过我窗前，玻璃也在流眼泪',
    '天空澄碧，纤云不染',
    '人生，不要被安逸所控制',
    '在受伤的时候，也能浅浅的微笑',
    '不抱怨过去，不迷茫未来，只感恩现在',
    '生活向前，你向阳光',
    '在阳光中我学会欢笑，在阴云中我学会坚强'
  ]
  let index = Math.floor(Math.random() * list.length)
  return list[index] ? list[index] : list[0]
}

const getWeatherName = (code) => {
  code = parseInt(code)
  let result = 'rain'
  if (code === 100 || (code >= 200 && code <= 204)) {
    result = 'clear'
  } else if (code > 100 && code <= 103) {
    result = 'cloud'
  } else if (code === 104 || (code >= 205 && code <= 208)) {
    result = 'overcast'
  } else if (code >= 302 && code <= 304) {
    result = 'thunder'
  } else if (code >= 400 && code < 500) {
    result = 'snow'
  } else if ((code >= 511 && code <= 513) || code === 502) {
    result = 'smog'
  } else if (code === 501 || (code >= 514 && code <= 515) || (code >= 509 && code <= 510)) {
    // 这个是雾气
    result = 'smog'
  } else if (code >= 503 && code < 508) {
    // 扬沙
    result = 'smog'
  } else if (code >= 900) {
    result = 'clear'
  }
  return result
}

const getBackgroundColor = (name, night = 'day') => {
  name = `${night}_${name}`
  const map = {
    day_cloud: '62aadc',
    night_cloud: '27446f',
    day_rain: '2f4484',
    night_rain: '284469',
    day_thunder: '3a4482',
    night_thunder: '2a2b5a',
    day_clear: '57b9e2',
    night_clear: '173868',
    day_overcast: '5c7a93',
    night_overcast: '22364d',
    day_snow: '95d1ed',
    night_snow: '7a98bc',

    night_smog: '494d57'
  }
  let color = map[name] ? map[name] : '27446f'
  return `#${color}`
}

const setIcon = (v) => {
  switch (v.type) {
    case 'comf':
      v.type_txt = '舒适度'
      v.icon_type = 'iconmoshishushireshuiqi'
      break
    case 'cw':
      v.type_txt = '洗车'
      v.icon_type = 'cheliang'
      break
    case 'drsg':
      v.type_txt = '穿衣'
      v.icon_type = 'yifu'
      break
    case 'flu':
      v.type_txt = '感冒'
      v.icon_type = 'yaowan'
      break
    case 'sport':
      v.type_txt = '运动'
      v.icon_type = 'shouye1'
      break
    case 'trav':
      v.type_txt = '旅游'
      v.icon_type = 'lvyou'
      break
    case 'uv':
      v.type_txt = '紫外线'
      v.icon_type = 'taiyang'
      break
    case 'air':
      v.type_txt = '空气'
      v.icon_type = 'kouzhao'
      break
  }
}

const chooseLocation = () => {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const showToast = (msg) => {
  wx.showToast({
    title: msg || '加载失败，请稍后再试',
    icon: 'none',
    duration: 3000
  })
}

const getEffectSettings = (code) => {
  code = parseInt(code)
  let result = false
  if ((code >= 300 && code <= 304) || code === 309 || code === 313 || code == 399 || code === 406 || code === 404) {
    result = {
      name: 'rain',
      amount: 100
    }
  } else if (code === 499 || code === 405) {
    result = {
      name: 'snow',
      amount: 70
    }
  } else if (code >= 305 && code <= 312) {
    let amount = 100 + (code - 305) * 10
    result = {
      name: 'rain',
      amount: amount
    }
  } else if (code >= 314 && code <= 318) {
    let amount = 100 + (code - 314) * 10
    result = {
      name: 'rain',
      amount: amount
    }
  } else if (code >= 400 && code <= 403) {
    let amount = 60 + (code - 400) * 10
    result = {
      name: 'snow',
      amount: amount
    }
  } else if (code >= 407 && code <= 410) {
    let amount = 60 + (code - 407) * 10
    result = {
      name: 'snow',
      amount: amount
    }
  }
  return result
}

const drawEffect = (canvasId, name, width, height, amount) => {
  let rain = effect(name, wx.createCanvasContext(canvasId), width, height, {
    amount: amount || 100,
    speedFactor: 0.03
  })
  return rain.run()
}

export default {
  formatNumber,
  formatTime,
  setIcon,
  chooseLocation,
  getOneWord,
  getWeatherName,
  getBackgroundColor,
  showToast,
  getEffectSettings,
  drawEffect
}
