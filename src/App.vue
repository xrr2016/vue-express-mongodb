<template>
  <div id="app">
    <mu-appbar>
      {{ title }}
      <mu-icon-menu icon="menu" class="icon-menu">
        <mu-menu-item title="Help" />
        <mu-menu-item title="Sign out" />
      </mu-icon-menu>
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
.icon-menu{
  float: right;
  margin-right: 30px;
}
</style>
