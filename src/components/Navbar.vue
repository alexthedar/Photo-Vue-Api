<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
        </a>
        <a class="nav-item is-tab is-hidden-mobile is-active">Home</a>
        <a class="nav-item is-tab is-hidden-mobile">Features</a>
        <a class="nav-item is-tab is-hidden-mobile">Pricing</a>
        <a class="nav-item is-tab is-hidden-mobile">About</a>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
        <a class="nav-item is-tab is-hidden-tablet">Features</a>
        <a class="nav-item is-tab is-hidden-tablet">Pricing</a>
        <a class="nav-item is-tab is-hidden-tablet">About</a>
        <a class="nav-item is-tab">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img src="http://bulma.io/images/jgthms.png">
          </figure>
          Profile
        </a>
        <a class="nav-item is-tab">Log out</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: ['windowWidth'],
  data (){
    return {
      isMobile: false,
      isActive: false
    }
  },
  components: {
  },
  methods: {
    screenIsMobile (windowWidth){
      if(windowWidth < 768 ){
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    showMenu(){
      this.isActive = !this.isActive
    },
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

#mobile-menu-icon:hover {
  display: inline-block;
}


#menu-icon {
display: inline-block;
}
nav ul, nav:active ul {
  display: none;
  z-index: 1000;
  position: absolute;
  background: #6991ac;
  padding: 20px;
  right: 20px;
  top: 60px;
  border: 1px solid #fff;
  border-radius: 10px 0 10px 10px;
  width: 50%
}
nav:hover ul {
  display: block;
}
nav li {
  text-align: center;
  width: 100%;
  padding: 10px 0;
}
</style>
