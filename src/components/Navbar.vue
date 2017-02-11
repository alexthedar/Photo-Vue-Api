<template>
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <!-- <img class="image-cropper" src="http://lorempixel.com/400/400/cats/" alt="logo"> -->
            <p v-if="user" id="nav-user-brand" >
              <strong>User:&nbsp;</strong><span> {{user}}</span>
            </p>
          </a>
          <!-- TODO: fix album title to display with word wrap -->
          <div class="nav-item">
            <p v-if="hasAlbum"  >
              <strong>&nbsp;&nbsp;Album:&nbsp;</strong>
              <span> {{album.title}}</span>
            </p>
          </div>
        </div>

        <!-- Desktop users -->
        <div class="nav-right">
          <div @click="showAlbums" v-if=" hasAlbum  && !isMobile" class="nav-item has-icon">
            <img class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">
          </div>

          <p class="nav-item is-tab is-unselectable is-hidden-mobile">
            <i class="icon fa fa-users" aria-hidden="true"></i>
          </p>
          <a @click='userSelected(user.user)' v-bind:class="{'is-active': user == user.user }" v-for="user in users" class="nav-item is-tab is-toggle is-hidden-mobile">
            <div>
              <a class="">{{user.user}}</a>
            </div>
          </a>
        </div>

        <!-- left nav icons -->
        <div v-if="isMobile && hasAlbum" @click="showAlbums" class="nav-item has-icon">
          <img class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">
        </div>
        <div @click="showUsers" v-if="isMobile " class="nav-item has-icon">
          <i class="icon fa fa-users" aria-hidden="true"></i>
        </div>

        <!-- User Mobile dropdown -->
        <div v-if="isMobile" v-bind:class="{'is-active': userMenu }"
            class=" nav-menu ">
          <div @click='userSelected(user.user)'
              v-for="(user, index) in users"
              class="has-text-centered nav-item  is-hidden-tablet">
            <a class="navItem">{{user.user}}</a>
          </div>
        </div>

          <div  v-bind:class="{'is-active': albumMenu }"
              class=" nav-menu ">
            <div v-for="(album, index) in userAlbums"
                class="has-text-left nav-item  is-hidden-tablet"
                @click="dropdownAlbumSelect(album)">
              {{album.title}}
            </div>
          </div>
      </div>
    </nav>

    <!-- desktop dropdown menu -->
    <div  v-if="albumMenu && !isMobile" v-bind:class="{'is-active': albumMenu }"
        class=" nav-menu "
        id="album-dropdown-menu">
      <div v-for="(album, index) in userAlbums"
          class="has-text-left nav-item  desktop-dropdown-album-menu"
          @click="dropdownAlbumSelect(album)">
        {{album.title}}
      </div>
    </div>
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
      users: [],
      user: '',
      userAlbums:[],
      hasAlbum: false
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
    dropdownAlbumSelect(album){
      this.albumMenu = false
      this.userMenu = false
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

</style>
