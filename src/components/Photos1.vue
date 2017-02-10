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

    <carousel
            :auto="0"
            :mouse-drag="true"
            :dots="true"
            :watch-items="list">
        <carousel-item v-for="(item, index) in list">
            <p>CarouselItem{{index}}, URL is {{item.url}}</p>
            <img :src="item.url">

        </carousel-item>

        <div slot="before">Insert node before</div>
        <div slot="after">Insert node after</div>
    </carousel>

    <button @click="makeImagesArr(albumPhotos)"></button>
      {{albumPhotos}}
  </div>
</template>

<script>
import { Carousel, CarouselItem } from '../../node_modules/vue-l-carousel'

  export default {
    name: 'photos',
    props: ['albumPhotos'],
    data() {
        return {
            auto: 3000,
            list: []
        }
    },
    components: {
        'carousel': Carousel,
        'carousel-item': CarouselItem
    },
    methods: {
      makeImagesArr(albumPhotos){
        for(var i = 0; i < albumPhotos.length; i++){
          this.list.push({url: albumPhotos[i].url})
        }
        console.log(this.list)
      }
    },
    watch: {
      albumPhotos: function (val){
        this.makeImagesArr(val)
      }
    }

  }
</script>

<style>

</style>
