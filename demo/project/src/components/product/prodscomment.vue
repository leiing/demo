<template>
  <div class="tmpl">
    <!--全局组件topbar-->
    <top-bar title="商品评论"></top-bar>
    <!--评论-->
    <comments ></comments>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created(){
      let id = this.$route.query.id
      console.log(id);
      // 本来是根据这个id获取这个评论的  现在凑合
    }
  }
</script>

<style scoped>

</style>
