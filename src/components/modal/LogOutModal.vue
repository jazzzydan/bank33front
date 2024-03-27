<template>
  <Modal ref="modalRef">
    <template #title>
      Logi välja?
    </template>
    <template #buttons>
      <button type="button" class="btn btn-danger">Jah</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "LogOutModal",
  components: {Modal}
}
</script>

