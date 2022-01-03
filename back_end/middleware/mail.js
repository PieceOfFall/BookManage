const nodemailer = require('nodemailer')

let authUser = 'xxxxxxxxxxxxxx'
let authPass = 'xxxxxxxxxxxxxx'

let transporter = nodemailer.createTransport({
    host:'smtp.qq.com',
    secureConnection:true,
    port:465,
    secure:true,
    auth:{
        user: authUser,
        pass: authPass
    }
})

async function sendMail(address,title,content){
    try{
        let mailOption = {
            from: authUser,
            to:`${address}`,
            subject:`${title}`,
            text:`${content}`
        }
        transporter.sendMail(mailOption,(err,info)=>{
            if(err) {
                console.log(err)
            } else{
                console.log('邮件发送:'+ info.response)
            }
        })
    } catch(err) {
        next(err)
    }
}

exports.sendMail = sendMail