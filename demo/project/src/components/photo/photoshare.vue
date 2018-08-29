<template>
  <div class="tmpl">
    <!--全局组件topbar-->
    <top-bar title="图文列表"></top-bar>
    <div class="photo-title">
      <ul>
        <li v-for="item in category" :key="item.id">
          <a href="javascript:;" @click="goto(item.id)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="photo-content">
      <ul>
        <li v-for="item in imgs" :key="item.id">
          <router-link :to="{name:'photo.detail',query:{id:item.id}}">
            <img v-lazy="item.img_url" alt="">
            <div class="photo-detail">
              <span>{{ item.title }}</span>
              <p>{{ item.zhaiyao }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        category: [],
        imgs:[]
      }
    },
    created() {
      this.$ajax.get('getimgcategory')
        .then(res => {
          this.category = res.data.data
          // console.log(this.category)
          this.category.unshift({
            id: 0,
            title: "全部"
          })
        })
        .catch(err => {
          console.log(err)
        })
      this.$ajax.get('getimages')//   this.goto(0)
        .then(res=>{
          this.imgs = res.data.data
        })
        .catch(err=>{
          console.log(err)
        })

    },
    methods:{
      goto(id){
        this.$ajax.get('getimages')
          .then(res=>{
            if(id===0){
              this.imgs = res.data.data
            }else{
              this.imgs = [res.data.data[id-21]]
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .photo-title ul {
    white-space: nowrap;
    overflow-x: auto;
    margin: 5px;
    padding: 5px;
  }

  .photo-title li {
    display: inline-block;
    margin-right: 15px;
  }

  .photo-title li a {
    color: deepskyblue;
    font-size: 16px;
  }

  .photo-content ul {
    margin-top: 5px;
  }

  .photo-content li {
    border: 1px solid #ccc;
    position: relative;
  }
  .photo-content li a{
    display: block;
  }
  .photo-content li a img {
    width: 100%;
    height: 230px;
    vertical-align: top;
  }

  .photo-detail {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    color: #fff;
  }

  .photo-detail span {
    font-size: 16px;
    font-weight: bold;
  }

  .photo-detail p {
    font-size: 12px;
    color: #fff;
    text-indent: 2em;
  }
  /*懒加载*/
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
</style>
