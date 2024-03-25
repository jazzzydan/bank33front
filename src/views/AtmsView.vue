<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Pangaautomaadid</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown @event-selected-city-change="executeProofOfConceptAlert"/>
      </div>


      <div class="col col-6">
        <table class="table table-dark table-hover">
          <thead>
          <tr>
            <th scope="col">Linn</th>
            <th scope="col">Asukoht</th>
            <th scope="col">Teenused</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Tallinn</td>
            <td>Mustamäe Prisma</td>
            <td>
              <p>Sularaha sisse</p>
              <p>Sularaha välja</p>
              <p>Välja</p>
            </td>
          </tr>
          </tbody>
        </table>
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
