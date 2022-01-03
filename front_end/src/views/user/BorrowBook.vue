<template>
  <div>
    <div style="text-align:center;"><span class="gray-title">B M 阅 览 室</span></div>
    <!-- 用户查询区 -->
    <el-row :gutter="15" style="margin:2rem 2rem 0 2rem">
      <el-col :span="21">
        <el-input @keydown.enter.native="findBook" placeholder="请输入查询的图书" prefix-icon="el-icon-search"
          v-model="bookName">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button plain @click="findBook">点我查询</el-button>
      </el-col>
    </el-row>
    <!-- 空状态显示区 -->
    <el-empty v-if="!isFind" :image-size="200" style="margin-top: 2rem;user-select:none;"></el-empty>
    <!-- 结果显示区 -->
    <el-table class="book-table" :data="bookList" v-if="isFind" border stripe v-loading="loading" style="width: 100%;">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="书名" prop="book_name"></el-table-column>
      <el-table-column label="图书编号" prop="book_id"></el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="user-ctrl">
            <el-link type="primary" @click="showBookInfo(scope.row)">查看详情</el-link>
            <el-link type="primary" @click="borrowBook(scope.row)">借阅</el-link>
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
        bookName: '',
        bookList: [],
        isFind: false,
        loading: true
      }
    },
    computed:{
      ...mapState('userAbout', ['id'])
    },
    methods: {
      async findBook() {
        if (this.bookName.trim().length === 0) {
          return this.$message.info({
            message: '请输入你要查询的图书',
            duration: 1500
          })
        }
        let submit = this.bookName
        const res = await this.$http.get(this.baseUrl+`/findBook?name=${submit}`)
        if (res.data.length === 0) {
          return this.isFind = false
        }
        this.isFind = true
        this.bookList = res.data
        this.loading = false
      },
      async showBookInfo(row) {
        const res = await this.$http.get(this.baseUrl+`/getBookInfo?book_id=${row.book_id}`)
        if (res.data.book_info === null || res.data.book_info.trim().length === 0) {
          res.data.book_info = '暂无详情信息'
        }
        this.$alert(`${res.data.book_info}`, '书本详情')
      },
      async borrowBook(row) {
        this.$confirm(`确定要借阅这本 ${row.author} 的 ${row.book_name} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(async () => {
          let submit = {
            book_id: row.book_id,
            id:this.id
          }
          const res = await this.$http.post(this.baseUrl+`/submitBorrowReq`, submit)
          if (res.status === 200) {
            this.$message.success({
              message: '请求提交成功',
              duration: 1000
            })
            setTimeout(() => {
            this.reload()
          }, 500)
            return 
          } else {
            return this.$message.error({
              message: '请求失败,请稍后再试',
              duration: 1000
            })
          }
        }).catch(() => {
          this.$message.info({
            message: '已取消',
            duration: 1000
          })
        })

      }
    }
  }
</script>

<style scoped>
  .gray-title {
    position: relative;
    user-select: none;
    color: darkgray;
    text-shadow: 5px 5px 5px gray;
    font-size: 2rem;
    padding: 1rem 0 1rem 0;
    line-height: 4rem;
  }

  .book-table {
    margin-top: 2rem;
    border-radius: 0.5rem;
  }

  .user-ctrl {
    display: flex;
    justify-content: space-around;
  }
</style>