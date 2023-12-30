<template>
  <div>
    <form @submit.prevent.stop="confirmForm">
      <div class="form-group">
        <label for="announcementTitle">公告標題: </label>
        <input type="text" class="form-control" id="announcementTitle" v-model="formDetail.title">
      </div>
      <div class="form-group">
        <label for="announcementContent">公告內容: </label>
        <textarea name="" id="announcementContent" class="form-control" rows="10" v-model="formDetail.content"></textarea>
      </div>
      <div class="form-group">
        <label for="announcementIsActive">公告狀態: </label>
        <select id="announcementIsActive" v-model="formDetail.isActive">
          <option :value="true">啟用</option>
          <option :value="false">停用</option>
        </select>
      </div>
      <div class="form-group">
        <label for="announcementIsMarquee">跑馬燈顯示: </label>
        <select id="announcementIsMarquee" v-model="formDetail.isMarquee">
          <option :value="true">啟用</option>
          <option :value="false">停用</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">確認</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
const props = defineProps({
  announcementInfo: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      isActive: false,
      isMarquee: false,
    })
  }
})
const emit = defineEmits(['confirmForm'])

onMounted(() => {
  Object.assign(formDetail, {...props.announcementInfo})
})

const formDetail = reactive({
  title: '',
  content: '',
  isActive: false,
  isMarquee: false,
})

const confirmForm = () => {
  const { title, content } = formDetail
  if (!title || !content ) {
    console.log('欄位不得為空')
    return
  }
  emit('confirmForm', {...formDetail})
}
</script>