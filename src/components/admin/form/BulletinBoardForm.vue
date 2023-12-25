<template>
  <div>
    <form class="flex flex-col gap-2">
      <div v-if="id !== 0">
        <label for="announcementId">
          公告編號
        </label>
        <span>{{ id }}</span>
      </div>
      <div>
        <label for="announcementTitle">
          公告標題
        </label>
        <input v-model="formDetail.title" type="text" id="announcementTitle">
      </div>
      <div class="flex flex-col">
        <label for="announcementContent">
          公告內容
        </label>
        <textarea
          v-model="formDetail.content"
          type="text"
          id="announcementContent"
          class='resize-none p-1'
          rows="5"
        ></textarea>
      </div>
      <div>
        <label for="announcementIsActive">
          公告狀態
        </label>
        <select name="" id="announcementIsActive" v-model="formDetail.isActive">
          <option value="true">啟用</option>
          <option value="false">停用</option>
        </select>
      </div>
      <div>
        <label for="announcementIsActive">
          跑馬燈顯示
        </label>
        <select name="" id="announcementIsMarquee" v-model="formDetail.isMarquee">
          <option value="true">啟用</option>
          <option value="false">停用</option>
        </select>
      </div>
      <div class="text-right">
        <button
          @click.stop.prevent="confirm"
        >
          <slot name="formButton"></slot>
        </button>
      </div>
      
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['confirm'])
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isMarquee: {
    type:Boolean,
    default: false,
  },
})

onMounted(() => {
  Object.assign(formDetail, props)
})

const formDetail = reactive({
  title: '',
  content: '',
  isActive: false,
  isMarquee: false,
})

const confirm = () => {
  emit('confirm', {...formDetail})
}
</script>

<style scoped>
form td {
  @apply py-1;
}

form input, form textarea{
  @apply border-[1px];
  @apply border-gray-300;
}

form input { 
  @apply h-8;
}

form table label {
  @apply pr-1;
  @apply inline-block;
  @apply text-right;
  @apply w-full;
}
</style>