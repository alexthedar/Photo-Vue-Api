<template>
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
      <div v-bind:class="{'is-active': userMenu }"
          @click="showUsers"
          class=" nav-menu ">
        <div @click='userSelected(user.user)'
            v-for="(user, index) in users"
            class="has-text-centered nav-item  is-hidden-tablet">
          <a class=" ">{{user.user}}</a>
        </div>
      </div>

        <!-- <div v-bind:class="{'is-active': albumMenu }"
            @click="showAlbums"
            class=" is-active nav-menu ">
          <div v-for="album in userAlbums"
              class="has-text-centered nav-item  is-hidden-tablet">
            {{album.title}}
          </div>
        </div> -->
        <!-- <div @click='userSelected(user.user)'
            v-for="(user, index) in users"
            class="has-text-centered nav-item  is-hidden-tablet">
          <a class=" ">{{user.user}}</a>
        </div> -->

    </div>
  </nav>
</template>

<script>
import axios from 'axios'
console.log('user',this.userMenu, 'album', this.albumMenu)

export default {
  name: 'navbar',
  props: ['isMobile', 'album'],
  data (){
    return {
      userMenu: false,
      albumMenu: false,
      isTest: true,
      users: [],
      user: '',
      userAlbums:[],
      hasAlbum: false
    }
  },
  methods: {
    showUsers(){

      // this.userMenu = !this.userMenu
      this.userMenu === false ? this.userMenu = true : this.userMenu = false;
      this.albumMenu === true ? this.albumMenu = false : this.albumMenu = false;
      console.log('user',this.userMenu, 'album', this.albumMenu)
    },
    showAlbums(){
      // this.userMenu = false
      // this.albumMenu = !this.albumMenu
      this.albumMenu === false ? this.albumMenu = true : this.albumMenu = false;
      this.userMenu === true ? this.userMenu = false : this.userMenu = false;

      console.log('user',this.userMenu, 'album', this.albumMenu)
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
      this.user === id? this.user = '' : this.user = id;
      this.userAlbums = this.users[id-1].albums
      this.albumMenu = false
      this.hasAlbum = false
      this.$emit('userChanged', this.userAlbums)
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
/*#nav-album {
  font-size: 80%;
}
#nav-album span {
  color: red;
}*/
</style>
