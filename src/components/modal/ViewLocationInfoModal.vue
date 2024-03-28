<template>
  <Modal ref="modalRef">
    <template #title>
      {{ atmLocationInfo.locationName }}
    </template>
    <template #body>

    </template>
  </Modal>
</template>


<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ViewLocationInfoModal',
  components: {Modal},
  props: {
    atmLocationInfo: {}
  }
}
</script>

