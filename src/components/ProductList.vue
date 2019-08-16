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
        // return this.$store.state.products
        return this.$store.getters.availableProducts
      }
    },
    created() {
      this.loading = true
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