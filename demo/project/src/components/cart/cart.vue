<template>
  <div class="tmpl">
    <!--全局组件topbar-->
    <top-bar title="购物车"></top-bar>
    <!--选中商品详情-->
    <div class="pay-detail">
      <ul>
        <li v-for="(item,index) in goods" :key="item.id" class="p-list">
          <mt-switch v-model="item.isChoose"></mt-switch>
          <img :src="item.url">
          <div class="pay-calc">
            <p v-text="item.title"></p>
            <div class="calc">
              <span>￥{{ item.new_price }}</span>
              <span @click="sub(index)">-</span>
              <span>{{ item.num }}</span>
              <span @click="add(index)">+</span>
              <a href="javascript:;" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--这里计算总价-->
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品 {{sum.num}} 件，总价￥{{ sum.price }}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import prodsTools from '../common/prodsTools'
  import connect from '../common/connect'
  export default {
    data() {
      return {
        goods:[],
      }
    },
    created(){
      // 这个页面的数据要从本地存储中拿  prods中数据{id:num}
      let prods = prodsTools.getprods()
      // console.log(prods); //结果{31: 3, 32: 15, 34: 2}
      // 正常我们需要传入id从后台获取数据，就是上面的key值
      let keys = Object.keys(prods)
      if(keys.length === 0){
        // Toast({
        //   message: '购物车暂无商品，你可以去商品展示选购',
        //   position: 'bottom',
        //   duration: 5000
        // });
        return
      }
      // console.log(keys); //本来要这样 var url = 'getproductinfo/'  url+=keys.join(',')然后发起请求
      this.$ajax.get('getproductinfo')
        .then(res=>{
          // console.log(res.data.data);
          keys.forEach(item=>{
            this.goods.push(res.data.data[item-31])
          })
          // 在这里从后台获取到的数据没有数量，没有是否选中，需要从本地存储获取添加进来，还有自己定义
          this.goods.forEach(item=>{
            // item.num = prods[item.id]
            // item.isChoose = true

            // 注意不要上面那样添加，$set的方式添加，监听的到
            this.$set(item,'num',prods[item.id])
            this.$set(item,'isChoose',true)
          })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    methods:{
      sub(index){//传个index知道你对那个商品加加减减
        if(this.goods[index].num <= 1){
          // 提示
          Toast({
            message: '不能少于1件商品',
            position: 'bottom',
            duration: 1000
          });
          return false
        }
        this.goods[index].num--
        connect.$emit('addshopcart',-1)
        // 还要告诉本地存储
        prodsTools.addProds({
          id:this.goods[index].id,
          num:-1
        })
      },
      add(index){
        this.goods[index].num++
        connect.$emit('addshopcart',1)
        prodsTools.addProds({
          id:this.goods[index].id,
          num:1
        })
      },
      del(index){
        prodsTools.deleteProds(this.goods[index].id)
        connect.$emit('addshopcart',-this.goods[index].num)
        // 内存最后删，上面这些依赖这个
        this.goods.splice(index,1)
      }
    },
    computed:{
      sum(){
        let num = 0
        let price = 0
        this.goods.forEach(item=>{
          // 判断选中的
          if(item.isChoose === true){
            num += item.num
            price += item.num*item.new_price
          }
        })
        return {
          num,price
        }
      }
    }
  }
</script>

<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }

  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }

  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }

  .pay-detail ul li > :nth-child(1),
  .pay-detail ul li > :nth-child(3) {
    display: inline-block;
  }

  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: deepskyblue;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .pay-detail ul li > :nth-child(1) {
    line-height: 80px;
  }

  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }

  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .calc a {
    margin-left: 20px;
  }

  .show-1,
  .show-2 {
    display: inline-block;
  }

  .show-1,
  .show-2 {
    margin-left: 30px;
  }

  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
