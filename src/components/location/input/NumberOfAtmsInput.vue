<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Automaatide arv</span>
    <input v-model="numberOfAtms" type="number" class="form-control" min="1">
  </div>
</template>
<script>
export default {
  name: 'NumberOfAtmsInput',
  data(){
    return {
      numberOfAtms: null
    }
  }
}
</script>