<template>
  <div>
    <nav class="nav has-shadow is-fixed-top">
      <div class="container">
        <div class="nav-left">
          <!-- TODO: fix album title to display with word wrap -->
          <!-- <a class="nav-item">
            <img class="image-cropper" src="http://lorempixel.com/400/400/cats/" alt="logo">
            <p v-if="user" id="nav-user-brand" >
              <strong>User:&nbsp;</strong><span> {{user}}</span>
            </p>
          </a>
          <div class="nav-item">
            <p v-if="hasAlbum && !isMobile"  >
              <strong>&nbsp;&nbsp;Album:&nbsp;</strong>
              <span> {{album.title}}</span>
            </p>
          </div> -->
          <!-- Desktop users -->
          <p class="nav-item is-tab is-unselectable is-hidden-mobile">
            <span v-if="!isMobile" class="title">Users</span>
            <i v-if="isMobile" class="icon fa fa-users" aria-hidden="true"></i>
          </p>
          <a @click='userSelected(user.user)' v-bind:class="{'is-active': user == user.user }" v-for="user in users" class="nav-item is-tab is-toggle is-hidden-mobile">
            <div>
              <a class="">{{user.user}}</a>
            </div>
          </a>
          <!-- Navbar break icon -->
          <span class=" is-unselectable is-hidden-mobile">
            <span class="icon is-large " aria-hidden="true">|</span>
          </span>
        </div>

        <!-- Desktop -->
        <div class="nav-right">

          <!-- desktop photo -->
          <div @click="showPhotos" v-if=" hasPhotos  && !isMobile" class="nav-item has-icon">
            <p class="is-tab is-hidden-mobile">
              <span v-if="!isMobile" class="title">Photos</span>
              <i v-if="isMobile" class="fa fa-picture-o" aria-hidden="true"></i>
            </p>
          </div>

          <!-- desktop album -->
          <div @click="showAlbums" v-if=" hasAlbum  && !isMobile" class="nav-item has-icon is-tab">
            <span v-if="!isMobile" class="title">Albums</span>
            <img v-if="isMobile" class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">

          </div>

          <!-- Navbar break icon -->
          <span class=" is-unselectable is-hidden-mobile">
            <span class="icon is-large " aria-hidden="true">|</span>
          </span>


        </div>

        <!-- left nav icons -->
        <div v-if="isMobile && hasAlbum" @click="showAlbums" class="nav-item has-icon">
          <img class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">
        </div>
        <div @click="showUsers" v-if="isMobile " class="nav-item has-icon">
          <span class="icon is-medium " aria-hidden="true">|</span>

          <i class="icon fa fa-users" aria-hidden="true"></i>
        </div>

        <!-- User Mobile dropdown -->
        <div v-if="isMobile" v-bind:class="{'is-active': userMenu }"
            class=" nav-menu ">
          <div @click='userSelected(user.user)'
              v-if="userMenu"
              v-for="(user, index) in users"
              class="has-text-centered nav-item  is-hidden-tablet">
            <a class="navItem">{{user.user}}</a>
          </div>
        </div>

        <!-- albums mobile dropdown -->
          <div  v-if="albumMenu" v-bind:class="{'is-active': albumMenu }"
              class=" nav-menu ">
            <div v-for="(album, index) in userAlbums"
                class="has-text-left nav-item  is-hidden-tablet"
                @click="dropdownAlbumSelect(album, index)">
              {{album.title}}
            </div>
          </div>

        <!-- photos mobile dropdown -->
          <div  v-if="isMobile" v-bind:class="{'is-active': photoMenu }"
              class=" nav-menu ">
            <div class="title has-text-centered">{{album.title}}</div>
            <div class="has-text-left nav-item  is-hidden-tablet">
              lksjdlasjdlaks
            </div>
          </div>

          <!-- end container -->
      </div>


    </nav>

    <!-- desktop album dropdown items -->
    <div  v-if="albumMenu && !isMobile" v-bind:class="{'is-active': albumMenu }"
        class=" nav-menu fixed-navbar-adjust"
        id="album-dropdown-menu">
      <div v-for="(album, index) in userAlbums"
          class="has-text-left nav-item  desktop-dropdown-album-menu"
          @click="dropdownAlbumSelect(album, index)">
        {{album.title}}
      </div>
    </div>


    <!-- desktop photo dropdown items -->
    <!-- <div  v-if="photoMenu && !isMobile"
          v-bind:class="{'is-active': photoMenu }"
          class=" nav-menu fixed-navbar-adjust"
          id="album-dropdown-menu">
        <div class="title has-text-centered">{{album.title}}</div>

    </div> -->

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navbar',
  props: ['isMobile', 'album'],
  data (){
    return {
      userMenu: false,
      albumMenu: false,
      photoMenu: true,
      users: [],
      user: '',
      userAlbums:[],
      hasAlbum: false,
      hasPhotos: false
    }
  },
  methods: {
    showUsers(){
      this.userMenu === false ? this.userMenu = true : this.userMenu = false;
      this.albumMenu === true ? this.albumMenu = false : this.albumMenu = false;
    },
    showAlbums(){
      this.albumMenu === false ? this.albumMenu = true : this.albumMenu = false;
      this.userMenu === true ? this.userMenu = false : this.userMenu = false;
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
      this.albumMenu = false
      this.userMenu === false ? this.userMenu = true : this.userMenu = false;
      this.hasAlbum = false
      this.$emit('userChanged', this.userAlbums)
    },
    dropdownAlbumSelect(album, index){
      this.albumMenu = false
      this.userMenu = false
      album = {index: index, album: album}
      this.$emit('newAlbum', album)
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
      this.albumSelected(val);
    },
    isMobile: function (val){
      this.albumMenu === false
      this.userMenu === false
    }
  }

}
</script>

<style scoped>
#nav-user-brand {
  font-size: 125%;
  padding: 0;
  margin: 0;
}
#nav-user-brand span {
  color: red;
}
.desktop-dropdown-album-menu{
  border-bottom: 1px solid #ccc;
}
.desktop-dropdown-album-menu:hover {
  color: #00d1b2;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

</style>
