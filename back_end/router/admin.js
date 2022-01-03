const express = require('express')
const adminCtrl = require('../controller/admin')
const router = express.Router()
const auth = require('../middleware/auth')

// 管理员页面验证拦截
router.get('/adminValidate',adminCtrl.adminValidate)
// 管理员账号注册
router.post('/adminRegister',adminCtrl.adminRegister)
// 管理员获取借阅请求列表
router.get('/adminGetBorrowList',auth,adminCtrl.adminGetBorrowList)
// 管理员同意借阅
router.post('/adminAgreeBorrow',auth,adminCtrl.adminAgreeBorrow)
// 管理员添加书本
router.post('/adminAddBook',auth,adminCtrl.adminAddBook)
// 管理员查看书本状态
router.get('/adminGetBooks',auth,adminCtrl.adminGetBooks)
// 管理员查询用户
router.get('/adminGetUsers',auth,adminCtrl.adminGetUsers)
// 管理员重置用户密码
router.post('/resetPassword',auth,adminCtrl.resetPassword)

module.exports = router