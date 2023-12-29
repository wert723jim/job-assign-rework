<template>
  <div>
    <form @submit.stop.prevent="confirmForm">
      <div class="form-group">
        <label for="productName">商品名稱: </label>
        <input type="text" class="form-control" id="productName" v-model="formDetail.name">
      </div>
      <div class="form-group">
        <label for="productIsDisplay">發布狀態: </label>
        <select id="productIsDisplay" v-model="formDetail.isDisplay">
          <option :value="true">顯示</option>
          <option :value="false">下架</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productIsOpen">訂單狀態: </label>
        <select id="productIsOpen" v-model="formDetail.isOpen">
          <option :value="true">啟用</option>
          <option :value="false">停用</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productUrl">訂單連結: </label>
        <input type="text" class="form-control" id="productUrl" v-model="formDetail.url">
      </div>
      <div class="form-group">
        <label for="group">上傳圖片: </label>
        <small>(建議大小500px*500px，不超過1.5MB)</small>
        <div class="w-50">
          <img src="" alt="">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">確認</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
const props = defineProps({
  productInfo: {
    type: Object,
    default: () => ({
      name: '',
      isDisplay: false,
      isOpen: false,
      url: '',
      image: '',
    })
  }
})
const emit = defineEmits(['confirmForm'])

onMounted(() => {
  Object.assign(formDetail, {...props.productInfo})
})

const formDetail = reactive({
  name: '',
  isDisplay: false,
  isOpen: false,
  url: '',
  image: '',
})

const confirmForm = () => {
  const { name } = formDetail
  if (!name ) {
    console.log('欄位不得為空')
    return
  }
  emit('confirmForm', {...formDetail})
}
</script>