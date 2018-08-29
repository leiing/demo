<template>
  <div class="tmpl">
    <!--全局组件topBar-->
    <top-bar title="图片详情"></top-bar>
    <!--图片详情内容-->
    <div class="news-title">
      <p v-text="newsdetail.title"></p>
      <div>
        <span>{{ newsdetail.click }}次点击</span>
        <span>分类：民间趣闻</span>
        <span>添加时间：{{ newsdetail.add_time | convertDate}}</span>
      </div>
    </div>
    <hr>
    <!--缩略图-->
    <div class="photo">
          <vue-preview  :slides="imgs" @close="handleClose"></vue-preview>
    </div>
    <!--图片详情内容-->
    <div class="news-content" v-html="newsdetail.content"></div>
    <!--评论-->
    <comments></comments>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsdetail: {},
        imgs: [],

      }
    },
    created() {
      let id = this.$route.query.id
      this.$ajax.get('getnewslist')
        .then(res => {
          this.newsdetail = res.data.data[id - 20]
          // console.log(res.data.data[id-11])
        })
        .catch(err => {
          console.log(err)
        })
      // 缩略图
      this.$ajax.get('getlunbo')
        .then(res => {
          this.imgs = res.data.data
          this.imgs.forEach((item)=>{
            item.src = item.url
              item.msrc = item.url
              item.w = 300
              item.h = 200
          })
        })
        .catch(err => {
          console.log(err)
        })


    },
    methods: {
      handleClose() {
        console.log('close event')
      }
    }
  }
</script>

<style scoped>
  .news-title > p {
    font-size: 24px;
    color: skyblue;
    padding-top: 10px;
  }

  .news-title > div > span {
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }

  .news-content {
    padding: 0 10px;
  }

  .news-content > h5 {
    margin: 10px 0;
    color: #333;
  }

  .news-content > p {
    text-indent: 2em;
  }


</style>
