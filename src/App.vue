<template>
  <div id="app">
    <mu-appbar title="Title">
      <mu-icon-button icon='menu' slot="left"/>
      <mu-icon-button icon='expand_more' slot="right"/>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      title  : 'Movie List'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title{
  letter-spacing: 1px;
}
</style>
