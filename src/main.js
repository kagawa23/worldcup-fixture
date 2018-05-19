import Vue from 'vue'
import App from './App.vue'

Vue.component('country-display', {
  props: ['country'],
  // data: function () {
  //   return {
  //     count: 0
  //   }
  // },
  template: '<div>{{country.name}}<img class="image-rounded" src={{country.flag}} alt="name"/></div>'
})

new Vue({
  el: '#app',
  render: h => h(App)
})
