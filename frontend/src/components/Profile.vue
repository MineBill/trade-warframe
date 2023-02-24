<template>
    <div>
        <label class="name" :class="{ admin: user.admin }">{{ user.name }}</label>
        <button class="fancy-button ban" v-if="isAdmin" @click="showBanComponent = true"> Ban </button>
    </div>
    <Ban v-if="showBanComponent" :isModifying="true" @canceled="hideBan" @completed="BanCompleted" />
    <DisplayListings :items="user.listings"></DisplayListings>
</template>

<script>
import { getUser, userBan } from '@/services/DataService';
import DisplayListings from './DisplayListings.vue';
import Ban from './Ban.vue';

export default {
    name: 'Profile',
    components: {
        DisplayListings,
        Ban
    },
    data: () => {
        return {
            user: {},
            showBanComponent: false
        }

    },
    methods: {
        hideBan() {
            this.showBanComponent = false;
        },
        BanCompleted(data) {
            this.showBanComponent = false;
            // {reason: ...}
            userBan({ user: this.user.id, reason: data.reason }).then((response) => {
                console.log(response);
            })
        }
    },
    mounted() {
        getUser(this.$route.params.name).then(response => {
            this.user = response;
        });
    },
    computed: {
        isAdmin() {
            return this.$store.state.user.admin;
        }
    }
}
</script>

<style scoped>
.name {
    font-size: 35px;
    padding: 20px;
}

.name::before {
    content: 'Profile of ';
}

.ban {
    background-color: crimson;
}

.admin {
    color: crimson;
}
</style>