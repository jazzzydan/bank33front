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
        <p v-for="transactionType in atm.transactionTypes" :key="transactionType.transactionTypeName">
          {{ transactionType.transactionTypeName }}</p>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import router from "@/router";

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

      let prefer = this.selectedCityId
      switch (prefer) {
        case 0:
          prefer = 'code=200, example=0'
          break

        case 2:
          prefer = 'code=200, example=2'
          break
        case 3:
          prefer = 'code=200, example=3'
          break
        case 1:
          prefer = 'code=404, example=1'
          break
      }

      this.$http.get("/atm/locations", {
            params: {
              cityId: this.selectedCityId
            },
            headers: {Prefer: prefer, Accept: 'application/json'}
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