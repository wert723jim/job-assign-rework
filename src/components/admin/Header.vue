<template>
  <header>
    <div class="dropdown float-right flex">


      <button
        class="btn  btn-sm  d-flex items-center"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <svg
          width="20"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-emoji-smile-fill rounded-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c.552 0 1-.672 1-1.5S10.552 5 10 5s-1 .672-1 1.5S9.448 8 10 8z"
          />
        </svg>
        <!--可以使用图片,大小20,class='rounded-circle'-->
        {{ nickname }}
      </button>
      <a
        class="dropdown-item cursor-pointer"
        @click.stop.prevent="logout"
      >登出</a>


      <!-- <div
        class="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenu2"
      >
      </div> -->
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import fetchWithToken from '@utils/fetchFn'

const nickname = ref('')

const router = useRouter()
const token = localStorage.getItem('token')
if (!token) {
  router.replace('/login')
}

const logout = () => {
  localStorage.setItem('token', '')
  location.href = '/'
}

onMounted(async () => {
  const data = await fetchWithToken('/api/users/me')
  nickname.value = data.nickname
  if (data.isAdmin !== true) {
    router.replace('/')
    alert('無管理者權限')
  }
})
</script>