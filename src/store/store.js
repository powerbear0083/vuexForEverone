import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import cart from './modules/cart'
import product from './modules/product'
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        cart,
        product
    },
    state: { // data

    },
    getters: { 
        // computed
        // 第一個參數是 state
        // 第二個參數是 getters
        // store 的 getter 用來計算
        // availableProducts(state, getters) {
        //     return state.products.filter( (item) => (item.inventory > 0) )
        // },

        // getter  可以解決 computed 無法傳入參數的問題
        // 在 getter 寫一個 function 即可子元件傳入參數
        // productIsInStock() {
        //     return (item) => {
        //         return item.inventory > 0
        //     }
        // }
    },
    actions,
    mutations: { 
        // mutations 都是處理同步的事件
        // updata state
        // 第一個參數都是 state
        // 第二個是 payload

    }
})