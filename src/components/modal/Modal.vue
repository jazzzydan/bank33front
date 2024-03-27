<template>
  <!-- Modal -->
  <div v-if="isOpen" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
           <slot name="header">
             Pealkiri
           </slot>
          </h1>
          <button @click="closeModal" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            mingi sisu
          </slot>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-secondary">Sulge</button>
          <slot>
            <button type="button" class="btn btn-primary">Mingi nupp</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Modal',
  data(){
    return {
      isOpen: false
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },

    closeModal() {
      this.isOpen = false
    }

  }
}
</script>

