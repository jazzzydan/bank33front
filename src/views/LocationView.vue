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
        <!--   Asukoht  -->
        <div class="input-group mb-3">
          <span class="input-group-text">Asukoht</span>
          <input type="text" class="form-control">
        </div>

        <!--   Automaatide arv     -->
        <div class="input-group mb-3">
          <span class="input-group-text">Automaatide arv</span>
          <input type="number" class="form-control" min="1">
        </div>

        <!--   CHECKBOXID     -->
        <div class="mb-3">
          <div class="form-check text-start">
            <input class="form-check-input" type="checkbox" id="transactionTypeId1">
            <label class="form-check-label" for="transactionTypeId1">
              sularaha sisse
            </label>
          </div>
          <div class="form-check text-start">
            <input class="form-check-input" type="checkbox" id="transactionTypeId2">
            <label class="form-check-label" for="transactionTypeId2">
              sularaha välja
            </label>
          </div>
          <div class="form-check text-start">
            <input class="form-check-input" type="checkbox" id="transactionTypeId2">
            <label class="form-check-label" for="transactionTypeId2">
              maksed
            </label>
          </div>
        </div>

        <!--   Image input     -->
        <ImageInput/>
      </div>
      <!--   atm image   -->
      <div class="col col-2">
        <img src="../assets/atm.png" class="img-thumbnail">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <button type="button" class="btn btn-outline-secondary me-3">Tagasi</button>
        <button type="button" class="btn btn-outline-success">Lisa</button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import ImageInput from "@/components/image/ImageInput.vue";

export default {
  name: 'LocationView',
  components: {ImageInput, CitiesDropdown, AlertSuccess, AlertDanger}
}
</script>

