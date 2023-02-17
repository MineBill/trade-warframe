import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import Home from "./components/Home.vue"
import Register from "./components/Register.vue"
import LogIn from "./components/LogIn.vue"
import Profile from "./components/Profile.vue"
import "./assets/main.css"
import store from "./services/DataStore"

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: LogIn },
    { path: '/profile/:name', name: 'profile', component: Profile },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(store).use(router).mount('#app');