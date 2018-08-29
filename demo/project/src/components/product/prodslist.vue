<template>
  <div class="tmpl">
    <top-bar title="商品列表"></top-bar>
    <mt-loadmore :bottom-method="loadBottom" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="mui-table-view mui-grid-view">
        <li v-for="item in prods" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
          <router-link :to="{name:'prods.detail',query:{id:item.id}}">
            <img class="mui-media-object" :src="item.img_url">
            <div class="mui-media-body">{{ item.title }}</div>
            <div class="desc">
              <div class="sell mui-clearfix">
                <span>￥{{ item.new_price }}</span>
                <s>￥{{ item.odd_price }}</s>
              </div>
              <div class="detail mui-clearfix">
                <div class="hot">
                  热卖中
                </div>
                <div class="count">
                  剩{{ item.total }}件
                </div>
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
        prods: [],
        allLoaded:false,
        isAutoFill:false,
      }
    },
    created() {
      this.$ajax.get('getproductlist')
        .then(res => {
          this.prods = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods:{
      loadBottom() {
        console.log("触发了")
      // 加载更多数据
      //   this.$ajax.get('getproductmore')
      //     .then(res=>{
      //       this.prods = this.prods.concat(res.data.data)
      //       if(res.data.data.length <= 4){
      //           this.allLoaded = true;// 若数据已全部获取完毕
      //       }
      //     })
      //     .catch(err=>{
      //       console.log(err)
      //     })
      //   this.$refs.loadmore.onBottomLoaded();
      }
    }
  }
</script>

<style scoped>
  .desc {
    background: rgba(0, 0, 0, .2);
    font-size: 12px;
    color: #666;
    padding: 5px 15px;
  }

  .desc .sell span {
    float: left;
    color: red;
    font-size: 14px;
  }

  .desc .sell s {
    float: left;
    margin-left: 10px;
  }

  .desc .detail .hot {
    float: left;
  }

  .desc .detail .count {
    float: right;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0;
    padding: 0;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
  }

  .mui-table-view-cell.mui-media.mui-col-xs-6 {
    height: 267px;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 180px;
  }
</style>

