import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // data
        products: [],
        cart: []
    },
    getters: { 
        // computed
        // 第一個參數是 state
        // 第二個參數是 getters
        // store 的 getter 用來計算
        availableProducts(state, getters) {
            console.log('-------getters---------', getters);
            return state.products.filter( (item) => (item.inventory > 0) )
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
        },
        addProductToCart(context, product) {
            console.log('-----addProductToCart-----------',context );
            console.log('----------addProductToCart------', context.state.cart);
            if(product.inventory > 0) {
                // find cart item
                const cartItem = context.state.cart.find( (item) => item.id === product.id )
                console.log('----------------',!cartItem );
                if(!cartItem) {
                    // push product to cart
                    context.commit('pushProductToCart', product.id)
                } else {
                    // increment item quantity
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)
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
            state.products = products
        },
        // const cartItem = { id: 123, Quantity: 2}
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        }

    }
})