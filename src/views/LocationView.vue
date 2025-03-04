<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <h1>{{ pageTitle }}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown ref="citiesDropdownRef" @event-selected-city-change="setCityId"/>
      </div>
      <div class="col col-3">
        <LocationDetailsInput ref="locationDetailsInputRef" @event-new-image-file-selected="setImageData"/>
      </div>
      <!--   atm image   -->
      <div class="col col-2">
        <AtmImage :image-data="atmLocation.imageData"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2 text-nowrap">
        <button @click="navigateToAtmsView" type="button" class="btn btn-outline-secondary m-1">Tagasi</button>
        <button v-if="isEdit" @click="updateAtmLocation" type="button" class="btn btn-outline-success m-1">Salvesta</button>
        <button v-else @click="addAtmLocation" type="button" class="btn btn-outline-success m-1">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import LocationDetailsInput from "@/components/location/input/LocationDetailsInput.vue";

import router from "@/router";
import AtmImage from "@/components/image/AtmImage.vue";


export default {
  name: 'LocationView',
  components: {AtmImage, LocationDetailsInput, CitiesDropdown, AlertSuccess, AlertDanger},

  props: {
    // URL + Path variable
    locationId: String
  },


  data() {
    return {
      // URL + query/request parameter example
      // locationId: useRoute().query.locationId,
      errorMessage: '',
      successMessage: '',

      pageTitle: '',

      isEdit: false,

      atmLocation: {
        cityId: 0,
        locationName: '',
        numberOfAtms: 0,
        imageData: '',
        transactionTypes: [
          {
            transactionTypeId: 0,
            transactionTypeName: '',
            isAvailable: true
          }
        ]
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {

    navigateToAtmsView() {
      router.push({name: 'atmsRoute'})
    },

    updateAtmLocation() {
      this.getAndSetAtmLocationValues()

      if (this.allFieldsWithCorrectInput()) {
        this.sendPutAtmLocationRequest()
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetAlertMessages, 4000)
      }
    },

    sendPutAtmLocationRequest() {
      this.$http.put(`/atm/location/${this.locationId}`, this.atmLocation
      ).then(() => {
        sessionStorage.setItem('successMessage','Pangaautomaadi ' + this.atmLocation.locationName + ' asukoha infot on edukalt muudetud')
        this.navigateToAtmsView()
      }).catch(() => router.push({name: 'errorRoute'}))
    },


    addAtmLocation() {
      this.getAndSetAtmLocationValues()

      if (this.allFieldsWithCorrectInput()) {
        this.sendPostAtmLocationRequest()
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetAlertMessages, 4000)
      }
    },

    setImageData(imageData) {
      this.atmLocation.imageData = imageData
    },

    setCityId(selectedCityId) {
      this.atmLocation.cityId = selectedCityId
    },



    getAndSetAtmLocationValues() {
      this.atmLocation.locationName = this.$refs.locationDetailsInputRef.$refs.locationNameInputRef.locationName
      this.atmLocation.numberOfAtms = this.$refs.locationDetailsInputRef.$refs.numberOfAtmsInputRef.numberOfAtms
      this.atmLocation.transactionTypes = this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.transactionTypes
    },

    allFieldsWithCorrectInput() {
      return this.atmLocation.cityId !== 0 &&
          this.atmLocation.locationName !== '' &&
          this.atmLocation.numberOfAtms !== 0 && this.atmLocation.numberOfAtms !== null &&
          this.atLeastOneTransactionTypeSelected()
    },

    atLeastOneTransactionTypeSelected() {
      for (const transactionType of this.atmLocation.transactionTypes) {
        if (transactionType.isAvailable) {
          return true
        }
      }
      return false
    },

    sendPostAtmLocationRequest() {
      this.$http.post("/atm/location", this.atmLocation)
          .then(() => this.handlePostAtmLocationResponse())
          .catch(error => {
            this.errorResponse = error.response.data
            this.handleError()
          })
    },


    handlePostAtmLocationResponse() {
      this.showSuccessMessage()
      this.resetAllInputFields()
    },

    showSuccessMessage() {
      this.successMessage = 'Pangaautomaadi asukoht "' + this.atmLocation.locationName + '" lisatud!'
      setTimeout(this.resetAlertMessages, 4000)
    },

    resetAllInputFields() {
      this.$refs.citiesDropdownRef.selectedCityId = 0
      this.$refs.locationDetailsInputRef.$refs.locationNameInputRef.locationName = ''
      this.$refs.locationDetailsInputRef.$refs.numberOfAtmsInputRef.numberOfAtms = null
      this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.sendGetTransactionTypesRequest()
      this.$refs.locationDetailsInputRef.$refs.imageInputRef.clearImageInput()
      this.atmLocation.imageData = ''
    },


    handleError() {
      this.handleLocationNameNotAvailableError()
      this.handleSomethingWentWrongError()
    },

    handleLocationNameNotAvailableError() {
      if (this.errorResponse.errorCode === 333) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetAlertMessages, 4000)
      }
    },

    handleSomethingWentWrongError() {
      if (this.errorResponse.errorCode !== 333) {
        router.push({name: 'errorRoute'})
      }
    },


    resetAlertMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    async handleEditLocationPage() {
      await this.sendGetAtmLocationRequest()
      await this.setEditPageFormValues()
      // todo: Kuva salvesta nuppu
      // todo: Implementeeri updateLocation funktsionaalsus
      //
    },

    async setEditPageFormValues() {
      this.pageTitle = 'Muuda asukoha infot'
      this.$refs.citiesDropdownRef.selectedCityId = this.atmLocation.cityId
      this.$refs.locationDetailsInputRef.$refs.locationNameInputRef.locationName = this.atmLocation.locationName
      this.$refs.locationDetailsInputRef.$refs.numberOfAtmsInputRef.numberOfAtms = this.atmLocation.numberOfAtms
      await this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.sendGetTransactionTypesRequest()
      this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.updateTransactionTypes(this.atmLocation.transactionTypes)

    },

    handleAddLocationPage() {
      this.pageTitle = 'Lisa pangaautomaadi asukoht'
      this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.sendGetTransactionTypesRequest()
    },


    async sendGetAtmLocationRequest() {
      await this.$http.get(`/atm/location/${this.locationId}`)
          .then(response => {
            this.atmLocation = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },


    updateIsEditValue() {
      this.isEdit = this.locationId !== ''
    },

    validateAuthorizedAccess() {
      const roleName = sessionStorage.getItem('roleName')
      if (roleName !== 'admin') {
        router.push({name: 'notAuthorizedRoute'})
      }
    },




  },
  mounted() {
    this.validateAuthorizedAccess()

    this.updateIsEditValue()
    if (this.isEdit) {
      this.handleEditLocationPage();
    } else {
      this.handleAddLocationPage()
    }

  },

}
</script>

