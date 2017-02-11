<template>
  <div class="container ">
    <Albums v-bind:userAlbums="userAlbums"
            v-bind:isMobile="isMobile"
            v-bind:mobileAlbumSelect="mobileAlbumSelect"
            v-on:albumChanged="albumChanged"
            v-on:albumSelected="albumSelected">
    </Albums>
    <Photos v-bind:albumPhotos="albumPhotos"
            v-bind:isMobile="isMobile">
    </Photos>
  </div>
</template>

<script>
import Albums from './Albums.vue'
import Photos from './Photos.vue'

export default {
  name: 'app',
  props: ['userAlbums', 'isMobile', 'mobileAlbumSelect'],
  data () {
    return {
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
    albumSelected: function (album) {
      this.$emit('albumSelected', album)
    }
  }
}
</script>

<style>

</style>
