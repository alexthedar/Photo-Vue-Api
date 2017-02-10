<template>
  <div id="albums">
    <!-- <header class="nav">
      <button @click="buttonClick" class=" button is-fullwidth" type="button">
        Albums
      </button>
      <div v-for="(album, index) in userAlbums"
            @click='albumSelected(album.id, index)'>

      <div class="box dropdown has-text-centered" v-bind:class="{'is-open': toggleDropdown }">

        {{album.title}}
      </div>

      </div>


    </header> -->

      <div class="my"  >
        <div v-for="(album, index) in userAlbums"
              v-bind:class="[isMobile ? 'is-mobile' :  'is-desktop']"
              @click='albumSelected(album.id, index)'>
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/600/92c952" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  {{album.id}}
                  <p class="title has-text-centered is-5">{{album.title}}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

  </div>
</template>

<script>
import axios from 'axios'
// const button = document.querySelector('.button');
// const dropdown = document.querySelector('.dropdown');
// button.addEventListener('click', () => {
//   dropdown.classList.toggle('is-open');
// });
export default {
  name: 'albums',
  props: ['userAlbums', 'isMobile'],
  components: {
  },
  data: function() {
    return {
      photos: [],
      album: {},
      toggleDropdown: false
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
    getRandomPhoto(albumId){
      // var photos = this.photos[albumId-1].photos
      Math.floor(Math.random() * 6) + 1
    },
    albumSelected(id, index){
      // console.log(id, this.userAlbums[index])
      this.album = this.userAlbums[index]
      // this.album.id === id? this.album = '' : this.album = id;
      var albumPhotos = this.photos[id-1].photos
      this.$emit('albumChanged', albumPhotos)
      this.$emit('albumSelected', this.album)
    },
    buttonClick (){
      this.toggleDropdown = !this.toggleDropdown
    }
  },
  created() {
    this.getPhotos()
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
.dropdown {
  box-shadow: 0 0 2px #777;
  display: none;
  padding: 1em;
  margin: 0;
  line-height: 1em;
  border-radius: 0;
  /*left: 0;*/
  /*position: absolute;*/
  /*top: 100%;*/
  z-index: 1000;
}
.dropdown.is-open {
  display: block;
}
.dropdown.is-open:hover {
      color: #00d1b2;
}
.mobile-album-button{
  line-height: 1em;
  border-radius: 0;
  border: 1px solid #ccc;


}
.mobile-album-button{
  color: #00d1b2;
}
</style>
