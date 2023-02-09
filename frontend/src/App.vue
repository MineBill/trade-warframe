<template>
  <DisplayListings :items="items" />
</template>

<script>
import DisplayListings from './components/DisplayListings.vue'
import { getAllitems } from '@/services/DataService';

export default {
  name: 'App',
  components: {
    DisplayListings

  },
  data: () => {
    return {
      items: []
    }
  },
  mounted() {
    getAllitems().then(data => {
      this.items = data
    })
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
