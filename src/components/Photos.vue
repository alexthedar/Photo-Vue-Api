<template>
  <div id="photos">
    Photos
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'photos',
    components: {
    },
    data: function() {
      return {
        userAlbums:{}
      }
    },
    methods: {
      userChanged: function (userAlbums) {
        this.userAlbums = userAlbums
      }
    }
  }
</script>

<style>

</style>
