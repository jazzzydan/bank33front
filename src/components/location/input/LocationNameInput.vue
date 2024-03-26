<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Asukoht</span>
    <input v-model="locationName" type="text" class="form-control">
  </div>
</template>
<script>
export default {
  name: 'LocationNameInput',
  data(){
    return {
      locationName: ''
    }
  }
}
</script>