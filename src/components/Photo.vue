<template>
  <div id="photo-template" >
    <!-- showPhoto: {{showPhoto}} -->

    <div v-if="showPhoto" >
      <div class="card-content">
        <div class="title has-text-centered">{{photo.title}}</div>
      </div>
      <div class="card-image">
        <figure class="image is-square">
          <img :src="photo.url" alt="Image">
        </figure>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'photo-template',
    props: ['isMobile', 'photoObj', 'showMenu'],
    data() {
        return {
          showPhoto: false,
          photo: {}
        }
    },
    methods: {
      updatePhoto (photo){
        this.photo = photo
      },
      updateShow(bool){
        this.showPhoto = bool
      }
    },
    created: function(){
      this.updateShow(this.showMenu)
    },
    watch: {
      photoObj: function (val){
        this.updatePhoto(val)
        this.updateShow(true)
      },
      showMenu: function (val){
        this.updateShow(val)
      }
    }
  }
</script>

<style scoped>
</style>
