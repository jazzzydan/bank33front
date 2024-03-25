<template>
  <select v-model="selectedCityId" @change="emitSelectedCityId" class="form-select">
    <option selected value="0">Kõik linnad</option>
    <option v-for="city in cities" :value="city.cityId" :key="city.cityId">{{city.cityName}}</option>
  </select>
</template>
<script>
import router from "@/router";

export default {
  name: 'CitiesDropdown',
  data() {
    return {
      selectedCityId: 0,
      cities: [
        {
          cityId: 0,
          cityName: ''
        }
      ]
    }
  },
  methods: {
    sendGetCitiesRequest() {
      this.$http.get('/cities')
          .then(response => {
            this.cities = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    emitSelectedCityId() {
      this.$emit('event-selected-city-change', this.selectedCityId)
    },

  },
  beforeMount() {
    this.sendGetCitiesRequest()
  }
}
</script>