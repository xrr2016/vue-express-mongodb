<template>
  <div id="app">
    <!-- <h2 class="md-dispaly-4 title">{{ title }}</h2> -->
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
  margin-top: 20px;
}
.title{
  letter-spacing: 1px;
}
</style>
