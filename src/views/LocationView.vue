<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <AlertDanger message="placheholder"/>
        <AlertSuccess message="placeholder"/>
        <h1>Lisa asukoht</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown @event-selected-city-change="setCityId"/>
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
import AtmImage from "@/views/AtmImage.vue";
import router from "@/router";

export default {
  name: 'LocationView',
  components: {AtmImage, LocationDetailsInput, CitiesDropdown, AlertSuccess, AlertDanger},
  data() {
    return {
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
      // todo: kogu andmed kokku, eesmärgiga saata need hiljem backendi
      this.atmLocation.locationName = this.$refs.locationDetailsInputRef.$refs.locationNameInputRef.locationName
      this.atmLocation.numberOfAtms = this.$refs.locationDetailsInputRef.$refs.numberOfAtmsInputRef.numberOfAtms
      this.atmLocation.transactionTypes = this.$refs.locationDetailsInputRef.$refs.transactionTypeCheckboxRef.transactionTypes
    },


  }
}
</script>

