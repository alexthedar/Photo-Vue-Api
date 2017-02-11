<template>
  <div id="app" >
    <Navbar v-on:userChanged="userChanged"
            v-on:newAlbum="newAlbum"
            v-bind:isMobile="isMobile"
            v-bind:album="album">
    </Navbar>
    <MainBody v-bind:userAlbums="userAlbums"
              v-bind:isMobile="isMobile"
              v-bind:mobileAlbumSelect="mobileAlbumSelect"
              v-on:albumSelected="albumSelected">
    </MainBody>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import MainBody from './components/MainBody.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    MainBody
  },
  data: function() {
    return {
      userAlbums:[],
      windowWidth: 0,
      isMobile: false,
      album: {},
      mobileAlbumSelect:{}
    }
  },
  methods: {
    newAlbum(mobileAlbum){
      this.albumSelected(mobileAlbum)
      this.mobileAlbumSelect = mobileAlbum
    },
    albumSelected: function (album) {
      this.album = album
    },
    userChanged: function (userAlbums) {
      this.userAlbums = userAlbums
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
.fixed-navbar-adjust{
  padding-top: 55px
}
.image-cropper {
    overflow: hidden;
    border-radius: 50%;
}
</style>
