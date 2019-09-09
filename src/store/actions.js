import shop from '@/api/shop';
export default {

    // actions 可以處理非同步的事件
    // 類似 vue 的 method
    // 要 call api 使用 actions
    // fetchProducts({commit}) {
    //     return new Promise( (resolve, reject) => {
    //         // call api
    //         // call setProducts mutation
    //         // 透過 setProducts 更新 state 底下 products 的狀態
    //         shop.getProducts( ( products ) => {
    //             commit('setProducts', products)
    //             resolve()
    //         } )
    //     })
    // }
}