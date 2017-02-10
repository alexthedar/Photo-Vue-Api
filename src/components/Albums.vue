<template>
  <div id="albums">

      <div class="my"  >
        <div v-for="(album, index) in userAlbums" v-bind:class="[isMobile ? 'is-mobile' :  'is-desktop']">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title has-text-centered is-5">{{album.title}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'albums',
  props: ['userAlbums'],
  components: {
  },
  data: function() {
    return {
      windowWidth: 0,
      isMobile: false,
      photos: []
    }
  },
  methods: {
    albumSelected(id) {
      this.$emit('albumChanged', id)
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    },
    screenIsMobile (windowWidth){
      if(windowWidth < 768 ){
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    getPhotos() {
      axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        this.photos = _(res.data)
        .groupBy(x => x.albumId)
        .map((value, key) => ({album: key, photos: value}))
        .value();
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      //Init
      this.getWindowWidth()
    })
  },
  created: function(){
    this.screenIsMobile(this.windowWidth);
    this.getPhotos(this.photos)
    console.log(this.photos)

  },
  watch: {
    album: function(){
      this.getPhotos(this.photos)
    },
    windowWidth: function(val){
      this.screenIsMobile(val);
    }
  }
}

</script>


<style scoped>
.my{
  display: flex;
  flex-wrap: wrap;
}
.is-mobile {
  width: 100%;
  padding-top: 1em;
}
.is-desktop {
  width: 33.333%;
  padding: 1em;
}
/*.item-mobile {
width: 33.33%;
padding: 1em;
}*/

</style>
