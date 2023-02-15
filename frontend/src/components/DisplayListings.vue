<template>


    <div class="listings_background">
        <div>
            <div style="margin: auto" class="fancy-input-group">
                <input class="fancy-input" type="search" v-model="input" placeholder="Search here any item..." />
            </div>
            <div>
                <div class="filter-input">
                    Quantity:
                    <input type="text" v-model="quantity_min" placeholder="min" />
                    <input type="text" v-model="quantity_max" placeholder="max" />
                </div>
                <div class="filter-input">
                    Price:
                    <input type="text" v-model="price_min" placeholder="min" />
                    <input type="text" v-model="price_max" placeholder="max" />
                </div>
            </div>
            <button class="fancy-button" type="button" @click="searchBar">Search</button>
            <button class="fancy-button" type="button" @click="newListing">New Listing</button>
        </div>
        <div v-for="(listing, index) in listings" v-bind:key="index">
            <Listing :item="listing.item.uniqueName" :price="listing.price" :quantity="listing.quantity"
                :userName="listing.user.name" />
        </div>
        <ListingEditor v-if="showListingEditor" :isModifying="true" @canceled="hideListingEditor"
            @completed="listingEditorCompleted" />
    </div>
</template>

<script>
import { getAllListings, getListingsByName } from '@/services/DataService';
import Listing from "@/components/Listing.vue";
import ListingEditor from "@/components/ListingEditor.vue"

export default {
    name: 'DisplayListings',
    data: () => {
        return {
            listings: [],
            input: '',
            quantity_min: 0,
            quantity_max: 0,
            price_min: 0,
            price_max: 0,
            showListingEditor: false
        };
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
        Listing,
        ListingEditor
    },
    methods: {
        newListing() {
            this.showListingEditor = true;
        },

        hideListingEditor() {
            this.showListingEditor = false;
        },

        listingEditorCompleted(data) {
            data;
            this.showListingEditor = false;
        },

        searchBar: function () {
            if (this.input.length) {
                for (let item of this.items) {
                    if (this.input == item.uniqueName) {
                        getListingsByName(this.input).then(data => {
                            this.listings = this.filterItems(data);
                        })
                        break;
                    }
                }
            }
        },

        filterItems: function (items) {
            let result = this.filterPrice(items);
            result = this.filterQuantity(result);
            return result;
        },

        filterPrice: function (items) {
            if (this.price_min == 0 && this.price_max == 0) {
                return items;
            }

            let result = [];

            for (let item of items) {
                if (item.price >= this.price_min && item.price <= this.price_max) {
                    result.push(item);
                }
            }
            return result;
        },

        filterQuantity: function (items) {
            if (this.quantity_min == 0 && this.quantity_max == 0) {
                return items;
            }

            let result = [];

            for (let item of items) {
                if (item.quantity >= this.quantity_min && item.quantity <= this.quantity_max) {
                    result.push(item);
                }
            }
            return result;
        }
    }
}
</script>
<style>
.listings_background {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 5px;
}

.filter-input input {
    max-width: 30px;
    border-radius: 5px;
    border-style: solid;
    /* border-color: darkorchid; */
    padding: 5px;
}
</style>
