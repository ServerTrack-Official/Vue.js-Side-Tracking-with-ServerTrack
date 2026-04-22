<template>
  <div class="container">
    <div class="header">
      <h1>Vue.js ServerTrack Demo</h1>
      <p>E-commerce tracking with ServerTrack.io</p>
    </div>

    <ProductList 
      v-if="page === 'home'"
      @product-click="handleProductClick"
      @add-to-cart="handleAddToCart"
    />

    <ProductView 
      v-if="page === 'product'"
      :product="selectedProduct"
      @add-to-cart="handleAddToCart"
      @back="page = 'home'"
    />

    <Checkout 
      v-if="page === 'checkout'"
      :cart="cart"
      @purchase="handlePurchase"
      @back="page = 'home'"
    />

    <Success 
      v-if="page === 'success'"
      @continue="handleContinue"
    />

    <div v-if="cart.length > 0 && page !== 'checkout' && page !== 'success'" class="cart-float">
      <button class="btn btn-success" @click="page = 'checkout'">
        Checkout ({{ cart.length }} items)
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductList from './components/ProductList.vue'
import ProductView from './components/ProductView.vue'
import Checkout from './components/Checkout.vue'
import Success from './components/Success.vue'
import { trackEvent } from './utils/servertrack'

export default {
  components: {
    ProductList,
    ProductView,
    Checkout,
    Success
  },
  setup() {
    const page = ref('home')
    const selectedProduct = ref(null)
    const cart = ref([])

    const handleProductClick = (product) => {
      selectedProduct.value = product
      page.value = 'product'
      
      trackEvent('ViewContent', {
        content_ids: [product.id],
        content_type: 'product',
        content_name: product.name,
        value: product.price,
        currency: 'USD'
      })
    }

    const handleAddToCart = (product) => {
      cart.value.push(product)
      
      trackEvent('AddToCart', {
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'USD'
      })
    }

    const handlePurchase = (userData) => {
      page.value = 'success'
    }

    const handleContinue = () => {
      cart.value = []
      page.value = 'home'
    }

    return {
      page,
      selectedProduct,
      cart,
      handleProductClick,
      handleAddToCart,
      handlePurchase,
      handleContinue
    }
  }
}
</script>
