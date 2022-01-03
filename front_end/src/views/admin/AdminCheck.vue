<template>
  <div>
    <div style="text-align:center;user-select:none;"><span class="gray-title">请求批复</span></div>
    <!-- 空状态显示区 -->
    <el-empty description="暂无请求" v-if="!isFind" :image-size="200" style="margin-top: 5rem;user-select:none;"></el-empty>
    <!-- 列表显示区域 -->
    <el-table class="book-table" :data="borrowRequestList" v-if="isFind" v-loading="loading" style="width: 100%;">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="书名" align="center" prop="book_name"></el-table-column>
      <el-table-column label="图书编号" align="center" prop="book_id"></el-table-column>
      <el-table-column label="作者" align="center" prop="author"></el-table-column>
      <el-table-column label="用户编号" align="center" prop="state"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="admin-ctrl">
            <el-link type="primary" @click="agreeWith(scope.row)">允许</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    inject: ['reload'],
    data() {
      return {
        isFind: false,
        loading: true,
        borrowRequestList: [],
      }
    },
    computed: {
      ...mapState('userAbout', ['id'])
    },
    methods: {
      async getBorrowRequestList() {
        const res = await this.$http.get(`http://47.107.125.7:8833/api/adminGetBorrowList`)
        let tmp = res.data.bookList
        for (let i = 0; i < tmp.length; i++) {
          tmp[i].state = tmp[i].state.substring(11)
        }
        if (res.status === 200) {
          this.borrowRequestList = res.data.bookList
          if(this.borrowRequestList.length === 0) {
            return
          }
          this.isFind = true
          this.loading = false
        }
      },
      async agreeWith(row) {
        let submit = {
          id: row.state,
          book_id: row.book_id
        }
        const res = await this.$http.post('http://47.107.125.7:8833/api/adminAgreeBorrow', submit)
        if (res.status === 200) {
          this.$message.info({
            message: '操作成功',
            duration: 500
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        } else {
          this.$message.error({
            message: '操作失败,请稍后再试',
            duration: 1000
          })
        }
      }
    },
    created() {
      this.getBorrowRequestList()
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

  .book-table {
    margin-top: 2rem;
    border-radius: 0.5rem;
  }

  .admin-ctrl {
    display: flex;
    justify-content: space-around;
  }
</style>