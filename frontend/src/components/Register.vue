<template>
    <div class="register-header">Register</div>
    <div class="register-form">
        <form @submit.prevent="register">
            <label>
                Email address
                <input class="filter-input" type="email" v-model="email" />
            </label>
            <label>
                Account name
                <input class="filter-input" type="text" v-model="username" />
            </label>
            <label>
                Password
                <input class="filter-input" type="password" v-model="password" />
            </label>
            <!-- <label>
                Verify password
                <input type="password" v-model="passwordVerify" />
            </label> -->
            <button class="fancy-button" style="margin-top: 10px" type="submit">Sign up</button>
        </form>
        <div v-if="error != ''">
            <div class="error">Error: {{ error }}</div>
        </div>
    </div>
</template>

<script>
import { registerUser } from '@/services/DataService';

export default {
    name: 'Register',
    components: {
    },
    data: () => {
        return {
            username: "",
            email: "",
            password: "",

            error: "",
        }
    },
    methods: {
        register: function () {
            this.error = "";
            registerUser({
                username: this.username,
                email: this.email,
                password: this.password
            }).then((response) => {
                if (response.message) {
                    this.error = response.message;
                    return;
                }

                this.$router.push("/login");
            });
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.register-header {
    background-color: purple;
    color: azure;
    padding: 15px;
    font-size: 2em;
    border-radius: 5px;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.register-form {
    padding: 40px;
    /* background-color: azure; */
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 25px;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
}

.filter-input {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* max-width: 30px; */
    border-radius: 5px;
    border-style: solid;
    /* border-color: darkorchid; */
    padding: 5px;
}

.error {
    color: crimson;
    font-weight: bold;
}
</style>