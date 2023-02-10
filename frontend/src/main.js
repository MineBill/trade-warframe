import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import DisplayListings from "./components/DisplayListings.vue"
import Register from "./components/Register.vue"
import "./assets/main.css"

const routes = [
    { path: '/', component: DisplayListings },
    { path: '/register', component: Register },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app');