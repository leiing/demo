<template>
  <div class="tmpl">
    <!--全局组件topBar-->
    <top-bar title="新闻列表"></top-bar>
    <!--新闻列表-->
    <mt-loadmore :top-method="loadTop" :autoFill="isAutoFill" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText="bottomText" ref="loadmore">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
          <router-link :to="{name:'news.detail',query:{id:item.id}}">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
              <h4>{{item.title}}</h4>
              <div class="detail">
                <p>点击数：{{item.click}}</p>
                <p>发表时间：{{ item.add_time | convertDate}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newslist: [],
        allLoaded:false,
        bottomText:'加载更多。。。',
        isAutoFill:false
      }
    },
    created() {
      this.$ajax.get('getnewslist')
        .then(res => {
          // console.log(res.data)
          this.newslist = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods:{
      loadTop(){
        console.log("haha")
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        console.log(0)
      }
    }
  }
</script>

<style scoped>
  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .detail p {
    color: deepskyblue;
    font-size: 12px;
  }

  .detail p:nth-of-type(1) {
    float: left;
  }

  .detail p:nth-of-type(2) {
    float: right;
  }

  .mui-table-view .mui-media-object {
    width: 42px;
    height: 42px;
  }
</style>
