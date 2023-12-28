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
          <Bank
            :bank-list="bankList"
            :crypto-address-list="cryptoAddressList"
            @addBank="addBank"
            @removeBank="removeBank"
            @addCryptoAddress="addCryptoAddress"
            @removeCryptoAddress="removeCryptoAddress"
            v-show="chosenTab === 'bankAccount'">
          </Bank>
          <PointRecord
            @filterPointLogInPeriod="filterPointLogInPeriod">
          </PointRecord>
      </div>
      </div>
    </template>
    
  </Layout>
</template>

<script setup>
import Layout from '../../components/admin/Layout.vue'
import UserInfo from '../../components/admin/UserInfo.vue'
import Bank from '../../components/admin/Bank.vue'
import PointRecord from '../../components/admin/PointRecord.vue'
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
const bankList = ref([])
const cryptoAddressList = ref([])

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

const fetchUserBankList = async () => {
  const { data } = await fetchWithToken(`/api/banks?filters[user]=${route.params.memberId}`)
  bankList.value = data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }))
}

const fetchUserCryptoAddressList = async () => {
  const { data } = await fetchWithToken(`/api/cryptos?filters[user]=${route.params.memberId}`)
  cryptoAddressList.value = data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }))
}

const fetchUserPointLog = async () => {
  const data = await fetchWithToken(`/api/point-log/${route.params.memberId}`)
  Object.assign(pointLog, data)
}

const filterPointLogInPeriod = async () => {
  const data = await fetchWithToken('/api/point-logs?filters[user]=14&filters[$and][0][createdAt][$gt]=2023-12-19T08:20:40Z&filters[$and][1][createdAt][$lt]=2023-12-19T08:50:00Z&filters[edit_point][$lt|$gt]=0')
  console.log(data)
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

const addBank = async (bankDetail) => {
  const postBody = {
    data: {
      ...bankDetail,
      user: route.params.memberId,
    }
  }
  const data = await fetchWithToken('/api/banks', 'POST', postBody)
  if( !data ) {
    console.log('add bank error')
    return
  }
  bankList.value.push({
    ...bankDetail,
  })
}

const addCryptoAddress = async (cryptoAddress) => {
  if (!cryptoAddress) {
    console.log('虛擬錢包位址欄位不得為空')
    return
  }
  const postBody = {
    data: {
      address: cryptoAddress,
      user: route.params.memberId
    }
  }
  const data = await fetchWithToken('/api/cryptos', 'POST', postBody)
  if (!data) {
    console.log('add crypto address error')
    return
  }

  cryptoAddressList.value.push({
    address: cryptoAddress,
  })
}

const removeBank = async (bankId) => {
  const data = await fetchWithToken(`/api/banks/${bankId}`, 'DELETE')

  if (!data) {
    console.log('remove bank error')
    return
  }
  bankList.value = bankList.value.filter((bank) => bank.id !== bankId)
}

const removeCryptoAddress = async (addressId) => {
  const data = await fetchWithToken(`/api/cryptos/${addressId}`, 'DELETE')

  if (!data) {
    console.log('remove crypto address error')
    return
  }

  cryptoAddressList.value = cryptoAddressList.value.filter((address) => address.id !== addressId)
}

onMounted(async () => {
  const { data } = await fetchWithToken('/api/groups?fields[0]=name&fields[1]=isDefault')
  groupOptions.value = data.map((group) => ({
    id: group.id,
    name: group.attributes.name
  }))
  fetchMemberById()
  fetchUserBankList()
  fetchUserCryptoAddressList()
  fetchUserPointLog()
})

</script>