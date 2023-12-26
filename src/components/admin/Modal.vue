<template>
  <Teleport to="body">
    <div v-if="modalShow" class="modal-backdrop fade show"></div>
    <div v-if="modalShow" class="modal fade show d-block" >
      <div class="modal-dialog">  
        <div class="modal-content rounded-lg">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="exampleModalLabel">
              <slot name="modalTitle">
                modalTitle
              </slot>
            </h5>
            <button @click.prevent="modalClose" type="button" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-dark">
            <slot name="modalBody"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const modalShow = ref(false)

// const emit = defineEmits(['confirm'])

const modalOpen = () => {
  modalShow.value = true
}

const modalClose = () => {
  modalShow.value = false
}

// const modalConfirm = () => {
//   emit('confirm', props.groupId)
//   modalShow.value = false
// }

defineExpose({modalOpen, modalClose})
</script>
