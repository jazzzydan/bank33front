<template>
  <div>
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
</template>
<script>
import ImageInput from "@/components/image/ImageInput.vue"

export default {
  name: 'LocationDetailsInput',
  components: {ImageInput}
}
</script>