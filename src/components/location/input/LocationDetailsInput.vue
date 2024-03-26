<template>
  <div>
    <LocationNameInput ref="locationNameInputRef"/>
    <NumberOfAtmsInput/>
    <TransactionTypeCheckbox/>
    <ImageInput @event-new-image-file-selected="emitNewImageData" />
  </div>
</template>
<script>
import ImageInput from "@/components/image/ImageInput.vue"
import LocationNameInput from "@/components/location/input/LocationNameInput.vue";
import NumberOfAtmsInput from "@/components/location/input/NumberOfAtmsInput.vue";
import TransactionTypeCheckbox from "@/components/location/input/TransactionTypeCheckbox.vue";

export default {
  name: 'LocationDetailsInput',
  components: {TransactionTypeCheckbox, NumberOfAtmsInput, LocationNameInput, ImageInput},
  methods: {
    emitNewImageData(imageData) {
      this.$emit('event-new-image-file-selected', imageData)
    },
  }
}
</script>