<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <AlertDanger message="placheholder"/>
        <AlertSuccess message="placeholder"/>
        <h1>Lisa asukoht</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <CitiesDropdown/>
      </div>
      <div class="col col-3">
        <LocationDetailsInput/>
      </div>
      <!--   atm image   -->
      <div class="col col-2">
        <img src="../assets/atm.png" class="img-thumbnail">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2 text-nowrap">
        <button type="button" class="btn btn-outline-secondary m-1">Tagasi</button>
        <button type="button" class="btn btn-outline-success m-1">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import LocationDetailsInput from "@/components/location/input/LocationDetailsInput.vue";

export default {
  name: 'LocationView',
  components: {LocationDetailsInput, CitiesDropdown, AlertSuccess, AlertDanger}
}
</script>

