<template>
  <div id="app">
    <div v-for="(value,key) in groups" :key="key">
    <h1>{{ value.name}}</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>球队</th>
          <th>对阵</th>
          <th>球队</th>
          <th>预测</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in value.matches" :key="key+index">
          <th scope="row">{{ index+1 }}</th>
          <td><country-display v-bind:country="teams[item.home_team - 1]" /></td>
          <td>
          <div class="operation">
          <button v-on:click="predictGame(item,1)" type="button" class="btn btn-success" >W(胜)</button>
          <button v-on:click="predictGame(item,0)" type="button" class="btn btn-warning">D(平)</button>
          <button v-on:click="predictGame(item,-1)" type="button" class="btn btn-danger">L(负)</button>
          </div>
          </td>
          <td><country-display v-bind:country="teams[item.away_team - 1]" /></td>
          <td>
            <button v-if="selected !== item.name || !isShowResult" v-on:click="showResult(item)" type="button" class="btn btn-info" >查看</button>
            <div id="result" v-if="selected == item.name && isShowResult">
              <div class="winDiv"  v-show="win!==0"  v-bind:style="{width:win+'%'}">{{win + "%"}}</div>
              <div class="drawDiv" v-show="tie!==0" v-bind:style="{width:tie+'%'}">{{tie + "%"}}</div>
              <div class="loseDiv" v-show="lose!==0" v-bind:style="{width:lose+'%'}">{{lose + "%"}}</div> 
              <div class="warning" v-show="win===0 && tie ===0 && lose ===0">期待您的参与</div>
            </div>       
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import utils from './utils/index.js';
export default {
  name: 'app',
  data () {
   let { groups , teams } = require('../data.json');
   let isShowResult = false;
   let selected = -1, win=0,lose=0,tie=0;
    return {
      groups,
      teams,
      isShowResult,
      selected,
      win,lose,tie
    }
  },
  methods: {
    predictGame(game,result){
      let {name:gameId} = game;
      console.log(`game:${gameId},result:${result}`);
      // saveKey
      game.isShowResult = false;
      utils.push(gameId,result,(resp)=>{
         console.log("response of push: " + JSON.stringify(resp))
      })
      // let groups = this.groups;
      this.selected = gameId;
      this.isShowResult = false;
    },
    showResult(game){
      let {name:gameId} = game;
        // get key
      utils.search(gameId,(resp)=>{
        var result = resp.result    ////resp is an object, resp.result is a JSON string
        console.log("return of rpc call: " + JSON.stringify(result))
        // this.isShowResult = true;
        //game.isShowResult = true;
        this.selected = gameId;
        this.isShowResult = true;
        try {
          const {win, lose, tie} = JSON.parse(result);
          if(win + lose + tie === 0 ){
            return;
          }
          this.win = Math.round(win /(win+lose+tie)*100);
          this.lose =  Math.round(lose /(win+lose+tie)*100);
          this.tie = 100 - this.win - this.lose;
        }catch(err) {
          console.log('parse error')
          this.win = 0;
          this.lose =0;
          this.tie = 0;
        }
      })
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
  margin-top: 100px;
  width: 70%;
  margin: 100px auto;
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

.table th, .table td{
  vertical-align: middle;
}

div .flag {
  width: 2.33em;
  display: block;
  margin: auto;
}

#result {
  border: 1px solid transparent;
  border-radius: 2px;
  height: 20px;
  display: flex;
  position: relative;
  div {
    height: 20px;
    line-height: 20px;
  }
  div.winDiv {
    background-color:#28a745
  }
  div.drawDiv {
    background-color:#ffc107
  }
  div.loseDiv {
    background-color:#dc3545
  }
  div.warning {
    height: 20px;
    line-height: 20px;
    position: absolute;
  }
}
</style>
