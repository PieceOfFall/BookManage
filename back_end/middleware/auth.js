const {
    verify
} = require('../util/jwt')
const {
    jwtSecret
} = require('../config/config.default')
const db = require('../database/index')

module.exports = async (req, res, next) => {
    try {
    // 从请求头中获取token数据
    let token = req.headers['authorization']
    token = token ?
        token.split('Bearer ')[1] :
        null
    if (!token) {
        return res.status(401).end()
    }
    // 验证token是否有效

        const decodedToken = await verify(token, jwtSecret)
        let sql = `
        SELECT * FROM user WHERE
        id = ${db.escape(decodedToken.userId)}
        `
        await db.startQuery(sql).then((ret) => {
            ret = ret[0]
            delete ret.password
            req.user = ret
        })
        next()
    } catch (err) {
        return res.status(401).end('未登录')
    }
}