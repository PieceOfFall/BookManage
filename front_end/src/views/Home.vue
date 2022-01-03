<template>
  <el-container class="main-container">
    <el-header>
      <el-menu mode="horizontal" background-color="#373d41" text-color="#fff" active-text-color="#9cdbfd" unique-opened
        router :default-active="this.activePath" ref="menu" class="el-menu">
        <div class="home">
          <i class="el-icon-s-home" style="font-size:2rem;padding-top:1rem" @click="backHome"></i>
        </div>
        <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id" @click="saveNavState(item.path)">
          <template slot="title">
            <span style="font-size:100%">{{item.authName}}</span>
          </template>
        </el-menu-item>
              <el-button @click="logOut" class="log-out" type="info" size="small">退出登录</el-button>
      </el-menu>
    </el-header>

    <el-main class="router-main">
      <transition-group appear name="animate__animated animated__bounce" enter-active-class="animate__fadeInDown"
          leave-active-class="animate__fadeOutDown">
        <router-view key="2"></router-view>  
      </transition-group>
    </el-main>

    <!-- <el-footer>
      <div class="footer">By FALL</div>
    </el-footer> -->
  </el-container>
</template>

<script>
  import 'animate.css'
  import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        // 菜单数据
        menuList: [],
        // 被激活的链接地址
        activePath: ''
      }
    },
    computed: {

    },
    methods: {
      ...mapMutations('userAbout', {
        saveInfo: 'SAVE'
      }),
      // 获取菜单数据
      async getMenuList() {
        const res = await this.$http.get(this.baseUrl+'/getFormData')
        if (res.status !== 200)
          return this.$message.error('菜单初始化失败')
        this.menuList = res.data.data
        this.activePath = this.$route.fullPath
      },
      // 保存链接激活状态
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      },
      // 回到主页
      backHome() {
        if (this.$route.fullPath === '/welcome')
          return
        this.$router.push('/welcome')
        window.sessionStorage.setItem('activePath', '/welcome')
        this.activePath = '/welcome'
      },
      // 用户登出
      async logOut() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('name')
        this.$router.replace('/login')
      }
    },
    created() {
      window.sessionStorage.removeItem('_one_key')
      this.saveInfo()
      this.getMenuList()
    }
  }
</script>

<style scoped>
  .footer {
    color: gray;
    user-select: none;
    float: right;
    font-weight: lighter;
    font-style: italic;
  }

  .el-header {
    background-color: #373d41;
    color: #E9EEF3;
    line-height: 60px;
    padding: 0;
    user-select: none;
  }

  /* .el-footer {
    background-image: linear-gradient(#373d41, black);
    color: #333;
    text-align: center;
    line-height: 60px;
  } */

  .el-main {
    background-color: #f2f5f8;
    color: #333;
  }

  .el-icon-s-home {
    font-family: element-icons!important;
    color: black;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
  }

    .el-icon-s-home:hover {
    font-family: element-icons!important;
    color: #9cdafc;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .main-container {
    height: 100%;
    background-image: url('https://s4.ax1x.com/2021/12/15/TSGwWt.jpg');
  }

  .el-menu {
    display: flex;
    justify-content: space-around;
    margin-left: 23rem;
    width:60%;
    height: 3.7rem;
  }

  .home:hover {
    cursor: pointer;
  }

  .router-main {
    margin: 0 8rem 0 8rem;
  }

  .log-out {
    cursor: pointer;
    height: 2rem;
    margin-top: 1rem;
    margin-left:10rem;
  }

</style>