<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown @event-selected-city-change="updateLocationsTable"/>
      </div>
      <div class="col col-6">
        <LocationsTable ref="locationsTableRef" @event-alert-location-deleted="handleLocationRemovedEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import LocationsTable from "@/components/location/LocationsTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'AtmsView',
  components: {AlertSuccess, AlertDanger, LocationsTable, CitiesDropdown},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName'),
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    updateLocationsTable(selectedCityId) {
      this.$refs.locationsTableRef.selectedCityId = selectedCityId
      this.$refs.locationsTableRef.sendGetAtmLocationsRequest()
    },

    handleLocationRemovedEvent(locationName) {
      this.handleLocationRemovedSuccessMessage(locationName)
      this.$refs.locationsTableRef.sendGetAtmLocationsRequest()
    },

    handleLocationRemovedSuccessMessage(locationName) {
      this.successMessage = "Pangaautomaadi info asukohal " + locationName + " edukalt kustutatud!"
      setTimeout(this.resetSuccessMessage,4000)
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },

    handleSessionStorageSuccessMessageAlert() {
      const successMessage = sessionStorage.getItem('successMessage')
      if (successMessage !== null) {
        this.successMessage = successMessage
        sessionStorage.removeItem('successMessage')
        setTimeout(this.resetSuccessMessage ,4000)
      }
    },


  },
  beforeMount() {
    this.handleSessionStorageSuccessMessageAlert()
  }
}
</script>
