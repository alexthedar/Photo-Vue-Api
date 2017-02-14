<template>
    <div id="photos" class="fixed-navbar-adjust">
      <!-- showUserPhotos: {{showUserPhotos}} -->
        <div v-if="showUserPhotos" class="my-columns"  >
          <div v-for="(photo, index) in albumPhotos"
                v-bind:class="[isMobile ? 'is-mobile' :  'is-desktop']"
                @click='photoSelected(photo)'>
              <div class="card-image">
                <figure class="image is-square">
                  <img :src="photo.url" alt="Image">
                </figure>
              </div>
              <div class="card-content">
                <small class="has-text-centered">{{photo.title}}</small>
              </div>
            </div>
        </div>

    </div>

</template>

<script>

  export default {
    name: 'photos',
    props: ['albumPhotos', 'isMobile', 'showMenu'],
    data() {
        return {
          photo: {},
          showUserPhotos: false
        }
    },
    components: {
    },
    methods: {
      photoSelected(photo){
        this.photo = photo;
        var photoObj = {
          photo: photo,
          photos: this.albumPhotos
        }
        this.showUserPhotos = false
        this.$emit('photoSelected', photoObj)
      }
    },
    watch: {
      showMenu: function (val){
        this.showUserPhotos = val
      },
      albumPhotos: function (val){
        this.showUserPhotos = true;
      }
    }
  }
</script>

<style scoped>
.my-columns{
  display: flex;
  flex-wrap: wrap;
}
.is-mobile {
  width: 100%;
  padding-top: 1em;
}
.is-desktop {
  width: 20%;
  padding: .5em .25em 0 .25em;
  /*border: .1px solid #ccc;*/
}
.is-desktop:hover {
  /*filter: invert(100%);*/
  border: 1px solid #00d1b2;
  background: #f5f5f5
}
</style>
