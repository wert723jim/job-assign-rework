<template>
  <div>
    <form @submit.stop.prevent="confirmForm">
      <div class="form-group">
        <label for="productName">商品名稱: </label>
        <input
          type="text"
          class="form-control"
          id="productName"
          v-model="formDetail.name"
        >
      </div>
      <div class="form-group">
        <label for="productIsDisplay">發布狀態: </label>
        <select
          id="productIsDisplay"
          v-model="formDetail.isDisplay"
        >
          <option :value="true">顯示</option>
          <option :value="false">隱藏</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productIsOpen">訂單狀態: </label>
        <select
          id="productIsOpen"
          v-model="formDetail.isOpen"
        >
          <option :value="true">啟用</option>
          <option :value="false">停用</option>
        </select>
      </div>
      <div class="form-group">
        <label for="productUrl">訂單連結: </label>
        <input
          type="text"
          class="form-control"
          id="productUrl"
          v-model="formDetail.url"
        >
      </div>
      <div class="form-group">
        <label for="productImgUpload">上傳圖片: </label>
        <small>(建議大小500px*500px，不超過1.5MB)</small>
        <div class="w-50">
          <img
            :src="productImgPreview"
            alt=""
          >
        </div>
        <input
          type="file"
          id="productImgUpload"
          ref="uploadInput"
          @change="previewFile"
        >
        <button @click.prevent.stop="upload">上傳</button>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
      >確認</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { fetchUploadFileWithToken } from '@utils/fetchFn.js'
const props = defineProps({
  productInfo: {
    type: Object,
    default: () => ({
      name: '',
      isDisplay: false,
      isOpen: false,
      url: '',
      files: [],
    })
  }
})
const emit = defineEmits(['confirmForm'])

onMounted(() => {
  Object.assign(formDetail, { ...props.productInfo })
})

const formDetail = reactive({
  name: '',
  isDisplay: false,
  isOpen: false,
  url: '',
  files: [],
})
const productImgPreview = ref('')

const previewFile = (event) => {
  const files = event.target.files
  formDetail.files = files
  if (files.length === 0) {
    productImgPreview.value = ''
  } else {
    const imageURL = window.URL.createObjectURL(files[0])
    productImgPreview.value = imageURL
  }
}

const upload = async () => {
  const formData = new FormData()
  formData.append('files', formDetail.files[0])

  const fileId = await fetchUploadFileWithToken('/api/upload', formData)
  console.log(formDetail)
  console.log(fileId)
  if (!fileId) {
    console.log('image upload error')
    return
  }
  console.log('upload success')
}

const confirmForm = () => {
  const { name } = formDetail
  if (!name) {
    console.log('欄位不得為空')
    return
  }
  emit('confirmForm', { ...formDetail })
}
</script>