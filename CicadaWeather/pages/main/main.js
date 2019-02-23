var bmap = require('../../libs/bmap-wx/bmap-wx.min.js'); 
var util = require("../../utils/util.js")
Page({
  data:{
    // text:"这是一个页面"
    city: "",
    date: "",
    temp: "",
    weather: "",
    tipList: [
      {
        name: '穿衣指数',
        zs: "",
        des: "",
      },
      {
        name: '洗车指数',
        zs: "",
        des: "",
      },
      {
        name: '感冒指数',
        zs: "",
        des: "",
      },
      {
        name: '运动指数',
        zs: "",
        des: "",
      },
      {
        name: '紫外线强度指数',
        zs: "",
        des: "",
      }
    ],
  },

  jumpPage: function (e) {
    //打印所有关于点击对象的信息
    wx.navigateTo({
      url: "../components/life/life",
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadCityData();
    //this.loadDate();
  },

  onUnload:function(){
    // 页面关闭
  },

  loadCityData: function(){
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '您的ak'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (res) {
      var weatherData = res.currentWeather[0];
      var originalData = res.originalData.results;

      //获取实时温度
      var currentweather = res.currentWeather[0].date;
      currentweather = currentweather.substring(14, );
      currentweather = currentweather.replace(")", "");

      // 当天天气情况(气温，天气，风速)
      var temperature = weatherData.temperature;
      temperature = temperature.replace("~","/");

      // 获取日期
      let time = util.formatDate(new Date());
      let date = util.getDates(7, time);

      that.setData({
        temp: temperature,
        currentweather: currentweather,
        date: res.originalData.date,
        city: res.currentWeather[0].currentCity,
        weather: res.currentWeather[0].weatherDesc,
        wind: res.currentWeather[0].wind,
        
        //生活指数
        tipList: [
          {
            name: res.originalData.results[0].index[0].tipt,
            zs: res.originalData.results[0].index[0].zs,
            des: res.originalData.results[0].index[0].des,
          },
          {
            name: res.originalData.results[0].index[1].tipt,
            zs: res.originalData.results[0].index[1].zs,
            des: res.originalData.results[0].index[1].des,
          },
          {
            name: res.originalData.results[0].index[2].tipt,
            zs: res.originalData.results[0].index[2].zs,
            des: res.originalData.results[0].index[2].des,
          },
          {
            name: res.originalData.results[0].index[3].tipt,
            zs: res.originalData.results[0].index[3].zs,
            des: res.originalData.results[0].index[3].des,
          },
          {
            name: res.originalData.results[0].index[4].tipt,
            zs: res.originalData.results[0].index[4].zs,
            des: res.originalData.results[0].index[4].des,
          }
        ],
        // 多日天气情况
        futureItems: [
          {
            date: date[1].time,
            week: date[1].week,
            temperature: res.originalData.results[0].weather_data[1].temperature,
            weather: res.originalData.results[0].weather_data[1].weather,
          },
          {
            date: date[2].time,
            week: date[2].week,
            temperature: res.originalData.results[0].weather_data[2].temperature,
            weather: res.originalData.results[0].weather_data[2].weather,
          },
          {
            date: date[3].time,
            week: date[3].week,
            temperature: res.originalData.results[0].weather_data[3].temperature,
            weather: res.originalData.results[0].weather_data[3].weather,
          }
        ]
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
  },

})