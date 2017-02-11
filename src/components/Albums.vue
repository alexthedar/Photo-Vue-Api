<template>
  <div id="albums" class="fixed-navbar-adjust">

    <div v-if="showUserAlbums">

      <div class="my-columns"  >
        <div v-for="(album, index) in userAlbums"
            v-bind:class="[isMobile ? 'is-mobile' :  'is-desktop']"
            @click='albumSelected(album.id, index)'>
          <div class="card-image">
            <figure class="image is-square">
              <img :src="coverPhoto(album.id)" alt="Image">
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
import axios from 'axios'


export default {
  name: 'albums',
  props: ['userAlbums', 'isMobile', 'mobileAlbumSelect'],
  components: {
  },
  data: function() {
    return {
      photos: [],
      album: {},
      showUserAlbums: false
    }
  },
  methods: {
    getPhotos() {
      axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        this.photos = _(res.data)
        .groupBy(x => x.albumId)
        .map((value, key) => ({album: key, photos: value}))
        .value();
      }, (err) => {
        console.log(err)
      })
    },
    albumSelected(id, index){
      this.album = this.userAlbums[index]
      var albumPhotos = this.photos[id-1].photos
      this.showUserAlbums = false;
      this.$emit('albumChanged', albumPhotos)
      this.$emit('albumSelected', this.album)
    },
    coverPhoto(id){
      var number = Math.floor(Math.random() * 10) + 0
      return  this.photos[id-1].photos[number].url
    }
  },
  created() {
    this.getPhotos()
  },
  watch: {
    mobileAlbumSelect: function (val){
      this.albumSelected(val.album.id, val.index)
    },
    userAlbums: function (val){
      this.showUserAlbums = true;
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
  width: 33.333%;
  padding: 1em;
}
.is-desktop:hover {
  /*filter: invert(100%);*/
  background: #f5f5f5;
  border: 1px solid #00d1b2;
}

</style>
