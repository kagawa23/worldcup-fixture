import Vue from 'vue'
import App from './App.vue'

Vue.component('country-display', {
  props: ['country'],
  template: '<div><img class="image-rounded flag" v-bind:src="country.flag" alt="name"/>{{country.name}}</div>'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
