<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item">
          <img class="image-cropper" src="http://lorempixel.com/400/400/cats/" alt="logo">
        </a>
        <p id="nav-user-brand" class="nav-item">
          <strong>User:&nbsp;</strong><span> {{user}}</span>
        </p>
      </div>

      <!-- Desktop centered -->
      <div class="nav-center">
        <a @click='userSelected(user.user)' v-bind:class="{'is-active': user == user.user }" v-for="user in users" class="nav-item is-tab is-toggle is-hidden-mobile">
          <div>
            <a class="">{{user.user}}</a>
          </div>
        </a>
      </div>
      <div class="nav-item has-icon">
        <img class="icon is-medium" src="../assets/icons/photo-album.png" alt="logo">

      </div>

      <!-- Mobile dropdown Icon -->
      <span @click="showMenu" class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <!-- Mobile dropdown -->
      <div v-bind:class="{'is-active': isActive }"
          @click="showMenu"
          class="nav-right nav-menu ">
        <div @click='userSelected(user.user)'
            v-for="(user, index) in users"
            class="has-text-centered nav-item  is-hidden-tablet">
          <a class=" ">{{user.user}}</a>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navbar',
  props: ['windowWidth'],
  data (){
    return {
      isActive: false,
      users: [],
      user: ''
    }
  },
  methods: {
    showMenu(){
      this.isActive = !this.isActive
    },
    getUsers() {
      axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => {
        this.users = _(res.data)
        .groupBy(x => x.userId)
        .map((value, key) => ({user: key, albums: value}))
        .value();
      }, (err) => {
        console.log(err)
      })
    },
    userSelected(id){
      this.user === id? this.user = '' : this.user = id;
      var userAlbums = this.users[id-1].albums
      this.$emit('userChanged', userAlbums)
    }
  },
  created: function (){
    this.users = this.getUsers();
  }
}
</script>

<style scoped>
#nav-user-brand {
  font-size: 200%;
}
#nav-user-brand span {
  color: red;
}
</style>
