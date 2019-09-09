import shop from '@/api/shop';
export default {
    // 每個 modules 都包含著自己的 state getters mutations
    state: {
        items: [],
        checkoutStatus: null
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map( (item) => {
                console.log('----cartProducts------------', rootState);
                const product = rootState.product.items.find( (subItem) => ( subItem.id === item.id ) );

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
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.items = []
        }

    },

    actions: {
        addProductToCart( {state, getters, commit }, product) {
            // context 是一個 Object
            // { state, getters, commit } = context 
            // 可以透過 context.commit call mutations 底下的 method
            // 也可以透過 context 呼叫 定義好的 getters method
            // console.log('-----addProductToCart-----------',context );
            // console.log('----------addProductToCart------', context.state.items);
            if(getters.productIsInStock(product)) {
                // find cart item
                const cartItem = state.items.find( (item) => item.id === product.id )
                console.log('----------------',!cartItem );
                if(!cartItem) {
                    // push product to cart
                    commit('pushProductToCart', product.id)
                } else {
                    // increment item quantity
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)
            }
            
        },
        checkout({state, commit}) {
            // 上面的參數是這樣解構的 { state, commit} = context
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                },
            ) 
        }
    }
}