<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <h1>Lisa asukoht</h1>
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
        <button @click="addAtmLocation" type="button" class="btn btn-outline-success m-1">Lisa</button>
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
    setImageData(imageData) {
      this.atmLocation.imageData = imageData
    },

    setCityId(selectedCityId) {
      this.atmLocation.cityId = selectedCityId
    },

    navigateToAtmsView() {
      router.push({name: 'atmsRoute'})
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

    validateAuthorizedAccess() {
      const roleName = sessionStorage.getItem('roleName')
      if (roleName !== 'admin') {
        router.push({name: 'notAuthorizedRoute'})
      }
    },


  },
  beforeMount() {
    this.validateAuthorizedAccess()
  }
}
</script>

