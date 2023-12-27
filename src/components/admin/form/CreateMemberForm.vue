<template>
  <div>
    <form @submit.stop.prevent="confirmForm">
      <div class="form-group">
        <label for="username">員工帳號: </label>
        <input v-model="formDetail.username" type="text" class="form-control" id="username">
      </div>
      <div class="form-group">
        <label for="password">登入密碼: </label>
        <input v-model="formDetail.password" type="text" class="form-control" id="password">
      </div>
      <div class="form-group">
        <label for="nickname">員工姓名: </label>
        <input v-model="formDetail.nickname" type="text" class="form-control" id="nickname">
      </div>
      <div class="form-group">
        <label for="phone">電話: </label>
        <input v-model="formDetail.phone" type="text" class="form-control" id="phone">
      </div>
      <div class="form-group">
        <label for="group">員工群組: </label>
        <select v-model="formDetail.group" name="group" id="group">
          <option value="0" disabled>無</option>
          <option v-for="group in groupOptions" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="lineId">LineID: </label>
        <input v-model="formDetail.lineId" type="text" class="form-control" id="lineId">
      </div>
      <div class="form-group">
        <label for="note">備註: </label>
        <input v-model="formDetail.note" type="text" class="form-control" id="note">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
defineProps({
  groupOptions: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['confirmForm'])


const formDetail = reactive({
  username: '',
  password: '',
  nickname: '',
  phone: '',
  group: 0,
  lineId: '',
  note: '',
})

const confirmForm = () => {
  const { username, password, phone, group } = formDetail
  if (!username || !password || !phone || !group) {
    console.log('欄位不得為空')
    return
  }
  emit('confirmForm', {...formDetail})
}
</script>