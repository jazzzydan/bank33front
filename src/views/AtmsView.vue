<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <AlertDanger :message="message"/>
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown @event-selected-city-change="updateLocationsTable"/>
      </div>
      <div class="col col-6">
        <LocationsTable ref="locationsTableRef"/>
      </div>
    </div>
  </div>
</template>

<script>
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import LocationsTable from "@/components/location/LocationsTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'AtmsView',
  components: {AlertDanger, LocationsTable, CitiesDropdown},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName'),
      message: ''
    }
  },
  methods: {
    updateLocationsTable(selectedCityId) {
      this.$refs.locationsTableRef.selectedCityId = selectedCityId
      this.$refs.locationsTableRef.sendGetAtmLocationsRequest()
    },
  }
}
</script>
