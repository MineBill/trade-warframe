<template>
  <div>quantity= {{ quantity }}
    price={{ price }}
    userName={{ userName }}
    item={{ item }}</div>
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

</style>