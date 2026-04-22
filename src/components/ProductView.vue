<template>
  <div>
    <button class="btn btn-primary" @click="$emit('back')" style="margin-bottom: 20px; width: auto; padding: 12px 24px">
      ← Back
    </button>
    <div style="background: white; padding: 40px; border-radius: 8px">
      <div class="product-image" style="height: 300px">{{ product.name }}</div>
      <h2 style="font-size: 32px; margin: 20px 0">{{ product.name }}</h2>
      <div style="font-size: 36px; color: #2563eb; font-weight: 700; margin-bottom: 20px">
        ${{ product.price }}
      </div>
      <button class="btn btn-primary" @click="$emit('add-to-cart', product)" style="max-width: 300px">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  emits: ['add-to-cart', 'back']
}
</script>
