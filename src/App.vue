<template>
  <Modal/>
  <nav>
    <router-link to="/">Kodu</router-link>
    |
    <router-link to="/atms">Pangaautomaadid</router-link>
    |
    <template v-if="isLoggedIn">
      <template v-if="isAdmin" >
        <router-link to="/location">Asukoht</router-link>
        |
      </template>
      <a href="#" @click="executeLogOut">Logi välja</a>
    </template>
    <template v-else>
      <router-link to="/login">Sisse logimine</router-link>
    </template>
  </nav>

  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import router from "@/router";
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'App',
  components: {Modal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    }
  },
  methods: {

    updateNavMenu() {
      this.updateIsLoggedInValue()
      this.updateIsAdminValue()
    },

    updateIsLoggedInValue() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    updateIsAdminValue() {
      if (this.isLoggedIn) {
        let roleName = sessionStorage.getItem('roleName');
        this.isAdmin = roleName === 'admin'
      }
    },

    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      router.push({name: 'homeRoute'})
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
