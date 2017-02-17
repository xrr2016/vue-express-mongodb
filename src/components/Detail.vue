<template lang="html">
  <div class="detail">
    <mu-card>
      <mu-card-media title="Image Title" subTitle="Image Sub Title">
        <img src="" />
      </mu-card-media>
      <mu-card-title title="Content Title" subTitle="Content Title"/>
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
        找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-raised-button primary label="返回" @click="goBack"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMovie(this.$route.params.title)
    document.title = this.$route.name
  },
  data() {
    return {
      movie : {}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getMovie(title) {
      // const jsonBird = "https://bird.ioliu.cn/v1?url="
      // const doubanMovie = "http://api.douban.com/v2/movie/search?q="
      this.$http.get(`/search?q=${title}`)
        .then(res => {
          let movieId = res.data.subjects[0].id
          this.$http.get(`/subject/${movieId}`)
                    .then(res => {
                      console.log(res.data)
                      this.movie = res.data
                    })
                    .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="css">
</style>
