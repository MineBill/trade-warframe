<template>
    <DisplayListings :items="listings"></DisplayListings>
</template>

<script>
import { getAllListings } from '@/services/DataService';
import DisplayListings from './DisplayListings.vue';

export default {
    name: 'Home',
    components: {
        DisplayListings
    },
    data: () => {
        return {
            listings: [],
        }
    },
    mounted() {
        getAllListings(25).then(data => {
            this.listings = data
        })
    },
}
</script>

<style scoped>
</style>