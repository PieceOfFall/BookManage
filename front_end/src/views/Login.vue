<template>
  <div class="login_container">
    <transition-group appear name="animate__animated animated__bounce " enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOutDown">
      <div class="login_box" key="1" v-if="isOnLogin">
        <div class="form">
          <span>图书管理系统</span>
          <el-form @submit.prevent='' ref='loginForRef' :model="loginData" :rules="loginFormRules" label-width>
            <el-form-item prop="mail_num">
              <el-input @keydown.enter.native="login" placeholder="邮箱地址" v-model.trim="loginData.mail_num"
                prefix-icon="el-icon-user-solid">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input @keydown.enter.native="login" placeholder="密码" v-model.trim="loginData.password" type="password"
                prefix-icon="el-icon-s-promotion">
              </el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button :round="false" :circle="false" type="primary" size="medium" @click="login">登录<i
                  class="el-icon-upload el-icon--right"></i></el-button>
            </el-form-item>
            <el-link class="link" target="_blank" @click="switchStatus">还没有账户？点击注册</el-link>
          </el-form>
        </div>
      </div>
    </transition-group>
    <div class="register_box" v-if="!isOnLogin">
      <span>新用户注册</span>
      <el-form @submit.prevent='' ref='registerForRef' :model="registerData" :rules="registerFormRules" label-width>
        <el-form-item prop="stu_id">
          <el-input placeholder="学号" v-model.trim="registerData.stu_id" prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input placeholder="昵称" v-model.trim="registerData.name" prefix-icon="el-icon-s-promotion">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password placeholder="密码" type="password" v-model.trim="registerData.password"
            prefix-icon="el-icon-s-promotion">
          </el-input>
        </el-form-item>
        <el-form-item prop="mail_num">
          <el-input placeholder="邮箱地址" v-model.trim="registerData.mail_num" prefix-icon="el-icon-s-promotion">
          </el-input>
        </el-form-item>
        <el-form-item prop="vali">
          <el-input :disabled="!isGetValidate" placeholder="请先获取验证码（ 注意大小写 ）" v-model.trim="registerData.vali"
            prefix-icon="el-icon-s-promotion">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button v-if="registerData.mail_num" :disabled="isFreqValidate" :round="false" :circle="false"
            type="primary" size="medium" @click="getValidate" style="float:left;">
            获取验证码<i class="el-icon-magic-stick el-icon--right"></i></el-button>
          <el-button :disabled="!registerData.vali" v-if="isGetValidate&&registerData.mail_num" :round="false"
            :circle="false" type="primary" size="medium" @click="register" style="float:right">
            确认注册 <i class="el-icon-key el-icon--right"></i></el-button>
        </el-form-item>
        <el-link class="link" style="" target="_blank" @click="switchStatus">已有账户？ 点击登录</el-link>
      </el-form>
    </div>
  </div>
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
        // 登录表单的数据绑定对象
        loginData: {
          mail_num: '',
          password: ''
        },
        // 注册表单验证对象
        registerData: {
          stu_id: '',
          name: '',
          mail_num: '',
          vali: '',
          password: ''
        },
        // 用户当前是否正准备登录
        isOnLogin: true,
        // 用户当前是否已经拿到验证码
        isGetValidate: false,
        // 防止用户频繁请求验证
        isFreqValidate: false,
        // 登录表单验证规则对象
        loginFormRules: {
          mail_num: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              min: 8,
              message: '邮箱地址长度不合法',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 15,
              message: '密码长度不合法',
              trigger: 'blur'
            }
          ]
        },
        // 注册表单验证规则对象
        registerFormRules: {
          stu_id: [{
              required: true,
              message: '请输入您的学号',
              trigger: 'blur'
            },
            {
              min: 7,
              max: 9,
              message: '学号长度不合法',
              trigger: 'blur'
            }
          ],
          name: [{
              required: true,
              message: '请输入你的昵称',
              trigger: 'blur'
            },
            {
              min: 0,
              max: 20,
              message: '昵称长度不合法',
              trigger: 'blur'
            }
          ],
          mail_num: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              min: 8,
              message: '邮箱地址不合法',
              trigger: 'blur'
            }
          ],
          vali: [{
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            },
            {
              min: 3,
              message: '验证码不合法',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 15,
              message: '密码长度不合法',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      ...mapMutations('userAbout', {
        saveInfo: 'SAVE'
      }),
      // 用户登录
      login() {
        let submit = {
          "user": {
            "mail_num": this.loginData.mail_num,
            "password": this.loginData.password
          }
        }
        this.$refs.loginForRef.validate(async valid => {
          if (!valid) return
          await this.$http.post(this.baseUrl+'/userlogin', submit).then(res => {
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('id', res.data.id)
            window.localStorage.setItem('name', res.data.name)
            this.saveInfo()
            this.$message.success({
              message: '登录成功',
              duration: 1000
            })
            this.$router.push('/home')
          }).catch(err => {
            if (err) {
              this.$message.error({
                message: '登录失败',
                duration: 1500
              })
            }
          })
        })
      },
      switchStatus() {
        // 切换界面
        this.isOnLogin = !this.isOnLogin
      },
      // 用户注册并提交验证码
      async register() {
        let key = window.localStorage.getItem('_one_key')
        let submit = {
          "user": {
            "name": this.registerData.name,
            "password": this.registerData.password,
            "mail_num": this.registerData.mail_num,
            "vali": this.registerData.vali,
            key,
            "stu_id": this.registerData.stu_id
          }
        }
        this.$refs.registerForRef.validate(async valid => {
          if (!valid) {
            return
          }
          await this.$http.post(this.baseUrl+'/userregister', submit).then(res => {
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('id', res.data.id)
            window.localStorage.setItem('name', this.registerData.name)
            this.saveInfo()
            this.$message.success({
              message: '注册成功',
              duration: 2000
            })
            this.$router.push('/home')
          }).catch((err, a) => {
            if (err) {
              this.$message.error({
                message: '注册失败',
                duration: 1500
              })
            }
          })
        })
      },
      // 获取验证码
      async getValidate() {
        this.$refs.registerForRef.validateField('mail_num', async valid => {
          if (valid)
            return
          this.isFreqValidate = !this.isFreqValidate
          // 20s后允许再次请求
          setTimeout(() => {
            this.isFreqValidate = !this.isFreqValidate
          }, 1000 * 20)
          // 获取时间戳来为服务器标识本次验证码的请求时间
          let time = new Date().getTime();
          let data = {
            mail: this.registerData.mail_num,
            timestamp: time
          }
          const res = await this.$http.post(this.baseUrl+'/validateMail', data)
          if (res.status === 200) {
            this.isGetValidate = true
            window.localStorage.setItem('_one_key', res.data)
            this.$message.info({
              message: '验证码发送成功',
              duration: 2000
            })
          } else {
            this.$message.error({
              message: '验证码发送失败',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .link {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .login_container {
    background-image: url('../assets/bookBG.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100%;
    user-select: none;
  }

  .login_box {
    position: relative;
    background-color: rgba(22, 22, 22, 0.322);
    box-shadow: 0 0 1.3rem #aaa;
    padding-top: 2rem;
    padding-left: 3.5rem;
    padding-right: 3.5rem;
    padding-bottom: 5rem;
    border-radius: 1rem;
    width: 25rem;
    height: 15.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 4rem;
  }

  .register_box {
    position: fixed;
    background-color: rgba(22, 22, 22, 0.322);
    box-shadow: 0 0 1.3rem #aaa;
    padding-top: 1rem;
    padding-left: 6rem;
    padding-right: 6rem;
    padding-bottom: 10rem;
    border-radius: 1rem;
    width: 22rem;
    height: 20.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 4rem;
  }

  span {
    font-family: 'STHeiti';
    font-size: 1.5rem;
  }

  .btns {
    padding-top: 1rem;
  }
</style>