<template>
  <Layout>
    <template v-slot:content>
      <div class="main">
        <div class="p-3 text-dark">
          員工帳號: {{ userInfo.username }}
        </div>
        <div class="pt-3">
          <ul class="nav nav-tabs">
            <li class="nav-item" @click.prevent.stop="chooseTab('accountInfo')">
              <a class="nav-link" :class="{active: chosenTab === 'accountInfo'}" href="#">帳號資料</a>
            </li>
            <li class="nav-item" @click.prevent.stop="chooseTab('bankAccount')">
              <a class="nav-link" :class="{active: chosenTab === 'bankAccount'}" href="#">銀行帳號</a>
            </li>
            <li class="nav-item"  @click.prevent.stop="chooseTab('pointRecord')">
              <a class="nav-link" :class="{active: chosenTab === 'pointRecord'}" href="#">點數紀錄</a>
            </li>
            <li class="nav-item" @click.prevent.stop="chooseTab('logInRecord')">
              <a class="nav-link" :class="{active: chosenTab === 'logInRecord'}" href="#">登入紀錄</a>
            </li>
          </ul>
          <UserInfo
            :user-info="userInfo"
            :point-log="pointLog"
            :group-options="groupOptions"
            @editMember="editMember"
            @resetPassword="resetPassword"
            v-show="chosenTab === 'accountInfo'">            
          </UserInfo>
      </div>
      </div>
    </template>
    
  </Layout>
</template>

<script setup>
import Layout from '../../components/admin/Layout.vue'
import UserInfo from '../../components/admin/UserInfo.vue'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import fetchWithToken from '@utils/fetchFn'
// import { onMounted } from 'vue'
const route = useRoute()

// handle tab
const chosenTab = ref('accountInfo')
const groupOptions = ref([])
const pointLog = reactive({
  add: 0,
  minus: 0,
})
const userInfo = reactive({
  username: '',
  nickname: '',
  phone: '',
  isActive: 'false',
  group: undefined,
  line_id: '',
  note: '',
  createdAt: '',
  main_point: 0
})

const chooseTab = (tabName) => {
  chosenTab.value = tabName
}

const fetchMemberById = async () => {
  let data = await fetchWithToken(`/api/users/${route.params.memberId}?populate[group][fields]=name`)
  data = {
    ...data,
    group: data.group?.id || null,
  }
  Object.assign(userInfo, data)
}

const fetchUserPointLog = async () => {
  const data = await fetchWithToken(`/api/point-log/${route.params.memberId}`)
  Object.assign(pointLog, data)
}

const editMember = async (userInfoDetail) => {
  const { nickname, phone, group, isActive, line_id, note } = userInfoDetail
  const putBody = {
    nickname,
    phone,
    group,
    isActive,
    line_id,
    note,
  }
  const data = await fetchWithToken(`/api/users/${route.params.memberId}`, 'PUT', putBody)
  console.log(data)
}

const resetPassword = async (newPassword) => {
  if (!newPassword) {
    console.log('密碼欄位不得為空')
    return
  }
  const putBody = {
    password: newPassword
  } 
  const data = await fetchWithToken(`/api/users/${route.params.memberId}`, 'PUT', putBody)
  console.log(data)
}

onMounted(async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data.map((group) => ({
    id: group.id,
    name: group.attributes.name
  }))
  fetchMemberById()
  fetchUserPointLog()
})

</script>