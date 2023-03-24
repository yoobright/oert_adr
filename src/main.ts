import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/dark/css-vars.scss'
import 'element-plus/theme-chalk/display.css'

import en from './locales/en'
import zh from './locales/zh'
import { createI18n } from 'vue-i18n'

// get navigator language
const locale = navigator.language.split('-')[0]

const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

// import './assets/main.css'

const app = createApp(App, {
  provide: {
    baseUrl: import.meta.env.BASE_URL
  }
})

app.use(createPinia())
app.use(router)
// app.use(ElementPlus)

app.use(i18n)
app.mount('#app')
