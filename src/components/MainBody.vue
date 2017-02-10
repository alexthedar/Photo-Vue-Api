<template>
  <div class="container ">
    <Albums v-bind:userAlbums="userAlbums"
      v-bind:isMobile="isMobile"
      v-on:albumChanged="albumChanged"></Albums>
    <Photos v-bind:albumPhotos="albumPhotos"
            v-bind:isMobile="isMobile"
    ></Photos>
  </div>
</template>

<script>
import Albums from './Albums.vue'
import Photos from './Photos.vue'

export default {
  name: 'app',
  props: ['userAlbums'],
  data () {
    return {
      windowWidth: 0,
      isMobile: false,
      albumPhotos:[]
    }
  },
  components: {
    Albums,
    Photos
  },
  methods: {
    albumChanged: function (albumPhotos) {
      this.albumPhotos = albumPhotos
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
  },
  watch: {
    windowWidth: function(val){
      this.screenIsMobile(val);
    }
  }
}
</script>

<style>

</style>
