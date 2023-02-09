import { createApp } from 'vue'
import App from './App.vue'
import "./assets/main.css"
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu).mount('#app')