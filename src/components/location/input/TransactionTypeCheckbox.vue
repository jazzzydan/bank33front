<template>
  <div class="mb-3">
    <div v-for="transactionType in transactionTypes" :key="transactionType.transactionTypeId"
         class="form-check text-start">
      <input v-model="transactionType.isAvailable" class="form-check-input" type="checkbox" :id="'transactionTypeId' + transactionType.transactionTypeId">
      <label class="form-check-label" :for="'transactionTypeId' + transactionType.transactionTypeId">
        {{ transactionType.transactionTypeName }}
      </label>
    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'TransactionTypeCheckbox',
  data() {
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