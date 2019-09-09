<template>
  <div>
    <h1>Product list</h1>
    <img 
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif" 
    >
    <ul v-else>
        <li v-for="(item, index) in products"> 
          {{ item.title }} - {{ item.price }} -{{ item.inventory }}
          <button @click="addProductToCart(item)">Add to Cart</button> 
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    },
    computed: {
      products() {
        // 接收 state 傳過來的 state
        // return this.$store.state.products
        return this.$store.getters.availableProducts
      }
    },
    created() {
      this.loading = true;
      // 要在元件觸發 action 必須使用 dispatch
      // 跟 commit 相似，但是 commit 是呼叫 mutations method
      // dispatch 是呼叫 action method

      // 第一個參數是 action name
      // 第二個參數是 payload
      this.$store.dispatch('fetchProducts')
        .then( () => (this.loading = false) )
    },
    methods: {
      addProductToCart(product) {
        this.$store.dispatch('addProductToCart', product)
      }
    }
  }
</script>
<style scoped>
    
</style>