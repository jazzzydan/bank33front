<template>
  <div class="container text-start">
    <div class="row justify-content-center">
      <div class="col col-3">

        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Kasutajanimi</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Parool</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <button @click="login" type="submit" class="btn btn-primary">Logi sisse</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {

    login() {

      alert('Kasutaja ' + this.username + ', parooliga ' + this.password + ' edukalt sisse logitud')
    },

  }
}
</script>
