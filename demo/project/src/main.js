// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入axios
import Axios from 'axios'
Vue.prototype.$ajax = Axios
Axios.defaults.baseURL = 'http://localhost:8080/api/'

// 引mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)
// 引入MUI样式
import './assets/mui/dist/css/mui.css'
// 引入全局样式
import './assets/css/global.css'

// 引入时间格式moment,然后设置全局过滤器
import Moment from 'moment'
Vue.filter('convertDate',function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
// 声明全局组件topBar  ,comments评论  my-swipe轮播图  拿去复用
import TopBar from './components/common/topBar'
Vue.component('topBar',TopBar)
import Comments from './components/common/comments'
Vue.component('comments',Comments)
import MySwipe from './components/common/mySwipe'
Vue.component('mySwipe',MySwipe)

// 引入缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 拦截器使用
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '加载中...',
    // spinnerType: 'fading-circle'
  });
  return config
})
Axios.interceptors.response.use(function(config){
  MintUI.Indicator.close();
  return config
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c=>c(App)
})
