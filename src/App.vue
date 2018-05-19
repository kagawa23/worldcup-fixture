<template>
  <div id="app">
    <div v-for="(value,key) in groups" :key="key">
    <h1>{{ value.name}}</h1>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team1</th>
          <th>Against</th>
          <th>Team2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in value.matches" :key="key+index">
          <th scope="row">{{ index+1 }}</th>
          <td><country-display v-bind:country="teams[item.away_team - 1]" /></td>
          <td>Otto</td>
          <td>{{ teams[item.away_team - 1].name }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
   let { groups , teams } = require('../data.json');
    return {
      msg: 'Welcome to Your Vue.js App',
      groups,
      teams
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

// caption {
//     padding-top: 8px;
//     padding-bottom: 8px;
//     color: #777;
//     text-align: left;
// }
</style>
