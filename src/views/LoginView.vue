<template>
  <div class="container text-start">
    <div class="row justify-content-center">
      <div class="col col-3">

        <AlertDanger :message="message"/>


        <div class="mb-3">
          <label for="username" class="form-label">Kasutajanimi</label>
          <input v-model="username" type="text" class="form-control" id="username">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Parool</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div class="d-grid mx-auto col-6 mt-4">
          <button @click="login" type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      message: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0,
      }

    }
  },
  methods: {


    login() {

      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.displayAllFieldsRequiredAlert();
      }


    },

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },


    incorrectCredentials(statusCode) {
      return statusCode === 403 && this.errorResponse.errorCode === 111;
    },


    sendLoginRequest() {
      this.$http.get('/login', {
        params: {
          username: this.username,
          password: this.password
        }
      }).then(response => {

        this.loginResponse = response.data
        this.saveLoginResponseInfoToSessionStorage();


      }).catch(error => {
        this.statusCode = error.response.status
        this.errorResponse = error.response.data

        if (this.incorrectCredentials(error.response.status)) {
          this.displayIncorrectCredentialsAlert()
        }

      })
    },

    saveLoginResponseInfoToSessionStorage() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },


    displayIncorrectCredentialsAlert() {
      this.message = this.errorResponse.message;
      setTimeout(this.resetMessage, 2000);
    },

    displayAllFieldsRequiredAlert() {
      this.message = "Täida kõik väljad";
      setTimeout(this.resetMessage, 2000);
    },

    resetMessage() {
      this.message = ''
    },


  }
}
</script>
