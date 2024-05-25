/**
 * Main entry point for the Vue.js application.
 * 
 * This file initializes the Vue instance and mounts the application to the DOM.
 */

import Vue from 'vue' // Import Vue framework
import App from './App.vue' // Import the root App component

// Disable the production tip in the console
Vue.config.productionTip = false

/**
 * Create a new Vue instance and mount it to the DOM element with the ID 'app'.
 * 
 * The render function is used to render the root App component.
 */
new Vue({
  render: h => h(App),
}).$mount('#app')
