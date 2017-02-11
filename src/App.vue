<template>
  <div id="app" >
    <Navbar v-on:userChanged="userChanged"
            v-on:newAlbum="newAlbum"
            v-bind:isMobile="isMobile"
            v-bind:album="album"
            v-bind:photo="photo">
    </Navbar>
    <MainBody v-bind:userAlbums="userAlbums"
              v-bind:isMobile="isMobile"
              v-bind:mobileAlbumSelect="mobileAlbumSelect"
              v-on:albumSelected="albumSelected"
              v-on:photoSelected="photoSelected">
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
      mobileAlbumSelect:{},
      photo: {}
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
    photoSelected: function (photo) {
      this.photo = photo
      console.log(this.photo)
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
  margin-top: 49px
}
.image-cropper {
    overflow: hidden;
    border-radius: 50%;
}
</style>
