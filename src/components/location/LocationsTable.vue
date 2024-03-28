<template>
  <div>
    <ViewLocationInfoModal ref="viewLocationInfoModalRef" :atm-location-info="atmLocationInfo"/>
    <DeleteLocationInfoModal ref="deleteLocationInfoModalRef" :atm-location-info="atmLocationInfo"/>
    <table v-if="atmLocations.length > 0" class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Linn</th>
        <th scope="col">Asukoht</th>
        <th scope="col">Teenused</th>
        <th scope="col">ikoonid</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="atm in atmLocations" :key="atm.locationId">
        <td>{{ atm.cityName }}</td>
        <td>
          <a href="#" @click="openViewLocationInfoModal(atm.locationId)">{{ atm.locationName }}</a>

        </td>
        <td>
          <p v-for="transactionType in atm.transactionTypes" :key="transactionType.transactionTypeName">
            {{ transactionType.transactionTypeName }}
          </p>
        </td>
        <td>
          <font-awesome-icon @click="openDeleteLocationInfoModal(atm.locationId)" class="link-warning cursor-pointer"
                             :icon="['far', 'trash-can']"/>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
import router from "@/router";
import ViewLocationInfoModal from "@/components/modal/ViewLocationInfoModal.vue";
import DeleteLocationInfoModal from "@/components/modal/DeleteLocationInfoModal.vue";

export default {
  name: 'LocationsTable',
  components: {DeleteLocationInfoModal, ViewLocationInfoModal},
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

      atmLocationInfo: {
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
      this.handleNoAtmLocationsFoundError(statusCode);
      this.handleSomethingWentWrongError()
    },

    handleNoAtmLocationsFoundError(statusCode) {
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
    },

    async openViewLocationInfoModal(locationId) {
      await this.sendGetAtmLocationInfoRequest(locationId)
      this.$refs.viewLocationInfoModalRef.$refs.modalRef.openModal()
    },

   async sendGetAtmLocationInfoRequest(locationId) {
    await this.$http.get("/atm/location", {
            params: {
              locationId: locationId
            }
          }
      ).then(response => {
        this.atmLocationInfo = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    async openDeleteLocationInfoModal(locationId) {
      await this.sendGetAtmLocationInfoRequest()
      this.$refs.deleteLocationInfoModalRef.$refs.viewLocationInfoModalRef.$refs.modalRef.openModal()
      this.$refs.deleteLocationInfoModalRef.locationId = locationId
    },


  },
  beforeMount() {
    this.sendGetAtmLocationsRequest()
  }
}
</script>