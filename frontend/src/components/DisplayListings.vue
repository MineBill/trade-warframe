<template>
    <div class="listings_background">
        <div v-for="(listing, index) in listings" v-bind:key="index">
            <Listing />
        </div>
    </div>
</template>

<script>
import { getAllListings } from '@/services/DataService';
import Listing from "@/components/Listing.vue";

export default {
    name: 'DisplayListings',
    data: () => {
        return {
            listings: []
        }
    },
    mounted() {
        getAllListings(25).then(data => {
            this.listings = data
        })
    },
    components: {
        Listing
    }
}
</script>
<style>
.listings_background {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 5px;
}
</style>
