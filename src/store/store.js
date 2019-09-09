import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // data
        products: [],
        cart: [],
        checkoutStatus: null
    },
    getters: { 
        // computed
        // 第一個參數是 state
        // 第二個參數是 getters
        // store 的 getter 用來計算
        availableProducts(state, getters) {
            console.log('-------getters---------', getters);
            return state.products.filter( (item) => (item.inventory > 0) )
        },

        cartProducts(state) {
            return state.cart.map( (item) => {
                const product = state.products.find( (subItem) => ( subItem.id === item.id ) );

                return {
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity
                }
            })
        },

        cartTotal(state, getters) {
            return getters.cartProducts.reduce( (accumulator, currentValue) => ( accumulator + currentValue.price * currentValue.quantity), 0)
        },

        // getter  可以解決 computed 無法傳入參數的問題
        // 在 getter 寫一個 function 即可子元件傳入參數
        productIsInStock() {
            return (item) => {
                return item.inventory > 0
            }
        }
    },
    actions,
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
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.cart = []
        }

    }
})