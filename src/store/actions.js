import shop from '@/api/shop';
export default {

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
    addProductToCart( {state, getters, commit }, product) {
        // context 是一個 Object
        // { state, getters, commit } = context 
        // 可以透過 context.commit call mutations 底下的 method
        // 也可以透過 context 呼叫 定義好的 getters method
        // console.log('-----addProductToCart-----------',context );
        // console.log('----------addProductToCart------', context.state.cart);
        if(getters.productIsInStock(product)) {
            // find cart item
            const cartItem = state.cart.find( (item) => item.id === product.id )
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
            state.cart,
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