<template>
  <div>
    <!--轮播图组件-->
    <mt-swipe class="my-swipe" :auto="4000">
      <mt-swipe-item v-for="(item,index) in img" :key="index">
        <a href="#">
          <img :src="item.url" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        img: []
      }
    },
    props:['url'],
    created(){
      this.$ajax.get(this.url)
        .then(res=>{
          this.img = res.data.data
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
</script>

<style scoped>
  .my-swipe {
    height: 187px;
    /*background-color: pink;*/
  }

  .my-swipe img {
    width: 100%;
    height: 100%;
  }
</style>
