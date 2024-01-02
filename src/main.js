import { createApp } from 'vue'
// import './assets/style.css'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import vue3Spinner from 'vue3-spinner'

createApp(App)
    .use(router)
    .use(ToastPlugin)
    .use(vue3Spinner)
    .mount('#app')
