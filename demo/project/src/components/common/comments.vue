<template>
  <div>
    <!--评论-->
    <div class="photo-pinglun">
      <ul>
        <li class="photo-comment mui-clearfix">
          <div>
            <span>提交评论</span>
            <span><a @click="goback">返回</a></span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea v-model="msg"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="small" class="mui-pull-right" @click="fabiao">发表评论</mt-button>
        </li>
        <li class="photo-comment list mui-clearfix">
          <div>
            <span>评论列表</span>
            <span>66条评论</span>
          </div>
        </li>
      </ul>
      <!-- 评论内容 -->
      <ul class="comment-list">
        <li v-for="(item,index) in comment" :key="index">
          {{ item.user_name }}：{{ item.content }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ item.add_time | convertDate }}
        </li>
      </ul>
      <div class="mui-clearfix">
        <mt-button type="primary" size="small" class="mui-pull-right" @click="more">加载更多</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        comment: [],
        msg: ''
      }
    },
    created() {
      // 评论
      this.$ajax.get('getcomments')
        .then(res => {
          this.comment = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      // 加载更多本来应该是第二页第三页。。++indexPage。
      more() {
        this.$ajax.get('getcommentsmore')
          .then(res => {
            var data = res.data.data
            this.comment = this.comment.concat(data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 发表本来应该要这样子
      // fabiao(){
      //   this.$ajax.post('接口'+id,"content="+this.msg)
      //     .then(res=>{
      //         // 在加载一次
      //         // 然后清空textarea的内容
      //       this.msg = ''
      //     })
      //     .catch()
      // }
      fabiao() {
        this.$ajax.get('getcomments')
          .then(res => {
            // this.comment = res.data.data
            this.comment.unshift({
              "user_name": "匿名用户",
              "content": this.msg,
              "add_time": "2018-08-30"
            })
            this.msg = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

  }
</script>

<style scoped>
  /*评论*/
  .photo-pinglun {
    padding: 5px;
  }

  .photo-comment {
    padding-bottom: 10px;
  }

  .photo-comment span:nth-of-type(1) {
    float: left;
    font-size: 20px;
    color: #111;
  }

  .photo-comment span:nth-of-type(2) a {
    color: skyblue;
  }

  .photo-comment span:nth-of-type(2) {
    float: right;
    color: skyblue;
    font-size: 18px;
  }

  .comment-list {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    padding-left: 10px;
    color: #111;
    font-size: 14px;
  }

  .photo-comment.list {
    margin-top: 50px;
  }

  .txt-comment {
    color: #333;
  }
</style>
