<template>
    <div class="navigation">
        <router-link class="navigation-main" to="/">TradeWarframe</router-link>
        <div class="right-container">
            <div v-if="!loggedIn">
                <button @click="login" class="fancy-button">Login</button>
                <button @click="register" class="fancy-button">Register</button>
            </div>
            <div v-else>
                <router-link :to="{ name: 'profile', params: { name: userData.name } }" class="username"
                    :class="{ admin: userData.admin }">{{ userData.name }}</router-link>
                <button @click="logout" class="fancy-button">Logout</button>
            </div>
            <div>{{ response }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavigationBar",

    data() {
        return {
            response: ""
        }
    },

    methods: {
        login() {
            this.$router.push("/login");
        },

        register() {
            this.$router.push("/register");
        },

        logout() {
            this.$router.push("/login");
            this.$store.commit("clearLoginData");
        },
    },

    computed: {
        userData() {
            return this.$store.state.user;
        },

        loggedIn() {
            return this.$store.state.loggedIn;
        }

    },

    mounted() {
        const jsonData = localStorage.getItem("persist");
        if (jsonData != null) {
            const persist = JSON.parse(jsonData);
            console.log(persist);
            this.$store.commit("setLoginData", {
                user: persist.user,
                token: persist.token
            });
        }
    }
};
</script>

<style scoped>
.navigation {
    background-color: blueviolet;
    padding: 5px;
    margin: 0px;
    display: flex;
}

.navigation-main {
    color: #ececec;
    font-size: 30px;
    font-style: normal;
    font-weight: bold;
    margin-top: auto;
    margin-bottom: auto;
}

.right-container {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
}

.right-container button {
    margin: 5px;
}

.username {
    color: #ececec;
    font-weight: bold;
}

.admin {
    color: crimson;
}
</style>
