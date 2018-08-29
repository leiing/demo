import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Member from '../components/member/member'
import Cart from '../components/cart/cart'
import Search from '../components/search/search'
import NewsList from '../components/news/newslist'
import NewsDetail from '../components/news/newsdetail'
import PhotoShare from '../components/photo/photoshare'
import PhotoDetail from '../components/photo/photodetail'
import ProdsList from '../components/product/prodslist'
import ProdsDetail from '../components/product/prodsdetail'
import ProdsComment from '../components/product/prodscomment'
import ProdsInfo from '../components/product/prodsinfo'

Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  mode:'history',
  routes: [
    {path:'/',redirect:{name:'home'}},
    {path:'/home', name:'home', component:Home},
    {path:'/member', name:'member', component:Member},
    {path:'/cart', name:'cart', component:Cart},
    {path:'/search', name:'search', component:Search},
    {path:'/news/list', name:'news.list', component:NewsList},
    {path:'/news/detail', name:'news.detail', component:NewsDetail},
    {path:'/photo/share', name:'photo.share', component:PhotoShare},
    {path:'/photo/detail', name:'photo.detail', component:PhotoDetail},
    {path:'/prods/list', name:'prods.list', component:ProdsList},
    {path:'/prods/detail', name:'prods.detail', component:ProdsDetail},
    {path:'/prods/comment', name:'prods.comment', component:ProdsComment},
    // 这里直接复用组件newsDetail
    {path:'/prods/info', name:'prods.info', component:ProdsInfo},
  ]
})
