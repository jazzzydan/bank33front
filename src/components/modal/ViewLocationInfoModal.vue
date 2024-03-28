<template>
  <Modal ref="modalRef">
    <template #title>
      {{ atmLocationInfo.locationName }}
    </template>
    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="text-nowrap">Automaatide arv: {{atmLocationInfo.numberOfAtms}}</div>
            <p v-for="transactionType in atmLocationInfo.transactionTypes" :key="transactionType.transactionTypeName">
              {{transactionType.transactionTypeName}}
            </p>
          </div>
          <div class="col">
            <AtmImage :image-data="atmLocationInfo.imageData"/>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>

import Modal from "@/components/modal/Modal.vue";
import AtmImage from "@/components/image/AtmImage.vue";

export default {
  name: 'ViewLocationInfoModal',
  components: {AtmImage, Modal},
  props: {
    atmLocationInfo: {}
  }
}
</script>

