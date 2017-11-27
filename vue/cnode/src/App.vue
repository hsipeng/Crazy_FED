<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './vuex/store'

export default {
  name: 'app',
  store
}
</script>

<style lang='scss'>
@import url('./css/font-awesome.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
