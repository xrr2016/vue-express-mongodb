<template lang="html">
  <md-table-card>
      <!-- <md-toolbar>
        <h1 class="md-title" style="flex:1;">Movie List</h1>
        <md-button class="md-icon-button">
         <md-icon>search</md-icon>
        </md-button>
      </md-toolbar> -->

      <md-table-header>
       <md-table-row>
         <md-table-head>电影海报</md-table-head>
         <md-table-head>电影名称</md-table-head>
         <md-table-head>上映年份</md-table-head>
         <md-table-head>电影类型</md-table-head>
         <md-table-head>电影评分</md-table-head>
         <md-table-head>操作</md-table-head>
       </md-table-row>
     </md-table-header>

     <md-table-body>
       <md-table-row v-for="movie of movies" :key="movie.id">
         <md-table-cell><img :src="movie.image" alt=""></md-table-cell>
         <md-table-cell>{{ movie.title }}</md-table-cell>
         <md-table-cell>{{ movie.genres }}</md-table-cell>
         <md-table-cell md-numeric>{{ movie.rating}}</md-table-cell>
         <md-table-cell>
           <md-button class="md-primary">编辑</md-button>
           <md-button class="md-warn">删除</md-button>
         </md-tanle-cell>
       </md-table-row>
     </md-table-body>

  </md-table-card>
</template>

<script>
export default {
  mounted(){
    this.getMovies()
  },
  data(){
    return {
        movies : []
    }
  },
  methods:{
    getMovies(){
      this.$http.get('/api/movie')
           .then(res => {
             this.movies = res.data
             console.dir(res.data[0])
           })
           .catch(err => {
              toastr.error(`${err.message}`,'ERROR!')
              console.log(err)
           })
    }
  }
}
</script>

<style lang="css">
  .list{
  }
</style>
