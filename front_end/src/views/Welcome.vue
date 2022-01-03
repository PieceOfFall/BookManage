<template>
  <div class="welcome-main">
    <h3 class="greet">亲爱的用户
      <span style="color:gray;font-style: italic;">{{user_name}}</span> , 欢迎使用</h3>
    <div class="title">B M 阅 览 室</div>
    <el-calendar>
    </el-calendar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user_name: ''
      }
    },
    methods: {

    },
    created() {
      this.user_name = window.localStorage.getItem('name')
    }
  }
</script>

<style scoped>
  .welcome-main {
    padding: 0;
    margin: 0;
    background-color: #f2f5f8;
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .swiper-img {
    height: 100%;
    width: 60%;
  }

  .title {
    position: relative;
    user-select: none;
    font-size: 2rem;
    text-shadow: 5px 5px 5px gray;
    transform: translate(-5.8rem, 0);
    padding: 0;
    margin: 0.5rem 0 4rem 0;
  }

  .greet {
    position: relative;
    user-select: none;
    font-size: 1rem;
    float: left;
  }
</style>