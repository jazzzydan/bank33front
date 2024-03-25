<template>
  <table class="table table-dark table-hover">
    <thead>
    <tr>
      <th scope="col">Linn</th>
      <th scope="col">Asukoht</th>
      <th scope="col">Teenused</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="atm in atmLocations" :key="atm.locationId">
      <td>{{ atm.cityName }}</td>
      <td>{{ atm.locationName }}</td>
      <td>
        <p v-for="transactionType in atm.transactionTypes" :key="transactionType.transactionTypeName">{{ transactionType.transactionTypeName }}</p>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'LocationsTable',
  data() {
    return {
      selectedCityId: 0,

      atmLocations: [
        {
          locationId: 0,
          cityName: '',
          locationName: '',
          transactionTypes: [
            {
              transactionTypeName: ''
            }
          ]
        }
      ]


    }
  },
  methods: {

    sendGetAtmLocationsRequest() {
      this.$http.get("/atm/locations", {
            params: {
              cityId: this.selectedCityId
            }
          }
      ).then(response => {
        this.atmLocations = response.data
      }).catch(error => {
        const errorResponseJSON = error.response.data
      })
    },


  },
  beforeMount() {
    this.sendGetAtmLocationsRequest()
  }
}
</script>