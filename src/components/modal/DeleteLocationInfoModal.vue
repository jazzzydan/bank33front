<template>
  <div>
    <ViewLocationInfoModal ref="viewLocationInfoModalRef" :atm-location-info="atmLocationInfo">

      <template #buttons>
        <button @click="sendDeleteLocationRequest" type="button" class="btn btn-danger">Kustuta</button>
      </template>

    </ViewLocationInfoModal>
  </div>
</template>


<script>
import ViewLocationInfoModal from "@/components/modal/ViewLocationInfoModal.vue";
import router from "@/router";

export default {
  name: 'DeleteLocationInfoModal',
  components: {ViewLocationInfoModal},
  props: {
    atmLocationInfo: {}
  },
  data() {
    return {
      locationId: 0
    }
  },
  methods: {
    sendDeleteLocationRequest() {
      this.$http.delete(`/atm/location/${this.locationId}`)
          .then(() => {
            this.$emit('event-alert-location-deleted', this.atmLocationInfo.locationName)
            this.$refs.viewLocationInfoModalRef.$refs.modalRef.closeModal()
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
  }

}
</script>

