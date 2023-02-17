<template>
    <div class="name">{{ user.name }}</div>
    <DisplayListings :items="user.listings"></DisplayListings>
</template>

<script>
import { getUser } from '@/services/DataService';
import DisplayListings from './DisplayListings.vue';

export default {
    name: 'Profile',
    components: {
        DisplayListings
    },
    data: () => {
        return {
            user: {},
        }
    },
    methods: {
    },
    mounted() {
        getUser(this.$route.params.name).then(response => {
            this.user = response;
        });
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
</style>