<template>
  <router-view />
  <Modal ref="modalRef" />
</template>

<script setup>
import { provide, ref } from 'vue'
import Modal from './components/Modal.vue'

const modalRef = ref(null)
provide('connectCustomService', () => {
  modalRef.value.open()
})

</script>


<style>
body {
  height: 100vh;
}

#app {
  height: 100%;
}
</style>
