<template>
    <div id="photos">
<h1>photos</h1>
        <div class="my"  >
          <div v-for="(photo, index) in albumPhotos"
                v-bind:class="[isMobile ? 'is-mobile' :  'is-desktop']"
                @click='photoSelected(photo.id)'>
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="photo.url" alt="Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    {{photo.id}}
                    <p class="title has-text-centered is-5">{{photo.title}}</p>
                    <p>{{photo}}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>

</template>

<script>

  export default {
    name: 'photos',
    props: ['albumPhotos', 'isMobile'],
    data() {
        return {
          photoUrls:[]
        }
    },
    components: {
    },
    methods: {
      makeImagesArr(albumPhotos){
        for(var i = 0; i < albumPhotos.length; i++){
          this.photoUrls.push({url: albumPhotos[i].url})
        }
      }
    },
    watch: {
      albumPhotos: function (val){
        this.makeImagesArr(val)
      }
    }

  }
</script>

<style scoped>
.my{
  display: flex;
  flex-wrap: wrap;
}
.is-mobile {
  width: 100%;
  padding-top: 1em;
}
.is-desktop {
  width: 33.333%;
  padding: 1em;
}
/*.item-mobile {
width: 33.33%;
padding: 1em;
}*/

</style>
