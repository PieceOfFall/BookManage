// 配置JWT设置，用于进行登录和接口使用等权限的校验
const jwt=require('jsonwebtoken')
const {promisify} = require('util')

// 签署jwt
exports.sign=promisify(jwt.sign)

// 验证jwt
exports.verify=promisify(jwt.verify)

// jwt解码
exports.decode=promisify(jwt.decode)