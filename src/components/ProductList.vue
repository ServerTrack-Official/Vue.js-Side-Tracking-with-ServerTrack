<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <div class="product-image" @click="$emit('product-click', product)">
        {{ product.name }}
      </div>
      <h3>{{ product.name }}</h3>
      <div style="font-size: 24px; color: #2563eb; font-weight: 700; margin: 15px 0">
        ${{ product.price }}
      </div>
      <button class="btn btn-primary" @click="$emit('add-to-cart', product)">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['product-click', 'add-to-cart'],
  data() {
    return {
      products: [
        { id: 'P001', name: 'Wireless Headphones', price: 99.99, category: 'Electronics' },
        { id: 'P002', name: 'Smart Watch', price: 249.99, category: 'Electronics' },
        { id: 'P003', name: 'Laptop Stand', price: 49.99, category: 'Accessories' },
        { id: 'P004', name: 'USB-C Hub', price: 79.99, category: 'Accessories' }
      ]
    }
  }
}
</script>
