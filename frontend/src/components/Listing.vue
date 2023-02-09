<template>
  <!-- <div>quantity= {{ quantity }}
    price={{ price }}
    userName={{ userName }}
    item={{ item }}</div> -->
  <div class="container">
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
      <div>
        <hr />
        By: <div class="username">{{ userName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listing',
  props: {
    quantity: Number,
    price: Number,
    userName: String,
    item: String,
  }
}
</script>

<style>
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
}
</style>