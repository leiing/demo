<template>
  <div>
    <!--头部-->
    <mt-header title="仿电商项目"></mt-header>
    <!--留坑-->
    <transition name="go" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--底部-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" :to="{name:'home'}">
        <span class="mui-icon icon-shouye"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'member'}">
        <span class="mui-icon icon-huiyuan"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'cart'}">
        <span class="mui-icon icon-gouwuche"><span class="mui-badge">{{ num }}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'search'}">
        <span class="mui-icon icon-iconfind"></span>
        <span class="mui-tab-label">查找</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import Connect from './components/common/connect'
  // 购物车数量从本地存储拿
  import prodsTools from './components/common/prodsTools'
  export default {
    data() {
      return {
        selected: false,
        num: prodsTools.getTotalNum()
      }
    },
    created(){
      Connect.$on('addshopcart',num=>{
        // console.log('接收到了')
        this.num += num
      })
    }
  }
</script>

<style scoped>
  .go-enter-active,.go-leave-active{
    transition: all .3s;
  }
  .go-enter,.go-leave-active{
    opacity: 0;
  }
</style>
