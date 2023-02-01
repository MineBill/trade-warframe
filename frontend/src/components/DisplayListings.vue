<template>
    <div>
        <input type="text" v-model="input" placeholder="Search here any item..." />
        <button type="button" @click="searchBar">Search</button>
    </div>
    <div class="listings_background">
        <div v-for="(listing, index) in listings" v-bind:key="index">
            <Listing :item="listing.item.uniqueName" :price="listing.price" :quantity="listing.quantity"
                :userName="listing.user.name" />
        </div>
    </div>
</template>

<script>
import { getAllListings, getListingsByName } from '@/services/DataService';
import Listing from "@/components/Listing.vue";

export default {
    name: 'DisplayListings',
    data: () => {
        return {
            listings: [],
            input: '',
        }
    },
    props: {
        items: Array
    },
    mounted() {
        getAllListings(25).then(data => {
            this.listings = data
        })
    },
    components: {
        Listing
    },
    methods: {
        searchBar: function () {
            if (this.input.length) {
                for (let item of this.items) {
                    if (this.input == item.uniqueName) {
                        getListingsByName(this.input).then(data => {
                            this.listings = data;
                        })
                        break;
                    }
                }
            }

        }
    }
}
</script>
<style>
.listings_background {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 5px;
}
</style>
