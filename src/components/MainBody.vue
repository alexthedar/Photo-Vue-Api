<template>
  <div class="container ">
    Mainbody
    <Users></Users>
    <Albums></Albums>
    <Photos></Photos>
  </div>
</template>

<script>
import Users from './Users.vue'
import Albums from './Albums.vue'
import Photos from './Photos.vue'

export default {
  name: 'app',
  components: {
    Users,
    Albums,
    Photos
  }
}
</script>

<style>

</style>
