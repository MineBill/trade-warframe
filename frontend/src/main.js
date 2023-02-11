import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import DisplayListings from "./components/DisplayListings.vue"
import Register from "./components/Register.vue"
import LogIn from "./components/LogIn.vue"
import "./assets/main.css"
import store from "./services/DataStore"

const routes = [
    { path: '/', component: DisplayListings },
    { path: '/register', component: Register },
    { path: '/login', component: LogIn },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(store).use(router).mount('#app');