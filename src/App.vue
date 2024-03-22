<template>
  <nav>
    <router-link to="/">Kodu</router-link>
    |
    <router-link to="/atms">Pangaautomaadid</router-link>
    |
    <template v-if="isLoggedIn">
      <router-link to="/log-out">Logi välja</router-link>
    </template>
    <template v-else>
      <router-link to="/login">Sisse logimine</router-link>
    </template>
  </nav>

  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {

    updateNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null;
    },

  },
  mounted() {
    this.updateNavMenu()
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
