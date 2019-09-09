import shop from '@/api/shop';
export default {
    state: { // data
        items: []
    },
    getters: {
        // computed
        // 第一個參數是 state
        // 第二個參數是 getters
        // store 的 getter 用來計算
        availableProducts(state, getters) {
            console.log('-------getters---------', getters);
            return state.items.filter( (item) => (item.inventory > 0) )
        },

        // getter  可以解決 computed 無法傳入參數的問題
        // 在 getter 寫一個 function 即可子元件傳入參數
        productIsInStock() {
            return (item) => {
                return item.inventory > 0
            }
        }
    },
    mutations: { 
        // mutations 都是處理同步的事件
        // updata state
        // 第一個參數都是 state
        // 第二個是 payload
        setProducts(state, products) {
            console.log('-------state---------', state);
            console.log('-------products---------',products );
            state.items = products
        },
        decrementProductInventory(state, product) {
            product.inventory--
        }

    },
    actions: {
        // actions 可以處理非同步的事件
        // 類似 vue 的 method
        // 要 call api 使用 actions
        fetchProducts({commit}) {
            return new Promise( (resolve, reject) => {
                // call api
                // call setProducts mutation
                // 透過 setProducts 更新 state 底下 products 的狀態
                shop.getProducts( ( products ) => {
                    commit('setProducts', products)
                    resolve()
                } )
            })
        }
    }
}