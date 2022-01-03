const fs = require('fs')
let request = require('request')
const path = require('path')
const jwt = require('../util/jwt')
const {
    promisify
} = require('util')
const {
    jwtSecret
} = require('../config/config.default')
request = promisify(request)
const {
    nanoid
} = require('nanoid')
const db = require('../database/index')
const mailer = require('../middleware/mail')

// 用户&管理员登录
exports.login = async (req, res, next) => {
    try {
        let data = req.body.user
        let sql =
            `SELECT * FROM user WHERE 
        mail_num = ${db.escape(data.mail_num)}
        AND
        password = MD5(${db.escape(data.password)})
        `
        let result = true
        let id, name
        await db.startQuery(sql).then(ret => {
            if (!ret[0]) {
                result = false
            } else {
                id = ret[0].id
                name = ret[0].name
            }
        })
        if (!result) {
            return res.status(403).send('no')
        }
        // 生成token
        const token = await jwt.sign({
            userId: id
        }, jwtSecret, {
            expiresIn: 60 * 60 * 24 * 1 // token一天后过期
        })
        res.status(200).json({
            id,
            name,
            token
        })
    } catch (err) {
        next(err)
    }
}

// 用户获取注册邮箱验证码
exports.validateMail = async (req, res, next) => {
    try {
        // 生成验证码
        let valiCode = nanoid()
        valiCode = valiCode.substring(0, 4)
        const mailVali = await jwt.sign({
            valiCode
        }, jwtSecret, {
            expiresIn: 60 * 3 // token三分钟后过期
        })
        await mailer.sendMail(
            req.body.mail,
            '确认您的验证码，请不要透露给他人',
            `${valiCode}`)
        res.status(200).json(mailVali)
    } catch (err) {
        next(err)
    }
}

// 用户注册
exports.register = async (req, res, next) => {
    let data = req.body.user
    const decodedKey = await jwt.verify(data.key, jwtSecret)
    // key为经过jwt解析的服务器生成的验证码
    key = decodedKey.valiCode
    if (key !== data.vali) {
        return res.status(400).send('验证码错误')
    }
    // 查询学号和邮箱是否已经被注册
    let isExist = false
    let preSql =
        `SELECT * FROM user 
    WHERE stu_id = ${db.escape(data.stu_id)}`
    let preSql2 =
        `SELECT * FROM user 
    WHERE mail_num = ${db.escape(data.mail_num)}`
    // 学号查重
    await db.startQuery(preSql).then(ret => {
        if (ret[0]) {
            isExist = true
        }
    })
    // 邮箱查重
    await db.startQuery(preSql2).then(ret => {
        if (ret[0]) {
            isExist = true
        }
    })
    // 如果学号已经被注册，则直接返回400
    if (isExist) {
        return res.status(400).send('用户已经存在')
    }
    // 生成用户唯一的nano_id
    let nano_id = nanoid()
    // // 获取到了注册用户输入的昵称和密码，开始注册
    let sql =
        `INSERT INTO user (id,name,password,mail_num,stu_id)
     VALUES(${db.escape(nano_id)},
     ${db.escape(data.name)},
     MD5(${db.escape(data.password)}),
     ${db.escape(data.mail_num)},
     ${db.escape(data.stu_id)})`
    await db.startQuery(sql).then(() => {
        console.log(`用户${db.escape(data.name)}注册成功`)
    })
    // 生成token
    const token = await jwt.sign({
        userId: nano_id
    }, jwtSecret, {
        expiresIn: 60 * 60 * 24 * 1 // token一天后过期
    })
    res.status(200).json({
        id: nano_id,
        token
    })
}

// 获取菜单数据
exports.getMenu = async (req, res, next) => {
    try {
        if (req.user.stu_id === 'admin') {
            return res.status(200).json({
                data: [
                    {
                        'id': 5,
                        'path': '/adminCheck',
                        'authName': '请求批复'
                    },
                    {
                        'id': 6,
                        'path': '/bookManage',
                        'authName': '书本管理'
                    },
                    {
                        'id': 7,
                        'path': '/userManage',
                        'authName': '用户管理'
                    }
                ]
            })
        } else {
            return res.status(200).json({
                data: [{
                        'id': 1,
                        'path': '/user',
                        'authName': '个人中心'
                    },
                    {
                        'id': 2,
                        'path': '/borrowbook',
                        'authName': '借书'

                    },
                    {
                        'id': 3,
                        'path': '/returnbook',
                        'authName': '还书'
                    }
                ]
            })
            next()
        }
        res.status(500).send('no')
    } catch (err) {
        next(err)
    }
}

// 用户查询图书
exports.findBook = async (req, res, next) => {
    try {
        let query = req.query.name
        let query_arr = []
        let loopVar
        for (let i = 0; i < query.length; i++) {
            loopVar = query[i] + '%'
            query_arr.push(loopVar)
        }
        query = '%' + query_arr.join('')
        let sql = `SELECT * FROM book WHERE book_name LIKE ${db.escape(query)} 
        && state = 'available'`
        let ret
        await db.startQuery(sql).then(res => {
            ret = res
        })
        res.status(200).json(ret)
    } catch (err) {
        next(err)
    }
}

// 用户获取书本详情
exports.getBookInfo = async (req, res, next) => {
    try {
        let sql = `SELECT statement FROM book WHERE book_id = ${db.escape(req.query.book_id)}`
        let ret
        await db.startQuery(sql).then(res => {
            ret = res
        })
        res.status(200).json({
            book_info: ret[0].statement
        })
    } catch (err) {
        next(err)
    }
}

// 用户提交借书请求
exports.submitBorrowReq = async (req, res, next) => {
    try {
        let state = db.escape('wait_check_' + req.body.id)
        let sql =
            `UPDATE book
        SET state =  ${state}
        WHERE book_id = ${db.escape(req.body.book_id)}`
        await db.startQuery(sql)
        res.status(200).send('ok')
    } catch (err) {
        next(err)
    }
}

// 用户获取已借阅书本列表
exports.getHasBooks = async (req, res, next) => {
    try {
        let state = db.escape('occupied_' + req.query.id)
        let sql = `SELECT * FROM book WHERE state = ${state}`
        await db.startQuery(sql).then(res => {
            ret = res
        })
        res.status(200).json({
            bookList: ret
        })
    } catch (err) {
        next(err)
    }
}

// 用户还书 (事务)
exports.returnBook = async (req, res, next) => {
    try {
        let sql = `SELECT hasBook FROM user WHERE id = ${db.escape(req.body.id)}`
        let ret
        await db.startQuery(sql).then(res => {
            ret = res[0].hasBook
        })
        ret = ret.replace(`&${req.body.book_id}`, '')
        let sql1 = `UPDATE user SET hasBook = '${ret}' WHERE id = ${db.escape(req.body.id)}`
        let sql2 = `UPDATE book SET state = 'available',due = '' WHERE book_id = ${db.escape(req.body.book_id)}`
        db.pool.getConnection(async function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    next(err)
                }
                connection.query(sql1, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            next(error)
                        })
                    }
                    connection.query(sql2, function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                next(error)
                            })
                        }
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    next(err)
                                })
                            }
                        })
                    })
                })
                connection.release()
            })
        })
        res.status(200).send('ok')
    } catch (err) {
        next(err)
    }
}

// 用户获取审核中书本列表
exports.getOnCheckBooks = async (req, res, next) => {
    try {
        let state = db.escape('wait_check_' + req.query.id)
        let sql = `SELECT * FROM book WHERE state = ${state}`
        let ret
        await db.startQuery(sql).then(res => {
            ret = res
        })
        res.status(200).json({
            bookList: ret
        })
    } catch (err) {
        next(err)
    }
}