<template>
  <div>
    <LocationNameInput/>
    <NumberOfAtmsInput/>
    <TransactionTypeCheckbox/>
    <ImageInput/>
  </div>
</template>
<script>
import ImageInput from "@/components/image/ImageInput.vue"
import LocationNameInput from "@/components/location/input/LocationNameInput.vue";
import NumberOfAtmsInput from "@/components/location/input/NumberOfAtmsInput.vue";
import TransactionTypeCheckbox from "@/components/location/input/TransactionTypeCheckbox.vue";

export default {
  name: 'LocationDetailsInput',
  components: {TransactionTypeCheckbox, NumberOfAtmsInput, LocationNameInput, ImageInput}
}
</script>