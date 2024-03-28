<template>
  <Modal ref="modalRef">
    <template #title>
      Sikupilli Prisma
    </template>
    <template #body>

    </template>
    <template #buttons>

    </template>
  </Modal>
</template>


<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ViewLocationInfoModal',
  components: {Modal},
  data() {
    return {
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
    }
  }
}
</script>

