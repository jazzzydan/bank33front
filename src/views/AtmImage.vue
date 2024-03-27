<template>
  <div>
    <img v-if="imageData === ''" src="../assets/atm.png" class="img-thumbnail" alt="pangaautomaadi vaikimisi pilt">
    <img v-else :src="imageData" class="img-thumbnail" alt="pangaautomaadi kasutaia valitud pilt">
  </div>
</template>
<script>
export default {
  name: 'AtmImage',
  props: {
    imageData: String
  }
}
</script>