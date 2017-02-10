<template>
  <div class="container ">
    <Albums v-bind:userAlbums="userAlbums" v-on:albumChanged="albumChanged"></Albums>
    <Photos v-bind:albumPhotos="albumPhotos"></Photos>
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
    }
  }
}
</script>

<style>

</style>
