<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtmsView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName')
    }
  },
  methods: {
    proofOfConcept() {
      alert('userId: ' + this.userId + ', roleName: ' + this.roleName)
    },
  },
  mounted() {
    this.proofOfConcept()
  }
}
</script>
