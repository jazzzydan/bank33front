<template>
  <div v-if="message.length > 0" class="alert alert-success text-center" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    message: String
  }
}
</script>


