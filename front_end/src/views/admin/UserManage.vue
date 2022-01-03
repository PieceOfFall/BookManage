<template>
  <div>
    <div style="text-align:center;user-select:none;"><span class="gray-title">用户管理</span></div>
    <!-- 管理员查询区 -->
    <el-row :gutter="20" style="margin:2rem 4rem 0 4rem">
      <el-col :span="20">
        <el-input @keydown.enter.native="findUser" placeholder="请输入查询的用户学号" prefix-icon="el-icon-search"
          v-model="userName">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button plain @click="findUser">点我查询</el-button>
      </el-col>
    </el-row>
    <!-- 列表显示区域 -->
    <el-table class="user-table" :data="userList" style="width: 100%;">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="昵称" align="center" prop="name"></el-table-column>
      <el-table-column label="邮箱号" align="center" prop="mail_num"></el-table-column>
      <el-table-column label="学号" align="center" prop="stu_id"></el-table-column>
      <el-table-column label="已借阅( 书本ID )" align="center" prop="hasBook"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="admin-ctrl">
            <el-link type="primary" @click="resetPass(scope.row)">重置密码</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        userList: []
      }
    },
    methods: {
      async findUser() {
        const res = await this.$http.get(`http://47.107.125.7:8833/api/adminGetUsers?stu_id=${this.userName}`)
        this.userList = res.data.user
        this.userList[0].hasBook = this.userList[0].hasBook.replace(/&/g, ' ')
      },
      async resetPass(row) {
        let submit = {
          id:row.id
        }
        const res = await this.$http.post('http://47.107.125.7:8833/api/resetPassword',submit)
        if(res.status === 200) {
          this.$message.success({
            message:'重置成功',
            duration:500
          })
        } else {
            this.$message.error({
            message:'重置失败,请稍后再试',
            duration:500
          })
        }
      }
    }
  }
</script>

<style scoped>
  .gray-title {
    font-size: 2.2rem;
    color: gray;
    letter-spacing: 1rem;
    text-shadow: 5px 5px 5px gray;
  }

  .user-table {
    margin-top: 2rem;
    border-radius: 0.5rem;
  }

  .admin-ctrl {
    display: flex;
    justify-content: space-around;
  }
</style>