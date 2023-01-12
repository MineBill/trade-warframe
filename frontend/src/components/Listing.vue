<template>
    <div>quantity= {{quantity}}
    price=10
    userName="user"
    item="Item"</div>
</template>

<script>
export default {
    name: 'Listing',
    props: {
      quantity:Number,
      price:Number,
      userName:String,
      item:String,
      
    }
}

</script>

<style>

</style>