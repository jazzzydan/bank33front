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
    <tr>
      <td>Tallinn</td>
      <td>Mustamäe Prisma</td>
      <td>
        <p>Sularaha sisse</p>
        <p>Sularaha välja</p>
        <p>Välja</p>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'LocationsTable',
  data(){
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
        const responseJSON = response.data
      }).catch(error => {
        const errorResponseJSON = error.response.data
      })
    },



  },
  beforeMount() {

  }
}
</script>