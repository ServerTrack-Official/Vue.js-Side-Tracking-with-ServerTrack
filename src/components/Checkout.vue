<template>
  <div>
    <button class="btn btn-primary" @click="$emit('back')" style="margin-bottom: 20px; width: auto; padding: 12px 24px">
      ← Back
    </button>
    <div style="background: white; padding: 40px; border-radius: 8px">
      <h2>Checkout</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.email" type="email" placeholder="Email" required />
        <input v-model="formData.firstName" type="text" placeholder="First Name" required />
        <input v-model="formData.lastName" type="text" placeholder="Last Name" required />
        <input v-model="formData.phone" type="tel" placeholder="Phone" required />
        
        <div style="margin: 20px 0; font-size: 24px; font-weight: 700">
          Total: ${{ total.toFixed(2) }}
        </div>
        
        <button type="submit" class="btn btn-success">Complete Purchase</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { trackEvent } from '../utils/servertrack'

export default {
  props: ['cart'],
  emits: ['purchase', 'back'],
  setup(props, { emit }) {
    const formData = ref({
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    })

    const total = computed(() => {
      return props.cart.reduce((sum, item) => sum + item.price, 0)
    })

    // Fire InitiateCheckout as soon as checkout page loads
    onMounted(() => {
      trackEvent('InitiateCheckout', {
        value: total.value,
        currency: 'USD',
        content_type: 'product',
        num_items: props.cart.length,
        content_ids: props.cart.map(item => item.id),
        contents: props.cart.map(item => ({
          id: item.id,
          quantity: 1,
          item_price: item.price
        }))
      })
    })

    const handleSubmit = () => {
      const userData = {
        em: formData.value.email,
        ph: formData.value.phone,
        fn: formData.value.firstName,
        ln: formData.value.lastName
      }

      trackEvent('Purchase', {
        transaction_id: 'ORD-' + Date.now(),
        value: total.value,
        currency: 'USD',
        content_type: 'product',
        num_items: props.cart.length,
        content_ids: props.cart.map(item => item.id),
        contents: props.cart.map(item => ({
          id: item.id,
          quantity: 1,
          item_price: item.price
        }))
      }, userData)

      emit('purchase', userData)
    }

    return {
      formData,
      total,
      handleSubmit
    }
  }
}
</script>
