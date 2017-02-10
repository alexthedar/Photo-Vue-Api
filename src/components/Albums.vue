<template>
  <div id="albums">

      <div class="my"  >
        <div v-for="(album, index) in userAlbums" class="item">
          <div class="card ">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title has-text-centered is-5">{{album.title}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script>
export default {
  name: 'albums',
  props: ['userAlbums'],
  components: {
  },
  data: function() {
    return {
      windowWidth: 0,
      isMobile: false,
    }
  },
  methods: {
    albumSelected(id) {
      this.$emit('albumChanged', id)
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWindowWidth);
    },
    screenIsMobile (windowWidth){
      if(windowWidth < 768 ){
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      //Init
      this.getWindowWidth()
    })
  },
  created: function(){
    this.screenIsMobile(this.windowWidth);
  },
  watch: {
    windowWidth: function(val){
      this.screenIsMobile(val);
    }
  }
}

</script>


<style scoped>
.my{
  display: flex;
  flex-wrap: wrap;
}
.item{
  padding: 1em;
}
/*.item-mobile {
width: 33.33%;
padding: 1em;
}*/

</style>
