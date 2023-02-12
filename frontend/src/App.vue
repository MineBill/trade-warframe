<template>
  <NavigationBar />
  <router-view></router-view>
</template>

<script>
import { getAllitems } from '@/services/DataService';
import NavigationBar from "@/components/NavigationBar.vue"

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data: () => {
    return {
      items: []
    };
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
  padding: 0px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100%;
  position: fixed;
  background-color: #ecf0f1;
  overflow-y: scroll;
}

body {
  margin: 0;
}
</style>
