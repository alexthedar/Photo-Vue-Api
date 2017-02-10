<template>
  <div id="app" >
    <Navbar v-on:userChanged="userChanged"></Navbar>
    <MainBody v-bind:userAlbums="userAlbums"></MainBody>
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
      userAlbums:[]
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
.image-cropper {
    overflow: hidden;
    border-radius: 50%;
}
</style>
