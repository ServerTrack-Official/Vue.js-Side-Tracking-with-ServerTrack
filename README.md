# Vue.js 3 Server-Side Tracking with ServerTrack.io

A complete e-commerce demo application built with Vue.js 3 and Vite, showcasing server-side tracking integration with ServerTrack.io.

## Features

- 🛍️ Product listing and detail pages
- 🛒 Shopping cart functionality
- 💳 Checkout flow
- 📊 Complete e-commerce event tracking:
  - `ViewContent` - Product view tracking
  - `AddToCart` - Add to cart events
  - `InitiateCheckout` - Fires automatically on checkout page load
  - `Purchase` - Transaction completion with advanced matching

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Composition API** - Modern Vue.js reactive patterns
- **Vite** - Build tool and dev server
- **ServerTrack.io** - Server-side tracking

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Configure ServerTrack in `src/utils/servertrack.js`:
```javascript
const AUTH_KEY = 'YOUR_AUTH_KEY'
const SERVER_DOMAIN = 'some.website.com'
```

## Usage

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
Vue.js-Side-Tracking-with-ServerTrack/
├── src/
│   ├── components/
│   │   ├── ProductList.vue    # Product grid display
│   │   ├── ProductView.vue    # Single product detail
│   │   ├── Checkout.vue       # Checkout page
│   │   └── Success.vue        # Order confirmation
│   ├── utils/
│   │   └── servertrack.js     # ServerTrack integration
│   ├── App.vue                # Main app component
│   ├── main.js                # App entry point
│   └── style.css              # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## ServerTrack Integration

The demo uses the ServerTrack.io SDK and tracks the following e-commerce events:

### SDK Initialization
The SDK is initialized on app load in `src/main.js`:
```javascript
import { initServerTrack } from './utils/servertrack'

initServerTrack()
```

### ViewContent
Triggered when a user clicks on a product:
```javascript
trackEvent('ViewContent', {
  content_ids: [product.id],
  content_type: 'product',
  content_name: product.name,
  value: product.price,
  currency: 'USD'
})
```

### AddToCart
Triggered when a user adds a product to cart:
```javascript
trackEvent('AddToCart', {
  content_ids: [product.id],
  content_type: 'product',
  value: product.price,
  currency: 'USD'
})
```

### InitiateCheckout
Triggered automatically when the checkout page loads using Vue's `onMounted` lifecycle hook:
```javascript
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
```

### Purchase (with Advanced Matching)
Triggered on form submit with full user data for advanced matching:
```javascript
const userData = {
  em: email,      // Email
  ph: phone,      // Phone
  fn: firstName,  // First Name
  ln: lastName    // Last Name
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
```

## Vue.js 3 Composition API

All components use the modern Composition API with `setup()`:

```vue
<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup(props) {
    const total = computed(() =>
      props.cart.reduce((sum, item) => sum + item.price, 0)
    )

    // Fires as soon as component mounts
    onMounted(() => {
      trackEvent('InitiateCheckout', { ... })
    })

    return { total }
  }
}
</script>
```

## Testing

1. Run `npm run dev`
2. Open `http://localhost:5173`
3. Open DevTools (F12) → Network tab
4. Filter by `some.website.com`
5. Browse products and complete checkout
6. Watch tracking events fire:

| Action | Event Fired |
|--------|-------------|
| Click product | `ViewContent` |
| Add to cart | `AddToCart` |
| Arrive at checkout | `InitiateCheckout` (automatic) |
| Submit purchase form | `Purchase` |

## Customization

- Modify products in `src/components/ProductList.vue` data array
- Adjust styling in `src/style.css`
- Add more tracking events in `src/utils/servertrack.js`

## Troubleshooting

### Meta Pixel Warning on Localhost
If you see a warning like:
```
[Meta pixel] is unavailable on this website due to traffic permission settings
```
This is **completely normal on localhost**. ServerTrack sends data server-side which bypasses this restriction. The warning disappears when deployed to your live domain.

### Events Not Firing
- Check browser console for errors
- Verify `AUTH_KEY` is correct in `src/utils/servertrack.js`
- Ensure SDK loaded — check Network tab for `some.website.com`

### content_type Error
All content events require `content_type: 'product'` in the payload. This is already included in all events in this demo.

## License

MIT
