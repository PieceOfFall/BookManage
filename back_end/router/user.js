const express = require('express')
const userCtrl = require('../controller/user')
const router = express.Router()
const auth = require('../middleware/auth')

// 用户登录
router.post('/userlogin', userCtrl.login)
// 页面验证拦截
router.get('/loginValidate',auth,(req,res)=>{
    res.status(200).json({
        ok:'ok'
    })
})
// 用户注册
router.post('/userregister', userCtrl.register)
// 用户获取菜单
router.get('/getFormData', auth ,userCtrl.getMenu)
// 用户邮箱验证
router.post('/validateMail',userCtrl.validateMail)
// 用户查询图书
router.get('/findBook',auth,userCtrl.findBook)
// 用户获取书本详情
router.get('/getBookInfo',auth,userCtrl.getBookInfo)
// 用户提交借书请求
router.post('/submitBorrowReq',auth,userCtrl.submitBorrowReq)
// 用户获取已借阅书本列表
router.get('/getHasBooks',auth,userCtrl.getHasBooks)
// 用户还书
router.post('/returnBook',auth,userCtrl.returnBook)
// 用户获取审核中书本列表
router.get('/getOnCheckBooks',auth,userCtrl.getOnCheckBooks)

module.exports = router