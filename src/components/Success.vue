<template>
  <div style="text-align: center; padding: 60px 20px; background: white; border-radius: 8px">
    <div style="font-size: 80px; color: #10b981">✓</div>
    <h1 style="font-size: 36px; margin-bottom: 15px">Purchase Complete!</h1>
    <p style="font-size: 18px; color: #666; margin-bottom: 30px">
      Thank you for your order.
    </p>
    <button class="btn btn-primary" @click="$emit('continue')" style="max-width: 300px; margin: 0 auto">
      Continue Shopping
    </button>
  </div>
</template>

<script>
export default {
  emits: ['continue']
}
</script>
