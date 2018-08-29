<template>
  <div class="tmpl">
    <!--全局组件topBar-->
    <top-bar :title="title"></top-bar>

    <!--新闻详情内容-->
    <div class="news-title">
      <p v-text="newsdetail.title"></p>
      <div>
        <span>{{ newsdetail.click }}次点击</span>
        <span>分类：民间趣闻</span>
        <span>添加时间：{{ newsdetail.add_time | convertDate}}</span>
      </div>
    </div>
    <hr>
    <div class="news-content" v-html="newsdetail.content"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsdetail: {},
        title: '',
        // num: 11
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log(from)
    //   let myTitle = ''
    //   let myNum = 0
    //   if (from.name === 'news.list') {
    //     myTitle = '新闻详情'
    //   } else if (from.name === 'prods.detail') {
    //     myTitle = '图文介绍'
    //     myNum = 22
    //   }
    //   next(vm => {
    //     // 通过 `vm` 访问组件实例
    //     vm.title = myTitle
    //     vm.num = myNum
    //   })
    // },
    created() {
      let id = this.$route.query.id
      // console.log(id);
      this.$ajax.get('getnewslist')
        .then(res => {
          this.newsdetail = res.data.data[id - 11]
          // console.log(res.data.data[id-this.num])
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
</script>

<style scoped>
  .news-title > p {
    font-size: 24px;
    color: skyblue;
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

