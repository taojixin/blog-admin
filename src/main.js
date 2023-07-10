import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/index.css'
import 'normalize.css'

import "./assets/iconfont/iconfont.css"
import "github-markdown-css"


const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(ElementPlus)
app.use(pinia)

app.mount('#app')
