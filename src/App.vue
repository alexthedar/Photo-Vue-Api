<template>
  <div id="app" >
    <Navbar v-on:userChanged="userChanged"
            v-on:newAlbum="newAlbum"
            v-bind:isMobile="isMobile"
            v-bind:album="album"
            v-bind:photo="photo"
            v-on:photoDropdown="photoDropdown"
            v-on:newPhoto="newPhoto">
    </Navbar>
    <MainBody v-bind:userAlbums="userAlbums"
              v-bind:isMobile="isMobile"
              v-bind:mobileAlbumSelect="mobileAlbumSelect"
              v-on:albumSelected="albumSelected"
              v-on:photoSelected="photoSelected"
              v-bind:photoChanged="photoChanged"
              v-bind:photoMenuBool="photoMenuBool">
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
      photo: {},
      photoChanged: {},
      photoMenuBool:false
    }
  },
  methods: {
    newPhoto(photo){
      this.photoChanged = photo
    },
    photoDropdown(bool){
      this.photoMenuBool = bool
    },
    newAlbum(mobileAlbum){
      // this.albumSelected(mobileAlbum)
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
      var mq = (window.matchMedia( "(max-width: 768px)" ).matches);
      mq === true? this.isMobile = true : this.isMobile = false;
      var device = this.checkDevice()
      device === true? this.isMobile = true : this.isMobile = false;

      if(mq === true || device === true){
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    checkDevice(){
      var  deviceCheck = new RegExp('Android|webOS|iPhone|iPad|' +
                                     'BlackBerry|Windows Phone|'  +
                                     'Opera Mini|IEMobile|Mobile' ,'i');
      return deviceCheck.test(navigator.userAgent)? true : false;
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
    this.photoDropdown(this.photoMenuBool)
  },
  watch: {
    windowWidth: function(val){
      this.screenIsMobile(val);
    },
    mobileAlbumSelected: function (val){
      this.albumSelected(val)
    },
    albumSelected: function (val){
      this.album = val
    },
    photoDropdown: function (val){
      this.photoMenuBool = val
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
