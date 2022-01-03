const mysql = require('mysql')
const {
    nextTick
} = require('process')
const {
    dbUri
} = require('../config/config.default')

// 创建mysql数据库连接池(由于mysql是面向连接的数据库，因此连接资源很宝贵)
try{
    var pool = mysql.createPool({
        connectionLimit: 50,
        host: '127.0.0.1',
        user: 'root',       
        password: 'xxxxxxxxxxxxxxx',   //(在此处将xxxx改为你的数据库密码)
        database: 'book_manage'
    })
} catch (err) {
    console.log(err,'err');
}

// 创建数据库查询API
// 使用async 函数，让查询变为异步处理，主线程不需要等待数据库IO操作
async function startQuery(sql) {
    try {
        //async函数返回值为Promise对象，因此创建Promise,在Promise中进行查询操作
        const promise = new Promise((resolve, reject) => {
            let a = pool.getConnection(async function (err, connection) {
                connection.query(sql, async function (err, result, field) {
                    if (err) {
                        console.error("ERROR---" + err.sqlMessage)
                    }
                    // 返回查询结果
                    resolve(result)
                    // 查询完毕后及时释放数据库连接
                    connection.release()
                })
            })
        })
        return promise
    } catch (err) {
        next(err)
    }
}

// 防止sql注入
function escape(e) {
    return pool.escape(e)
}

exports.startQuery = startQuery

exports.escape = escape

exports.pool = pool