<template>
  <div class="mb-3">
    <div class="form-check text-start">
      <input class="form-check-input" type="checkbox" id="transactionTypeId1">
      <label class="form-check-label" for="transactionTypeId1">
        sularaha sisse
      </label>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'TransactionTypeCheckbox',
  data(){
    return {
      transactionTypes: [
        {
          transactionTypeId: 0,
          transactionTypeName: '',
          isAvailable: false
        }
      ]
    }
  },
  methods: {
    sendGetTransactionTypesRequest() {
      this.$http.get('/atm/transaction-types')
          .then(response => {
            this.transactionTypes = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.sendGetTransactionTypesRequest()
  }
}
</script>