<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Kas soovid sisse logida?
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="message"/>
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
              <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Parool</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeLogIn" type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
    </template>
  </Modal>
</template>


<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import router from "@/router";
import Modal from "@/components/modal/Modal.vue";


export default {
  name: 'LogInModal',
  components: {Modal, AlertDanger},
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
        errorCode: 0
      }

    }
  },
  methods: {

    executeLogIn() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.displayAllFieldsRequiredAlert();
      }
    },

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

    sendLoginRequest() {
      this.$http.get('/login', {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleLoginRequestResponse()
      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    handleLoginRequestResponse() {
      this.saveLoginResponseInfoToSessionStorage();
      this.$emit('event-update-nav-menu')
      this.resetAllInputFields()
      this.$refs.modalRef.closeModal()
      router.push({name: 'atmsRoute'})
    },

    saveLoginResponseInfoToSessionStorage() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    resetAllInputFields() {
      this.username = ''
      this.password = ''
    },

    displayAllFieldsRequiredAlert() {
      this.message = "Täida kõik väljad";
      setTimeout(this.resetMessage, 2000);
    },

    handleError(statusCode) {
      this.handleIncorrectCredentialsError(statusCode);
      this.handleSomethingWentWrongError();
    },

    handleIncorrectCredentialsError(statusCode) {
      if (this.incorrectCredentials(statusCode)) {
        this.displayIncorrectCredentialsAlert()
      }
    },

    handleSomethingWentWrongError() {
      if (111 !== this.errorResponse.errorCode) {
        router.push({name: 'errorRoute'})
      }
    },

    incorrectCredentials(statusCode) {
      return statusCode === 403 && this.errorResponse.errorCode === 111;
    },

    displayIncorrectCredentialsAlert() {
      this.message = this.errorResponse.message;
      setTimeout(this.resetMessage, 2000);
    },

    resetMessage() {
      this.message = ''
    },

  }
}
</script>
