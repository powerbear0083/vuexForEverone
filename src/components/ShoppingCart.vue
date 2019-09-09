<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li
                v-for="(item, index) in products"
            >
                {{ item.title }} + {{ item.price | currency  }} - {{ item.quantity }}
            </li>
        </ul>
        <p>Total: {{ total | currency  }}</p>
        <button @click="checkout">Checkout</button>
        <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            checkoutStatus: (state) => (state.cart.checkoutStatus)
        }),
        ...mapGetters({
            products: 'cartProducts',
            total: 'cartTotal'
        })
    },
    methods: {
        ...mapActions({
            checkout: 'checkout'
        })
    }
}
</script>
