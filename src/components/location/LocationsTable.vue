<template>
  <div>
    <ViewLocationInfoModal ref="viewLocationInfoModalRef" :atm-location-info="atmLocationInfo"/>
    <DeleteLocationInfoModal ref="deleteLocationInfoModalRef" :atm-location-info="atmLocationInfo"
                             @event-alert-location-deleted="emitEventAlertLocationDeleted"
    />
    <table v-if="atmLocations.length > 0" class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Linn</th>
        <th scope="col">Asukoht</th>
        <th scope="col">Teenused</th>
        <th v-if="isAdmin" scope="col"></th>
        <th v-if="isAdmin" scope="col"></th>
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
        <td v-if="isAdmin">
          <font-awesome-icon @click="navigateToEditLocation(atm.locationId)" class="link-warning cursor-pointer"
                             :icon="['far', 'pen-to-square']"/>
        </td>
        <td v-if="isAdmin">
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
      isAdmin: false,
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
            transactionTypeName: ''
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
      this.$http.get(`/atm/locations/city/${this.selectedCityId}` // kasuta template stringi märke (`)
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
        setTimeout(this.resetErrorResponseMessage, 4000)
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
      await this.$http.get(`/atm/location/${locationId}`
      ).then(response => {
        this.atmLocationInfo = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    async openDeleteLocationInfoModal(locationId) {
      await this.sendGetAtmLocationInfoRequest(locationId)
      this.$refs.deleteLocationInfoModalRef.$refs.viewLocationInfoModalRef.$refs.modalRef.openModal()
      this.$refs.deleteLocationInfoModalRef.locationId = locationId
    },

    emitEventAlertLocationDeleted(locationName) {
      this.$emit('event-alert-location-deleted', locationName)
    },

    updateIsAdminValue() {
      const roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName === 'admin'
    },

    navigateToEditLocation(locationId) {
      // URL + query/request parameter example
      // router.push({name: 'locationRoute', query: {locationId: locationId}})

      // URL + Path variable
      router.push({name: 'locationRoute', params: {locationId: locationId}})
    },

  },
  beforeMount() {
    this.sendGetAtmLocationsRequest()
    this.updateIsAdminValue()
  }
}
</script>