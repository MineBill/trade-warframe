<template><!-- <div>quantity= {{ quantity }}
    price={{ price }}
    userName={{ userName }}
    item={{ item }}</div> -->
      <div v-if="!hidden" class="container">
        <div class="inner-container">
          <div class="card">
            <img class="item-icon" src="@/assets/logo.png" alt="">
            <div style="grid-column: 2">
              <div class="title">
                {{ item }}
              </div>
              <hr />
              <div class="price_quantity_container">
                <div class="quantity">
                  Quantity: {{ quantity }}
                </div>
                <div class="price">
                  Price: {{ price }}
                </div>
              </div>
            </div>

          </div>
          <div style="height: fit-content">
            <hr />
            <router-link :to="{name: 'profile', params: {name: userName}}" class="username">{{ userName }}</router-link>
            <div class="buttons" v-if="ownsListing">
              <button class="fancy-button space" @click="soldListing">Sold</button>
              <button class="fancy-button space" @click="modifyListing">Modify</button>
              <button class="fancy-button space" @click="deleteListing">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <ListingEditor v-if="showListingEditor" :isModifying="true" @canceled="hideListingEditor"
        @completed="listingEditorCompleted" :itemDefault="item" :priceDefault="price" :quantityDefault="quantity"
        :typeDefault="type" />
</template>

<script>
import ListingEditor from "@/components/ListingEditor.vue";

import { deleteListing, modifyListing } from "@/services/DataService";
export default {
  name: 'Listing',
  components: {
    ListingEditor
  },
  props: {
    quantityDefault: Number,
    priceDefault: Number,
    userName: String,
    itemDefault: String,
    typeDefault: String,
    id: Number,
    ownsListing: Boolean,
  },
  data() {
    return {
      quantity: this.quantityDefault,
      price: this.priceDefault,
      item: this.itemDefault,
      type: this.typeDefault,

      showListingEditor: false,
      hidden: false,
    }
  },
  methods: {
    soldListing() {
      deleteListing({ id: this.id, completed: true }).then(response => {
        console.log(response);
        this.hidden = true;
      });
    },
    modifyListing() {
      this.showListingEditor = true;
    },
    deleteListing() {
      deleteListing({ id: this.id }).then(response => {
        response;
        this.hidden = true;
      });
    },
    hideListingEditor() {
      this.showListingEditor = false;
    },
    listingEditorCompleted(data) {
      this.showListingEditor = false;
      modifyListing({
        itemName: data.item.uniqueName,
        quantity: data.quantity,
        price: data.price,
        type: data.type,
        listingId: this.id
      });
      this.quantity = data.quantity;
      this.price = data.price;
      this.item = data.item.uniqueName;
      this.type = data.type;
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.inner-container {
  background-color: azure;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 5px;
  padding: 10px;
  margin: auto;
  max-width: 30%;
  overflow: auto;
}

.inner-container:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 25px;
}

.card {
  display: grid;
  grid-template-columns: 50px;

}



.item-icon {
  /* max-width: 10%; */
  width: 40px;
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
}

.quantity {
  float: left;
  margin-left: 0px;
}

.title {
  font-size: 25px;
  color: purple;
}

.price {
  float: right;
  display: flex;
  margin-right: 0px;
}

.price_quantity_container {
  overflow: auto;
}

hr {
  position: relative;
  top: 5px;
  border: 1px;
  border-radius: 5px;
  height: 1px;
  background: #bbb;
  margin-bottom: 20px;
}

.username {
  display: inline;
  color: darkorchid;
  float: left;
  margin-top: 10px;
}

.username::before {
  color: black;
  content: "By: ";
}

.buttons {
  display: inline;
  float: right;
}

.space {
  margin: 3px;
}
</style>