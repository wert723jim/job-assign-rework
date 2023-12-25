<script setup>
import { onMounted } from 'vue'
import fetchWithToken from '@utils/fetchFn'

const nickname = ref('')

const router = useRouter()
const token = localStorage.getItem('token')
if (!token) {
  router.replace('/login')
}

onMounted(async () => {
  const data = await fetchWithToken('/api/users/me')
  nickname.value = data.nickname
  if (data.isAdmin !== true) {
    router.replace('/')
    alert('無管理者權限')
  }
})

const showSidebar = ref(true)
const toggleSideBar = () => {
  // showSidebar.value = !showSidebar.value
}
</script>

<template>
  <div>
    <header class="fixed w-full">
      <div class="flex justify-between bg-[#2DBBDB]">
        <div class="flex">
          <div class="text-xl font-bold px-10 py-2">
            管理後台
          </div>
          <div
            class="p-2 border-x-[1px] border-black cursor-pointer"
            @click="toggleSideBar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 6.4V4H20V6.4H4ZM4 20V17.6H20V20H4ZM4 13.2V10.8H20V13.2H4Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div class="flex px-6 py-2 border-l-[1px] border-black">
          <div class="mt-0.5 mr-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM10 3C11.655 3 13 4.345 13 6C13 7.66 11.655 9 10 9C8.345 9 7 7.66 7 6C7 4.345 8.345 3 10 3ZM10 17.2C7.495 17.2 5.295 15.92 4 13.98C4.025 11.995 8.005 10.9 10 10.9C11.995 10.9 15.97 11.995 16 13.98C14.705 15.92 12.505 17.2 10 17.2Z"
                fill="black"
              />
            </svg>
          </div>
          <div>
            {{ nickname }}
          </div>
        </div>
      </div>
    </header>
    <aside
      v-if="showSidebar"
      class="fixed bottom-0 top-11 h-full w-40 bg-[#C1C1C3] border-r-[1px] border-gray-500"
    >
      <div>
        <div>
          <div class="text-xl tracking-[1em] pl-8 py-2 border-b-[1px] border-gray-500">
            員工
          </div>
          <ul>
            <li>
              <router-link
                to="/admin/memberGroup"
                class="inline-block w-full h-full pl-8 py-1"
              >
                >>員工群組
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/memberManage"
                class="inline-block w-full h-full pl-8 py-1"
                :class="{ 'router-link-active': this.$route.name === 'AdminMember' }"
              >
                >>員工管理
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/pointManage"
                class="inline-block w-full h-full pl-8 py-1"
              >
                >>點數管理
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <div class="text-xl tracking-[1em] pl-8 py-2 border-t-[1px] border-b-[1px] border-gray-500">
            報表
          </div>
          <ul>
            <li>
              <router-link
                to="/admin/pointRecord"
                class="inline-block w-full h-full pl-8 py-1"
              >
                >>點數紀錄
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <div class="text-xl tracking-[1em] pl-8 py-2 border-t-[1px] border-b-[1px] border-gray-500">
            工具
          </div>
          <ul>
            <li>
              <router-link
                to="/admin/productLaunch"
                class="inline-block w-full h-full pl-8 py-1"
              >
                >>商品上架
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/bulletinBoard"
                class="inline-block w-full h-full pl-8 py-1"
              >
                >>公告欄
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </aside>
  </div>
</template>

<style scoped>
.router-link-exact-active,
.router-link-active {
  background-color: #6F95B2;
}
</style>