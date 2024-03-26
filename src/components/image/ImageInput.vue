<template>
  <div class="mb-3">
    <input type="file" class="form-control" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  data() {
    return {
      imageData: String
    }
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.emitImageData(selectedImage);
    },

    emitImageData(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
        this.$emit('event-new-image-file-selected', this.imageData)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    }
  }
}
</script>