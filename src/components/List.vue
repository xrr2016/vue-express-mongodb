<template lang="html">
  <div class="list">
    <mu-table :fixedHeader="true" :showCheckbox="false" >
        <mu-thead>
          <mu-tr>
            <mu-th>ID</mu-th>
            <mu-th>电影海报</mu-th>
            <mu-th>电影名称</mu-th>
            <mu-th>上映年份</mu-th>
            <mu-th>主要演员</mu-th>
            <mu-th>评分</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="movie of movies">
            <mu-td>{{ movie.id }}</mu-td>
            <mu-td><img :src="movie.image" :title="movie.original_title"></mu-td>
            <mu-td>{{ movie.title }}</mu-td>
            <mu-td>{{ movie.year }}</mu-td>
            <mu-td>
              <p v-for="cast of movie.casts">{{ cast.name }}</p>
            </mu-td>
            <mu-td>{{ movie.rating }}</mu-td>
            <mu-td>
              <mu-raised-button label="修改" primary/>
              <mu-raised-button label="删除" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
    </mu-table>
    <mu-float-button icon="add" class="add-movie-btn" @click="addMovie"/>
    <vodal :show="showModal" animation="slideDown" @hide="show = false" :closeButton="false">

    </vodal>
  </div>
</template>

<script>
export default {
  created() {
    this.getMovies()
  },
  components:{},
  data() {
    return {
      movies: [],
      showModal : false
    }
  },
  methods: {
    getMovies() {
      this.$http.get('/api/movie')
        .then(res => {
          this.movies = res.data
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
    },
    addMovie(){
      this.showModal = true
    }
  }
}
</script>

<style lang="css">
  .list{
  }
  .add-movie-btn{
    position: fixed;
    bottom: 50px;
  }
</style>
