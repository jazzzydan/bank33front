<template>
  <LogOutModal ref="logOutModalRef" @event-update-nav-menu="updateNavMenu"/>
  <LogInModal ref="logInModalRef" @event-update-nav-menu="updateNavMenu"/>
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
      <a href="#" @click="openLogOutModal">Logi välja</a>
    </template>
    <template v-else>
      <a href="#" @click="openLogInModal">Logi sisse</a>
    </template>
  </nav>

  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import LogOutModal from "@/components/modal/LogOutModal.vue";
import LogInModal from "@/components/modal/LogInModal.vue";

export default {
  name: 'App',
  components: {LogInModal, LogOutModal},
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

    openLogOutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    },

    openLogInModal() {
      this.$refs.logInModalRef.$refs.modalRef.openModal()
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
