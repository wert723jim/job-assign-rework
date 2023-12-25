<template>
  <div
    class="w-max-[300px] h-max-[300px] rounded-lg overflow-hidden flex justify-center items-end cursor-pointer"
    @click="handleClick"
  >
    <img
      :src="imageUrl"
      alt="product img"
    >
    <div class="absolute flex flex-col gap-3 mb-10">
      <span class="text-white font-extralight text-center">{{ props.product.attributes.name }}</span>
      <CustomButton
        text="開始訂單"
        secondary
      />
    </div>
  </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import { inject } from 'vue'
const connectCustomService = inject('connectCustomService')

const props = defineProps(['product'])

const imageUrl = props.product.attributes.image.data.attributes.url

const handleClick = () => {
  if (props.product.attributes.url) {
    window.open(props.product.attributes.url)
    return
  } else {
    connectCustomService()
  }
}
</script>