// 用户相关的配置
export default {
    namespaced:true,
    actions:{},
    mutations:{
        SAVE(state,value){
            state.id = window.localStorage.getItem('id')
            state.name = window.localStorage.getItem('name')
            state.token = window.localStorage.getItem('token')
        }
    },
    state:{
        id:'',
        name:'',
        token:''
    },
    getters:{

    }
}