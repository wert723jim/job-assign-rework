<template>
  <div>
    <form @submit.stop.prevent="confirmForm">
      <div v-if="formDetail.id" class="form-group">
        <label for="groupName">群組編號: </label>
        <span>{{ formDetail.id }}</span>
      </div>
      <div class="form-group">
        <label for="groupName">群組名稱: </label>
        <input v-model="formDetail.name" type="text" class="form-control" id="groupName">
      </div>
      <div class="form-group">
        <label for="groupPointBaseLine">門檻點數設定: </label>
        <input v-model="formDetail.point_baseline" type="number" class="form-control" id="groupPointBaseLine">
      </div>
      <div class="form-group">
        <label class="form-check-label mr-2" for="groupIsDefault">預設群組</label>
        <input v-model="formDetail.isDefault" type="checkbox" id="groupIsDefault">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['confirmForm'])
const props = defineProps({
  chosenGroupDetail: {
    type: Object,
    default: () => ({
      id: 0,
      name: '',
      isDefault: false,
      point_baseline: 0,
    })
  }
})

onMounted(() => {
  Object.assign(formDetail, {...props.chosenGroupDetail})
})

const formDetail = reactive({
  id: 0,
  name: '',
  isDefault: false,
  point_baseline: 0,
})

const confirmForm = () => {
  const { name, isDefault, point_baseline } = formDetail
  if (!name) {
    console.log('群組名稱不能為空')
    return
  }
  
  emit('confirmForm', {
    name,
    isDefault,
    point_baseline
  })
}
</script>