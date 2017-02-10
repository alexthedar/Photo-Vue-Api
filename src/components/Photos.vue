<template>
  <div id="photos">
    <!-- <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image is-4by3">
          <img src="http://bulma.io/images/placeholders/1280x960.png">
        </p>
      </div>
      <button class="modal-close"></button>
    </div> -->
        <p>
          <a @click="prev">Previous</a> || <a @click="next">Next</a>
        </p>

        <div
           v-for="number in [currentNumber]"
           transition="fade"
           >
        <img
             :src="albumPhotos[Math.abs(currentNumber) % albumPhotos.length].url"
             v-on:mouseover="stopRotation"
             v-on:mouseout="startRotation"
             />
      </div>
      {{albumPhotos}}
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

  export default {
    name: 'photos',
    props: ['albumPhotos'],
    components: {
        Carousel,
        Slide
    },
    data: function() {
      return {
        currentNumber: 0,
        timer: null,
        images: this.albumPhotos
      }
    },
      ready: function () {
              this.startRotation();
          },

          methods: {
              startRotation: function() {
                  this.timer = setInterval(this.next, 3000);
              },

              stopRotation: function() {
                  clearTimeout(this.timer);
                  this.timer = null;
              },

              next: function() {
                  this.currentNumber += 1
              },
              prev: function() {
                  this.currentNumber -= 1
              }
            }
  }
</script>

<style>

</style>
