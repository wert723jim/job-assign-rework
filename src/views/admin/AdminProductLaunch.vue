<template>
  <Modal ref="creatProductModal">
    <template v-slot:modalTitle>
      新增商品
    </template>
    <template v-slot:modalBody>
      <CreateProductForm
        @confirmForm="createProduct">
      </CreateProductForm>
    </template>
  </Modal>
  <Modal ref="editProductModal">
    <template v-slot:modalTitle>
      修改商品
    </template>
    <template v-slot:modalBody>
      <CreateProductForm
        :product-info="chosenProduct"
        @confirmForm="editProduct">
      </CreateProductForm>
    </template>
  </Modal>
  <Layout>
    <template v-slot:content>
      <div class="main">
        <div class="search">
          <button type="button" class="btn btn-primary float-left mr-1" @click.prevent="creatProductModal.modalOpen()">
            <i class="iconfont">&#xe665;</i>新增
          </button>
        </div>
        <div class="table-box">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">編號</th>
                <th scope="col">商品名稱</th>
                <th scope="col">創建日期</th>
                <th scope="col">發布狀態</th>
                <th scope="col">訂單狀態</th>
                <th scope="col">功能</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <th scope="row">
                  {{ product.id }}
                </th>
                <td>
                  {{ product.name }}
                </td>
                <td>
                  {{ product.createdAt }}
                </td>
                <td>
                  <span class="badge-success badge-pill rounded-lg" v-if="product.isDisplay">顯示</span>
                  <span class="badge-danger badge-pill rounded-lg" v-else>隱藏</span>
                </td>
                <td>
                  <span class="badge-success badge-pill rounded-lg" v-if="product.isOpen">啟用</span>
                  <span class="badge-danger badge-pill rounded-lg" v-else>停用</span>
                </td>
                <td>
                  <button  class="btn btn-primary mr-1" @click="chooseProduct(product)">修改</button>
                  <button class="btn btn-danger" @click="removeProduct(product.id)">刪除</button>
                </td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../../components/admin/Layout.vue'
import Modal from '../../components/admin/Modal.vue'
import CreateProductForm from '../../components/admin/form/CreateProductForm.vue'
import fetchWithToken from '@utils/fetchFn.js'

const products = ref([])
const creatProductModal = ref(null)
const editProductModal = ref(null)
const chosenProduct = reactive({
  id: 0,
  name: '',
  isDisplay: false,
  isOpen: false,
  url: '',
  image: ''
})

const fetchProducts = async () => {
  const { data } = await fetchWithToken('/api/products')
  products.value = data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }))
}

const chooseProduct = (product) => {
  const { id, name, isDisplay, isOpen, url, image } = product
  Object.assign(chosenProduct, {
    id,
    name,
    isDisplay,
    isOpen,
    url,
    image,
  })
  editProductModal.value.modalOpen()
}

const createProduct = async (formDetail) => {
  delete formDetail['files']
  const postBody = {
    data: formDetail,
  }
  const { data } = await fetchWithToken('/api/products', 'POST', postBody)
  if (!data) {
    console.log('create product error')
    return
  }

  products.value.push({
    id: data.id,
    ...data.attributes,
  })

  creatProductModal.value.modalClose()
}

const editProduct = async (formDetail) => {
  delete formDetail['files']
  const putBody = {
    data: formDetail,
  }
  const { data } = await fetchWithToken(`/api/products/${chosenProduct.id}`, 'PUT', putBody)
  if (!data) {
    console.log('edit product error')
    return
  }

  products.value = products.value.map((product) => {
    if(product.id === data.id) {
      return {
        id: data.id,
        ...data.attributes,
      }
    }
    return product
  })

  editProductModal.value.modalClose()
}

const removeProduct = async (productId) => {
  const { data } = await fetchWithToken(`/api/products/${productId}`, 'DELETE')
  if (!data) {
    console.log('delete product error')
    return
  }
  products.value = products.value.filter((product) => product.id !== productId)
}

fetchProducts()
</script>