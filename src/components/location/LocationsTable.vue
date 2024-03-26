<template>
  <table v-if="atmLocations.length > 0" class="table table-dark table-hover">
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
          {{ transactionType.transactionTypeName }}
        </p>
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
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      }

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
        this.errorResponse = error.response.data
        this.handleErrorResponse(error.response.status)
      })
    },

    handleErrorResponse(statusCode) {
      this.handleNotAtmLocationsFoundError(statusCode);
      this.handleSomethingWentWrongError()
    },

    handleNotAtmLocationsFoundError(statusCode) {
      if (statusCode === 404 && this.errorResponse.errorCode === 222) {
        this.clearLocationsTable()
        this.$parent.$data.message = this.errorResponse.message;
        setTimeout(this.resetErrorResponseMessage, 2000)
      }
    },

    handleSomethingWentWrongError() {
      if (222 !== this.errorResponse.errorCode) {
        router.push({name: 'errorRoute'})
      }
    },

    resetErrorResponseMessage() {
      this.$parent.$data.message = ''
    },

    clearLocationsTable() {
      this.atmLocations = []
    }
  },
  beforeMount() {
    this.sendGetAtmLocationsRequest()
  }
}
</script>