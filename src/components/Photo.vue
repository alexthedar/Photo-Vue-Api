<template>
  <div id="photo-template" >
    {{photoObj}}

    <div v-if="showPhoto" >
      <div class="card-content">
        <div class="title has-text-centered">{{photoObj.title}}</div>
      </div>
      <div class="card-image">
        <figure class="image is-square">
          <img :src="photoObj.url" alt="Image">
        </figure>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'photo-template',
    props: ['isMobile', 'photoObj'],
    data() {
        return {
          showPhoto: false
        }
    },
    watch: {
      photoObj: function (val){
        this.showPhoto = true;
      }
    }
  }
</script>

<style scoped>
</style>
