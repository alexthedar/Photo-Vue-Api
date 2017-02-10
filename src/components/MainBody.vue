<template>
  <div class="container ">
    <Albums v-bind:userAlbums="userAlbums" v-on:albumChanged="albumChanged"></Albums>
    <Photos v-bind:albumChanged="albumChanged"></Photos>
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
      albumId:''
    }
  },
  components: {
    Albums,
    Photos
  },
  methods: {
    albumChanged: function (albumId) {
      this.albumId = albumId
    }
  }
}
</script>

<style>

</style>
