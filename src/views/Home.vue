<template>
  <UserLayout>
    <div class="my-4 md:hidden">
      <UserSearchInput />
    </div>
    <UserMarquee />
    <div class="grid md:grid-cols-4 grid-cols-2 gap-8 md:mt-[64px]">
      <UserProduct
        v-for="product in productList"
        :key="product.id"
        :product="product"
      />
    </div>
    <div
      v-if="!productList?.length"
      class="text-gray-400 text-center"
    >沒有商品</div>
  </UserLayout>
</template>

<script setup>
import { fetchWithoutToken } from '@utils/fetchFn.js'

const route = useRoute()
const optionUrl = computed(() => route.query.search && `&filters[$and][1][name][$contains]=${route.query.search}`)

watch(() => route.query, () => getProducts(optionUrl.value))
const productList = ref(null)
const getProducts = async (optionUrl) => {
  const url = '/api/products?fields[0]=name&fields[1]=url&populate[image][fields]=url&filters[$and][0][isDisplay]=true' + optionUrl || ''
  const { data } = await fetchWithoutToken(url)
  productList.value = data
}
getProducts()

</script>