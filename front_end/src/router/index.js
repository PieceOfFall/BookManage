import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../NotFound'
import Login from '../views/Login'
import Home from '../views/Home'
import Welcome from '../views/Welcome'
// 用户页面导入
import User from '../views/user/User'
import BorrowBook from '../views/user/BorrowBook'
import ReturnBook from '../views/user/ReturnBook'
// 管理员页面导入
import AdminCenter from '../views/admin/AdminCenter'
import AdminCheck from '../views/admin/AdminCheck'
import BookManage from '../views/admin/BookManage'
import UserManage from '../views/admin/UserManage'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        children: [{
                path: '/welcome',
                component: Welcome
            },
            {
                path: '/user',
                component: User
            },
            {
                path: '/borrowbook',
                component: BorrowBook
            },
            {
                path: '/returnbook',
                component: ReturnBook
            },
            {
                path: '/admin',
                component: AdminCenter
            },
            {
                path: '/adminCheck',
                component: AdminCheck
            },
            {
                path: '/bookManage',
                component: BookManage
            },
            {
                path: '/userManage',
                component: UserManage
            }
        ],
        redirect: '/welcome'
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login')
        return next()
    // 验证token是否有效，做页面拦截
    async function Validate() {
        if (to.path === '/admin' || to.path === '/adminCheck' || to.path === '/bookManage' || to.path === '/userManage') {
            let id = window.localStorage.getItem('id').substring(0, 5)
            if (id === 'admin') {
                const res = await Vue.prototype.$http.get(Vue.prototype.baseUrl+'/adminValidate')
                if (res.status === 200) {
                    return next()
                } else {
                    Vue.prototype.$message.error({
                        message: '你的暗号不对呢',
                        duration: 1500
                    })
                    return
                }
            } else {
                Vue.prototype.$message.error({
                    message: '你的暗号不对呢',
                    duration: 1500
                })
                return
            }
        }
        await Vue.prototype.$http.get(Vue.prototype.baseUrl+'/loginValidate').then(res => {
            // 放行
            next()
        }).catch(err => {
            Vue.prototype.$message.error({
                message: '你的暗号已经不对了呢',
                duration: 1500
            })
            return next('/login')
        })
    }
    // 获取token
    const jwt = window.localStorage.getItem('token')
    // 如果token不存在直接返回到登录界面
    if (!jwt) {
        Vue.prototype.$message.error({
            message: '你还没登录呢',
            duration: 1500
        })
        return next('/login')
    }
    // 调用验证
    Validate()

})

export default router