<template>
  <div>
    <!--全局组件topbar-->
    <top-bar title="商品详情"></top-bar>
    <!--轮播图-->
    <div class="outer-swiper">
      <div class="swiper">
        <my-swipe url="getproductinfo"></my-swipe>
      </div>
    </div>
    <!--价钱 数量 加入购物车-->
    <div class="product-desc">
      <ul>
        <li>
          <span class="product-desc-span">{{ prods.title }}</span>
        </li>
        <li class="price-li">
          市场价：<s>￥{{ prods.old_price }}</s>
          销售价：<span>￥{{ prods.new_price }}</span>
        </li>
        <li class="number-li">
          购买数量：<span @click="sub">-</span><span>{{ num }}</span><span @click="add">+</span>
        </li>
        <li>
          <mt-button size="small" type="primary">立即购买</mt-button>
          <mt-button size="small" type="danger" @click="addtocart">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <!--动画球-->
    <transition name="fade" @after-enter="afterEnter">
      <div v-if="show" class="ball"></div>
    </transition>
    <!--商品参数-->
    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：{{ prods.goods_no }}</li>
        <li>库存情况：{{ prods.stock_quantity }}件</li>
        <li>上架时间：{{ prods.add_time | convertDate }}</li>
      </ul>
    </div>

    <div class="product-info">
      <ul>
        <li>
          <mt-button type="primary" size="large" plain @click="prodsInfo">图文介绍</mt-button>
        </li>
        <li>
          <mt-button type="danger" size="large" plain @click="prodsComment">商品评论</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import Connect from '../common/connect'
  // localStorage的数据操作
  import prodsTools from '../common/prodsTools'
  export default {
    data() {
      return {
        prods:{},
        num:1,
        show:false
      }
    },
    created(){
      let id = this.$route.query.id
      this.$ajax.get('getproductinfo')
        .then(res=>{
          this.prods = res.data.data[id-31]
        })
        .catch(err=>{
          console.log(err)
        })
    },
    methods:{
      add(){
        if(this.num >= this.prods.stock_quantity){
          // 提示
          Toast({
            message: '库存不足',
            position: 'bottom',
            duration: 1000
          });
          return false
        }
        this.num++
      },
      sub(){
        if(this.num <= 1){
          // 提示
          Toast({
            message: '不能少于1件',
            position: 'bottom',
            duration: 1000
          });
          return false
        }
        this.num--
      },
      // 加入购物车
      addtocart(){
        // 点击时小球出来
        this.show = true
        Connect.$emit('addshopcart',this.num)
        // 操作本地存储
        prodsTools.addProds({
          id:this.$route.query.id,
          num:this.num
        })
        // 检查一下
        // console.log(prodsTools.getprods());
      },
      // 动画完成移除
      afterEnter(){
        this.show = false
      },
      // 图文介绍
      prodsInfo(){
        this.$router.push({
          name:'prods.info',
          query:{id:this.$route.query.id}
        })
      },
      // 商品评论
      prodsComment(){
        this.$router.push({
          name:'prods.comment',
          query:{id:this.$route.query.id}
        })
      }
    }
  }
</script>

<style scoped>
  /*球动画*/
  .fade-enter-active{
    animation: ball .5s;
  }
  @keyframes ball {
    0% {
      /*3D流畅性更好*/
      transform: translate3d(0,0,0);
    }
    20% {
      transform: translate3d(50px,-50px,0);
    }
    40% {
      transform: translate3d(80px,0,0);
    }
    50%{
      transform: translate3d(90px,30px,0);
    }
    75% {
      transform: translate3d(100px,120px,0);
    }
    100% {
      transform: translate3d(110px,200px,0);
    }
  }



  .swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
  }

  .outer-swiper,
  .product-desc,
  .product-props,
  .product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
  }


  /*清ul padding*/

  .outer-swiper ul,
  .product-desc ul,
  .product-props ul,
  .product-info ul {
    padding: 0;
  }

  .product-desc ul li,
  .product-props ul li,
  .product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
  }

  .product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
  }

  .product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .product-desc ul,
  .product-info ul,
  .product-props ul {
    padding-left: 10px;
  }

  .price-li span {
    color: red;
    font-size: 25px;
  }

  .price-li s {
    margin-right: 16px;
  }


  /*加减*/

  .number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
  }


  /*商品参数*/

  .product-props ul >:nth-child(1) {
    text-align: left;
  }

  .product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
  }

  .product-info ul {
    margin-bottom: 70px;
    padding: 0 5px;
  }

  .number-li span {
    text-align: center;
  }

  .number-li >:nth-child(2) {
    width: 40px;
  }

  .ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
  }
</style>
