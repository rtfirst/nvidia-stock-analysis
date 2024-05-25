<template>
  <!--
  The root template of the Vue.js application.
  
  Contains the StockChart component.
  -->
  <div id="app">
    <StockChart />
  </div>
</template>

<script>
import StockChart from './components/StockChart.vue' // Import the StockChart component

export default {
  name: 'App', // Name of the root component
  components: {
    StockChart // Register the StockChart component
  }
}
</script>

<style>
/* Styles for the root component */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased; /* Improve font rendering on WebKit browsers */
  -moz-osx-font-smoothing: grayscale; /* Improve font rendering on macOS */
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
