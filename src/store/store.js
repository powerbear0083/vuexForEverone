import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // data
        products: [],
        cart: []
    },
    getters: { // computed
        availableProducts(state, getters) {
            return state.products.filter( (item) => (item.inventory > 0) )
        }
    },
    actions: { // method
        fetchProducts({commit}) {
            return new Promise( (resolve, reject) => {
                // call api
                // call setProducts mutation
                shop.getProducts( ( products ) => {
                    commit('setProducts', products)
                    resolve()
                } )
            })
        },
        addProductToCart(context, product) {
            console.log('----------------', context.state.cart);
            if(product.inventory > 0) {
                const cartItem = context.state.cart.find( (item) => item.id === product.id )
                console.log('----------------',!cartItem );
                if(!cartItem) {
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)
            }
           
        }
    },
    mutations: { // updata state
        setProducts(state, products) {
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