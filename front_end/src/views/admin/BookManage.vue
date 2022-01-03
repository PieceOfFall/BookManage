<template>
  <div>
    <div class="mask" v-if="isAddBook" @click="hideAddBook"></div>
    <div style="text-align:center;user-select:none;"><span class="gray-title">书本管理</span></div>
    <!-- 管理员查询区 -->
    <el-row :gutter="20" style="margin:2rem 2rem 0 2rem">
      <el-col :span="18">
        <el-input @keydown.enter.native="findBook" placeholder="请输入查询的图书" prefix-icon="el-icon-search"
          v-model="bookName">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button plain @click="findBook">点我查询</el-button>
      </el-col>
      <el-col :span="3">
        <el-button plain @click="showAddBook">添加书本</el-button>
      </el-col>
    </el-row>
    <!-- 列表显示区域 -->
    <el-table class="book-table" :data="bookList" style="width: 100%;">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="书名" align="center" prop="book_name"></el-table-column>
      <el-table-column label="图书编号" align="center" prop="book_id"></el-table-column>
      <el-table-column label="作者" align="center" prop="author"></el-table-column>
      <el-table-column label="状态" align="center" prop="state"></el-table-column>
    </el-table>
    <!-- 书本添加区 -->
    <div class="addBook-box" v-if="isAddBook">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="书名">
          <el-input v-model="formLabelAlign.addBookName"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formLabelAlign.author"></el-input>
        </el-form-item>
        <el-form-item label="书本描述">
          <el-input v-model="formLabelAlign.statement"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="addBook">确认添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bookName: '',
        bookList: [],
        formLabelAlign: {
          addBookName: '',
          author: '',
          statement: ''
        },
        isAddBook: false
      }
    },
    methods: {
      async findBook() {
        const res = await this.$http.get(`http://47.107.125.7:8833/api/adminGetBooks?book_name=${this.bookName}`)
        this.bookList = res.data.bookList
      },
      async showAddBook() {
        this.isAddBook = true
      },
      async addBook() {
        let submit = {
          book_name: this.formLabelAlign.addBookName,
          author: this.formLabelAlign.author,
          statement: this.formLabelAlign.statement
        }
        const res = await this.$http.post('http://47.107.125.7:8833/api/adminAddBook', submit)
        if (res.status === 200) {
          this.$message.success({
              message: '添加成功！',
              duration: 500
            }),
          this.formLabelAlign.addBookName = ''
          this.formLabelAlign.author = ''
          this.formLabelAlign.statement = ''
          this.hideAddBook()
        } else {
          this.$message.error({
            message: '添加失败，请稍后再试',
            duration: 500
          })
        }
      },
      async hideAddBook() {
        this.isAddBook = false
      }
    },
    created() {

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

  .addBook-box {
    position: absolute;
    background-color: #f2f5f8;
    box-shadow: 0 0 1.3rem #aaa;
    padding-top: 3.5rem;
    padding-left: 3.5rem;
    padding-right: 3.5rem;
    padding-bottom: 2rem;
    border-radius: 1rem;
    width: 25rem;
    height: 15.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 4rem;
    z-index: 10;
  }

  .mask {
    position: absolute;
    width: 90vw;
    height: 80vh;
  }
</style>