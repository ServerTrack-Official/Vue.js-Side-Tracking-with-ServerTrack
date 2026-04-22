import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { initServerTrack } from './utils/servertrack'

initServerTrack()

createApp(App).mount('#app')
