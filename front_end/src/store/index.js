import Vuex from 'vuex'
import Vue from 'vue'
import userOptions from './User'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        userAbout:userOptions
    }
})