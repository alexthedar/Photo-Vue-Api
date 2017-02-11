<template>
  <div>
    <div class="container">
    <nav class="nav has-shadow is-fixed-top">
        <!-- Desktop users  -->
        <div class="nav-left">
          <p class="nav-item is-tab is-unselectable is-hidden-mobile">
            <span v-if="!isMobile" class="title">Users</span>
            <i v-if="isMobile" class="icon fa fa-users" aria-hidden="true"></i>
          </p>
          <a @click='userSelected(user.user)' v-bind:class="{'is-active': user == user.user }" v-for="user in users" class="nav-item is-tab is-toggle is-hidden-mobile">
            <div>
              <a class="text-color">{{user.user}}</a>
            </div>
          </a>
        </div>
        <!-- End Desktop users  -->

        <!-- mobile nav icons -->
        <div class="nav-center">
          <!-- users -->
          <div @click="showUsers" v-if="isMobile " class="nav-item has-icon">
            <i class="icon fa fa-users" aria-hidden="true"></i>
          </div>

          <!-- album -->
          <div v-if="isMobile && hasAlbum" @click="showAlbums" class="nav-item has-icon">
            <img class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">
          </div>

          <!-- photos -->
          <div v-if="isMobile && hasPhotos" @click="showPhotos" class="nav-item has-icon">
            <i class="icon fa fa-picture-o" aria-hidden="true"></i>
          </div>
        </div>
        <!-- end mobile nav icons -->

        <!-- Desktop Album & Photos icons -->
        <div class="nav-right">

          <!-- desktop album icon-->
          <div @click="showAlbums" v-if=" hasAlbum  && !isMobile" class="nav-item has-icon is-tab">
            <span v-if="!isMobile" class="title">Albums</span>
            <img v-if="isMobile" class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">
          </div>

          <!-- Navbar break icon -->
          <span v-if=" hasPhotos  && !isMobile" class=" is-unselectable is-hidden-mobile">
            <span class="icon is-large " aria-hidden="true">|</span>
          </span>

          <!-- desktop photo icon -->
          <div @click="showPhotos" v-if=" hasPhotos  && !isMobile" class="nav-item has-icon">
            <p class="is-tab is-hidden-mobile">
              <span v-if="!isMobile" class="title">Photos</span>
            </p>
          </div>

        </div>
        <!-- End Desktop Album & Photos icons -->

        <!-- User  dropdown  -->
        <div v-if=" isMobile" v-bind:class="{'is-active': userMenu }"
              class=" dropdown-menu nav-menu is-active   ">
          <div @click='userSelected(user.user)'
                v-if="userMenu"
                v-for="(user, index) in users"
                class="nav-item  dropdown-menu-items   is-hidden-tablet">
            <a class="text-color">{{user.user}}</a>
          </div>
        </div>
        <!-- end container -->
      </div>

        <!-- albums  dropdown -->
          <nav v-if="albumMenu" v-bind:class="{'is-active': albumMenu }"
              class=" dropdown-menu nav-menu is-active  fixed-navbar-adjust">
            <div class=" has-text-centered dropdown-menu-header is-fullwidth">
              User <span>{{user}}</span> Albums
            </div>
            <div v-for="(album, index) in userAlbums"
                class="has-text-left nav-item  dropdown-menu-items is-fullwidth"
                @click="dropdownAlbumSelect(album, index)">
              {{album.title}}
            </div>
          </nav>


          <div v-if="photoMenu" v-bind:class="{'is-active': photoMenu }"
                class="  header-adjust  fixed-navbar-adjust">
            <div class=" has-text-centered dropdown-menu-header is-fullwidth">
              Album: <span>{{album.title}}</span>
            </div>
            <div v-for="(photo, index) in albumPhotos"
                  @click="dropdownPhotoSelect(photo, index)">
            <div class="has-text-centered  dropdown-menu-items  is-fullwidth">
              {{photo.title}}
            </div>
            </div>
          </div>

      <!-- end navbar -->
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navbar',
  props: ['isMobile', 'album', 'photo'],
  data (){
    return {
      userMenu: false,
      albumMenu: false,
      photoMenu: false,
      users: [],
      user: '',
      userAlbums:[],
      hasAlbum: false,
      hasPhotos: false,
      photoObj: {},
      albumPhotos: []
    }
  },
  methods: {
    showUsers(){
      this.userMenu === false ? this.userMenu = true : this.userMenu = false;
      this.albumMenu = false;
      this.photoMenu = false;
    },
    showAlbums(){
      this.albumMenu === false ? this.albumMenu = true : this.albumMenu = false;
      this.userMenu = false;
      this.photoMenu = false;
    },
    showPhotos(){
      this.albumMenu = false;
      this.userMenu = false;
      this.photoMenu === false ? this.photoMenu = true : this.photoMenu = false;
      // TODO: remove element when photo drop down comes not working
      this.$emit('photoDropdown', !this.photoMenu)
    },
    getUsers() {
      axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => {
        this.users = _(res.data)
        .groupBy(x => x.userId)
        .map((value, key) => ({user: key, albums: value}))
        .value();
      }, (err) => {
        console.log('error:' ,err)
      })
    },
    userSelected(id){
      this.user = id
      this.userAlbums = this.users[id-1].albums
      this.hasAlbum = true
      this.$emit('userChanged', this.userAlbums)
      this.showUsers()
    },
    dropdownAlbumSelect(album, index){
      this.hasPhotos = true
      album = {index: index, album: album}
      this.$emit('newAlbum', album)
      this.showAlbums()
    },
    dropdownPhotoSelect(photo, index){
      this.albumMenu = false
      this.userMenu = false
      this.$emit('newPhoto', photo)
      this.showPhotos()
    },
    albumSelected(album){
      this.hasAlbum = _.values(album).some(x => x !== undefined); // true
    }
  },
  created: function (){
    this.users = this.getUsers();
    this.albumSelected(this.album);
  },
  watch: {
    album: function (val){
      this.hasAlbum = true
      // this.albumSelected(val);
    },
    isMobile: function (val){
      this.albumMenu === false
      this.userMenu === false
    },
    photo: function (val){
      this.hasPhotos = true
      this.albumPhotos = val.photos
      this.photoObj = val
    }
  }

}
</script>

<style scoped>

.dropdown-menu {
  z-index: 3000;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.dropdown-menu-items {
  line-height: 1em;
  padding: 1em;
  background: #fff;
  border-top: 1px solid #ccc;
}
.dropdown-menu-header {
  width: 100%;
  font-size: 200%;
  background: #ccc;

}
.dropdown-menu-header span {
  color: red;
}

.dropdown-menu-items:hover {
  color: #00d1b2;
  background: #f5f5f5
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.nav-item a.is-tab:hover, a.nav-item.is-tab:hover {
  background: #f5f5f5;
}
.text-color:hover {
  color: #00d1b2;

}

</style>
