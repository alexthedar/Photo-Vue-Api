<template>
  <div class="container fixed-navbar-adjust">
    <Albums v-bind:userAlbums="userAlbums"
            v-bind:isMobile="isMobile"
            v-bind:mobileAlbumSelect="mobileAlbumSelect"
            v-on:albumChanged="albumChanged"
            v-on:albumSelected="albumSelected">
    </Albums>
    <Photos v-bind:albumPhotos="albumPhotos"
            v-bind:isMobile="isMobile"
            v-on:photoSelected="photoSelected">
    </Photos >
    <Photo v-bind:isMobile="isMobile"
            v-bind:showMenu="showMenu"
            v-bind:photoObj="photo">
    </Photo>
  </div>
</template>

<script>
import Albums from './Albums.vue'
import Photos from './Photos.vue'
import Photo from './Photo.vue'

export default {
  name: 'app',
  props: ['userAlbums', 'isMobile', 'mobileAlbumSelect', 'photoChanged', 'photoMenuBool'],
  data () {
    return {
      albumPhotos:[],
      photo:{},
      showMenu: true
    }
  },
  components: {
    Albums,
    Photos,
    Photo
  },
  methods: {
    albumChanged: function (albumPhotos) {
      this.albumPhotos = albumPhotos
    },
    albumSelected: function (album) {
      this.$emit('albumSelected', album)
    },
    photoSelected: function (photoObj) {
      this.photo = photoObj.photo
      this.$emit('photoSelected', photoObj)
    },
    updatePhoto: function (photo){
      this.photo = photo
    },
    updateShowMenu: function(bool){
      this.showMenu = bool
    }
  },
  created: function () {
    this.updatePhoto(this.photoChanged.photo)
    this.updateShowMenu(this.photoMenuBool)
  },
  watch: {
    mobileAlbumSelect: function (val){
    },
    albumChanged: function (val){
      this.albumPhotos = val
    },
    photoChanged: function (val){
      this.updatePhoto(val)
    },
    photoMenuBool: function(val){
      this.updateShowMenu(val)
    }
  }
}
</script>

<style scoped>

</style>
