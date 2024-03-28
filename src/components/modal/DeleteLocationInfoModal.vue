<template>
<div>
  <ViewLocationInfoModal ref="viewLocationInfoModalRef">

    <template #buttons>
      <button type="button" class="btn btn-danger">Kustuta</button>
    </template>

  </ViewLocationInfoModal>
</div>
</template>


<script>
import ViewLocationInfoModal from "@/components/modal/ViewLocationInfoModal.vue";

export default {
  name: 'DeleteLocationInfoModal',
  components: {ViewLocationInfoModal}
}
</script>

