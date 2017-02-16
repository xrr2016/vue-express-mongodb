<template>
  <div id="app">
    <mu-appbar>
      {{ title }}
      <mu-icon value="search" :size="24" class="search-icon"/>
    </mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      title  : '电影列表'
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
.search-icon{
  float: right;
  margin-right: 30px;
  margin-top: 24px;
}
</style>
