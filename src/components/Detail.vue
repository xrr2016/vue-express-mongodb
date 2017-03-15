<template lang="html">
    <div>
      <mu-circular-progress class="loading" v-if="loadingData" :size="80"/>
      <div class="detail" v-else>
        <div class="detail-left">
          <img class="movie-poster"/>
        </div>
        <div class="detail-right">
            <p class="movie-title">{{ movie.title }} <span>{{ movie.original_title}}</span></p>
            <p class="movie-akas">别名:<span class="movie-aka" v-for="aka of movie.aka">{{aka}}</span></p>
            <p class="movie-genres">
              {{movie.countries.join('')}} ({{movie.year}})
              <span  class="movie-genre" v-for="genre of movie.genres">{{genre}}</span>
              评分: {{movie.rating.average}}
            </p>
            <p class="movie-directors">导演:<a :href="dir.alt" v-for="dir of movie.directors">{{dir.name}}</a></p>
            <p class="movie-actors">
              演员: <a v-for="actor of movie.casts" class="movie-actor" :href="actor.alt">{{actor.name}}</a>
            </p>
            <p class="movie-summary">{{movie.summary}}</p>
            <mu-raised-button @click="goBack" primary>返回</mu-raised-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getMovie(this.$route.params.title)
    document.title = this.$route.name
  },
  data() {
    return {
      movie: {},
      loadingData : true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getMovie(title) {
      // 由于自定的movie模型没有足够的数据,故用前端请求豆瓣的api
      let searchUrl = 'https://bird.ioliu.cn/v1/?url=http://api.douban.com/v2/movie/search?q='
      this.$http.get(`${searchUrl}${title}`)
        .then(res => {
            console.log(res.data)
            let movieUrl = 'https://bird.ioliu.cn/v1/?url=http://api.douban.com/v2/movie/subject'
            let movieId = res.data.subjects[0].id
            if(!!movieId){
              this.$http.get(`${movieUrl}/${movieId}`)
              .then(res => {
                console.dir(res.data)
                if (!!res.data) {
                  this.movie = res.data
                  setTimeout(()=>{
                    document.querySelector('.movie-poster').src = this.movie.images.large
                  },0)
                  this.loadingData = false
                }
              })
              .catch(e => console.log(e))
            }
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="css" scoped>
a{
  color: #03a9f4;
}
.loading{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.detail{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.detail-left{
  padding: 16px;
  margin-left: 80px;
}
.detail-right{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.movie-title{
  width: 100%;
  font-size: 24px;
}
.movie-actors{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.movie-actor{
  margin-right: 12px;
}
.movie-genres{
  width: 100%;
}
.movie-genre{
  margin-right: 12px;
}
.movie-poster{
  width: 300px;
  height: 450px;
}
.movie-directors{
  width: 100%;
}
.movie-summary{
  letter-spacing: 1px;
  text-indent: 2em;
  line-height: 1.4;
  font-size: 16px;
}
.movie-akas{
  width: 100%;
}
.movie-aka{
  margin-right: 12px;
}
</style>
