<template lang="html">
  <div class="list">
    <!-- 电影列表 -->
    <mu-table :fixedHeader="true" :showCheckbox="false" >
        <mu-thead>
          <mu-tr>
            <mu-th>电影海报</mu-th>
            <mu-th>电影名称</mu-th>
            <mu-th>简介</mu-th>
            <mu-th>评分</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="movie of movies">
            <mu-td><img class="movie-poster" :src="movie.poster"></mu-td>
            <mu-td><h3>{{ movie.title }}</h3></mu-td>
            <mu-td style="white-space: normal;padding:12px;">{{ movie.introduction }}</mu-td>
            <mu-td class="movie-rating">{{ movie.rating }}</mu-td>
            <mu-td>
              <mu-raised-button @click="openEditMovieModal(movie)" label="修改" primary/>
              <mu-raised-button @click="removeMovie(movie)" label="删除" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
    </mu-table>
    <!-- 添加电影按钮 -->
    <mu-float-button icon="add" class="add-movie-button" backgroundColor @click="openAddMovieModal"/>
    <!-- 添加电影表单 -->
    <vodal :show="addMovieModal" animation="slideDown" :width="500" :height="400" :closeButton="false">
      <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
      <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
      <mu-text-field v-model="introduction" fullWidth icon="description" label="简介" labelFloat/><br/>
      <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
      <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
    </vodal>
    <!-- 编辑电影表单 -->
    <vodal :show="editMovieModal" animation="slideDown" :width="500" :height="400" :closeButton="false">
      <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
      <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
      <mu-text-field v-model="introduction" fullWidth icon="description" label="简介" labelFloat/><br/>
      <mu-text-field type="number" v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
      <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
    </vodal>
    <!-- 删除电影对话框 -->
    <mu-dialog :open="showDialog" title="确定删除电影?" @close="closeDialog">
     <mu-raised-button slot="actions" @click="closeDialog" label="取消"/>
     <mu-raised-button slot="actions" primary @click="closeDialog" label="确定"/>
   </mu-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getMovies()
    document.title =  this.$route.name
  },
  components:{},
  data() {
    return {
      title : '',
      poster : '',
      rating : null,
      introduction : '',
      movie_id : '',
      movies: [],
      addMovieModal : false,
      editMovieModal : false,
      showDialog : false
    }
  },
  methods: {
    getMovies() {
      this.$http.get('/api/movie')
        .then(res => {
          console.dir(res.data)
          this.movies = res.data
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
    },
    closeDialog(){
      this.showDialog = false
    },
    openAddMovieModal(){
      this.addMovieModal = true
    },
    openEditMovieModal(movie){
      this.editMovieModal = true
      this.title = movie.title
      this.rating = movie.rating
      this.introduction = movie.introduction
      this.poster = movie.poster
      this.movie_id = movie._id
    },
    closeModal(){
      this.addMovieModal = false
      this.editMovieModal = false
    },
    addMovie(){
      this.$http.post('/api/movie',{
        title : this.title,
        poster : this.poster,
        introduction : this.introduction,
        rating : this.rating
      })
      .then(res => {
        this.toastr.success('保存成功.')
        console.log(res.data)
        this.addMovieModal = false
        this.title = ''
        this.rating = 0
        this.poster = ''
        this.introduction = ''
        this.getMovies()
      })
      .catch(e => {
        this.toastr.warn('保存失败!')
        console.log(e)
      })
    },
    cancelAddMovie(){
      this.addMovieModal = false
      this.title = ''
      this.rating = 0
      this.poster = ''
      this.introduction = ''
    },
    editMovie(){
      let id = this.movie_id
      this.$http.put(`/api/movie/${id}`,{
                  title : this.title,
                  poster : this.poster,
                  introduction : this.introduction,
                  rating : this.rating,
                })
                .then(res => {
                  this.toastr.success("更新电影成功!")
                  console.log(res.data)
                  this.closeModal()
                  this.getMovies()
                })
                .catch(err => console.log(err))
    },
    removeMovie(movie){
      let id = movie._id
      this.showDialog = true
      this.$http.delete(`/api/movie/${id}`)
                .then(res => {
                  this.toastr.success("删除成功.")
                  console.log(res.data)
                  this.closeDialog()
                  this.getMovies()
                })
                .catch(e => console.log(e))
    },
    searchMovie(){}
  }
}
</script>

<style lang="css">
  .movie-poster{
    width: 100px;
  }
</style>
