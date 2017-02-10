<template>
  <div id="app" >
    <Navbar v-bind:windowWidth="windowWidth"></Navbar>
    <MainBody v-bind:windowWidth="windowWidth"></MainBody>
    <!-- <Foot v-bind:windowWidth="windowWidth"></Foot> -->
    <div class="push"></div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import MainBody from './components/MainBody.vue'
import Foot from './components/Foot.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    MainBody,
    Foot
  },
  data: function() {
    return {
      windowWidth: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      //Init
      this.getWindowWidth()
    })
  },
  methods: {
  getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  }
}
</script>

<style>
.image-cropper {
    overflow: hidden;
    border-radius: 50%;
}
</style>
