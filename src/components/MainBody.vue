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
            v-bind:photoObj="photoObj">
    </Photo>
  </div>
</template>

<script>
import Albums from './Albums.vue'
import Photos from './Photos.vue'
import Photo from './Photo.vue'

export default {
  name: 'app',
  props: ['userAlbums', 'isMobile', 'mobileAlbumSelect'],
  data () {
    return {
      albumPhotos:[],
      photoObj:{}
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
    photoSelected: function (photo) {
      this.photoObj = photo
      // console.log(this.photoObj)
      this.$emit('photoSelected', photo)
    }
  },
  created: function () {
    console.log(this.mobileAlbumSelect)
  },
  watch: {
    mobileAlbumSelect: function (val){
      console.log('mobilealbumselected', val)
    }
  }
}
</script>

<style scoped>

</style>
