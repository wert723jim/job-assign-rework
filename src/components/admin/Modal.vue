<template>
  <div>
    <button @click.prevent.stop="modalOpen">
      <slot name="buttonContent">
        template buttonContent
      </slot>
    </button>
    <Teleport to="body">
      <div
        v-if="modalShow"
        class="absolute top-0 bottom-0 left-0 right-0 bg-black/30"
      >
        <div class="w-max mx-auto mt-[200px]">
          <div class="relative bg-[#2DBBDB] text-center py-1">
            <slot name="header">
              template header
            </slot>
            <div class="absolute top-0 right-0 py-1 pr-2">
              <button @click.prevent.stop="modalClose">X</button>
            </div>
          </div>
          <div class="bg-white p-4">
            <slot name="content">
              template content
            </slot>
            <div class="flex justify-end gap-2 mt-10">
              <button
                @click.prevent.stop="modalClose"
                class="bg-[#A9A9A9] text-white px-5 py-1"
              >
                取消
              </button>
              <button
                @click.prevent.stop="modalConfirm"
                class="bg-[#2055A5] text-white px-5 py-1"
              >
                <slot name="confirmButtonContent">
                  template confirmButtonContent
                </slot>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  groupId: {
    type: Number,
    default: 0,
  }
})
const modalShow = ref(false)

const emit = defineEmits(['confirm'])

const modalOpen = () => {
  modalShow.value = true
}

const modalClose = () => {
  modalShow.value = false
}

const modalConfirm = () => {
  emit('confirm', props.groupId)
  modalShow.value = false
}
</script>
