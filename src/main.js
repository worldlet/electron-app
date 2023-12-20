import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 获取环境变量
const mode = import.meta.env.VITE_APP_API_URL;
// console.log('=====', mode)

app.use(createPinia())
app.use(router)

app.mount('#app')
