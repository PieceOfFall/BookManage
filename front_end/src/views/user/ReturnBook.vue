<template>
  <div>
    <div style="text-align:center;"><span class="gray-title">B M 阅 览 室</span></div>
    <!-- 空状态显示区 -->
    <el-empty description="暂时还没有要还的书" v-if="!isFind" :image-size="200" style="margin-top: 6.5rem;user-select:none;"></el-empty>
    <!-- 还书列表显示区 -->
    <el-table class="book-table" :data="returnBookList" v-if="isFind" v-loading="loading" style="width: 100%;">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="书名" align="center" prop="book_name"></el-table-column>
      <el-table-column label="图书编号" align="center" prop="book_id"></el-table-column>
      <el-table-column label="作者" align="center" prop="author"></el-table-column>
      <el-table-column label="还书时间" align="center" prop="due"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="user-ctrl">
            <el-link type="primary" @click="returnBook(scope.row)">还书</el-link>
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
        returnBookList: [],
        isFind:false,
        loading:true
      }
    },
    computed: {
      ...mapState('userAbout', ['id'])
    },
    methods: {
      async getReturnBookList() {
        const res = await this.$http.get(this.baseUrl+`/getHasBooks?id=${this.id}`)
        this.returnBookList = res.data.bookList
        if(this.returnBookList.length !== 0 ) {
          this.isFind = true
          this.loading = false
        }
      },
      async returnBook(row) {
        this.$confirm(`要归还这本 ${row.book_name} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(async ()=>{
          let submit = {
          id:this.id,
          book_id:row.book_id
        }
        const res = await this.$http.post(this.baseUrl+'/returnBook',submit)
        if(res.status === 200) {
          this.$message.info({
            message: '还书成功',
            duration: 1000
          })
          this.reload()
        } else {
          this.$message.error({
            message: '还书失败,请稍后再试',
            duration: 1000
          })
        }
        })
        
      }
    },
    created() {
      this.getReturnBookList()
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