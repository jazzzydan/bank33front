<template>
  <div>
    <img v-if="imageDataBase64 === ''" src="../assets/atm.png" class="img-thumbnail" alt="pangaautomaadi vaikimisi pilt">
    <img v-else :src="imageDataBase64" class="img-thumbnail" alt="pangaautomaadi kasutaia valitud pilt">
  </div>


</template>
<script>
export default {
  name: 'AtmImage',
  props: {
    imageDataBase64: String
  }
}
</script>