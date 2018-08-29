<template>
  <div class="tmpl">
    <!--轮播图-->
    <my-swipe url="getlunbo"></my-swipe>
    <!--九宫格-->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'news.list'}">
            <img width="40" height="40" src="../../assets/img/news.png" alt="">
            <!--<span class="mui-icon mui-icon-home"></span>-->
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'photo.share'}">
            <img width="40" height="40" src="../../assets/img/picShare.png" alt="">
            <div class="mui-media-body">图文分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'prods.list'}">
            <img width="40" height="40" src="../../assets/img/goodShow.png" alt="">
            <div class="mui-media-body">商品展示</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img width="40" height="40" src="../../assets/img/feedback.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img width="40" height="40" src="../../assets/img/search.png" alt="">
            <div class="mui-media-body">搜索资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img width="40" height="40" src="../../assets/img/callme.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // img: []
      }
    }
    // ,
    // created() {
    //   this.$ajax.get('getlunbo')
    //     .then(res => {
    //       // console.log(res.data.data)
    //       this.img = res.data.data
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
</script>

<style scoped>

  /*九宫格*/

  .mui-content > .mui-table-view:first-child {
    margin-top: 0;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>
