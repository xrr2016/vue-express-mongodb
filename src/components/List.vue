<template lang="html">
  <div class="list">
    List.vue
  </div>
</template>

<script>
export default {
  created(){
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
