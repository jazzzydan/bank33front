<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-2">
        <CitiesDropdown @event-selected-city-change="executeProofOfConceptAlert"/>
      </div>

    </div>
  </div>
</template>

<script>
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";

export default {
  name: 'AtmsView',
  components: {CitiesDropdown},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName')
    }
  },
  methods: {
    executeProofOfConceptAlert(selectedCityId) {
      alert('userId: ' + this.userId + ', roleName: ' + this.roleName + ', cityId: ' + selectedCityId)
    },
  },
  mounted() {
    // this.proofOfConcept()
  }
}
</script>
