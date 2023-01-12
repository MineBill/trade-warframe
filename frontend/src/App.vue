<template>
  <DisplayListings />
</template>

<script>
import DisplayListings from './components/DisplayListings.vue'

export default {
  name: 'App',
  components: {
    DisplayListings
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px 10px 10px 10px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100%;
  position: fixed;
  background-color: #ecf0f1;
}

body {
  margin: 0;
}
</style>
