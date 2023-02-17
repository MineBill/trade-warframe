<template>
    <div class="top-container">
        <div class="container">
            <h1>{{ getMode() }} listing</h1>
            <form id="lol" @submit.prevent="verifyOptions">
                <vue-select v-model="selectedItem" searchable label-by="name" :options="items" close-on-select
                    :min="1"></vue-select>
                <div class="element">
                    <label for="">Quantity</label>
                    <input class="fancy-input" type="text" name="quantity" v-model="quantity">
                </div>
                <div class="element">
                    <label for="">Price</label>
                    <input class="fancy-input" type="text" name="price" v-model="price">
                </div>
                <div class="element">
                    <label for="">Type</label>
                    <p></p>
                    <vue-select v-model="typeString" :options="['Sell', 'Buy']" close-on-select :min="1"></vue-select>
                </div>
                <button class="fancy-button">Complete</button>
            </form>
            <div class="button-container">
                <button class="fancy-button" @click="$emit('canceled')">Cancel</button>
            </div>
            <div class="error" v-if="error != ''">
                <label>Error: {{ error }}</label>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllitems } from '@/services/DataService'
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

export default {
    name: "ListingEditor",
    components: {
        VueSelect
    },
    props: {
        itemDefault: String,
        quantityDefault: Number,
        priceDefault: Number,
        typeDefault: String,
        isModifying: Boolean
    },
    data() {
        return {
            item: this.itemDefault,
            quantity: this.quantityDefault,
            price: this.priceDefault,
            type: this.typeDefault,
            typeSell: false,
            typeBuy: false,
            error: "",

            selectedItem: "",
            typeString: "",
            items: []
        }
    },
    mounted() {
        getAllitems().then(data => {
            this.items = data.map(item => { return { name: item.displayName, unique: item.uniqueName } });
            const index = this.items.findIndex(i => i.unique == this.item);
            this.selectedItem = this.items[index];
            if (this.type != "" || this.type != undefined) {
                this.typeString = this.type.toLowerCase();
                this.typeString = this.typeString[0].toUpperCase() + this.typeString.substring(1);
                console.log(this.typeString);
            }
        });
    },
    methods: {
        getMode() {
            return this.isModifying ? "Edit" : "New";
        },

        verifyOptions() {
            if (this.price == undefined || this.price < 0) {
                this.error = "Price not set or is incorrect";
                return;
            }

            if (this.quantity == undefined || this.quantity < 0) {
                this.error = "Quantity not set or is incorrect";
                return;
            }

            if (this.selectedItem == undefined || this.selectedItem == "") {
                this.error = "Item not set or is incorrect";
                return;
            }

            if (this.typeString == undefined || this.typeString == "") {
                this.error = "Type not set or is incorrect";
                return;
            }

            this.$emit('completed', {
                item: {
                    uniqueName: this.selectedItem.unique,
                    displayName: this.selectedItem.name,
                },
                price: this.price,
                quantity: this.quantity,
                type: this.typeString.toUpperCase()
            });
        }
    }
}
</script>

<style scoped>
.top-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
}

.container {
    position: relative;
    background-color: #F0F0F4;
    margin-left: auto;
    margin-right: auto;
    top: 10%;
    width: fit-content;
    padding: 1% 5%;
    /* margin-top: 10px; */
    border-radius: 5px;
}

.element {
    padding-top: 15px;
}

.error {
    color: crimson
}

.button-container {
    padding: 10px;
}
</style>