<script setup>
import fetchWithToken from '@utils/fetchFn'
import alertResult from '@utils/alertResult'
import { reactive } from 'vue'
const route = useRoute()

// bank
const bank = reactive({
  bank_name: '',
  branch_name: '',
  account: '',
  account_name: '',
})
const handleAddBank = async () => {
  const { data } = await fetchWithToken('/api/banks', 'POST', {
    data: {
      ...bank,
      user: String(route.params.memberId)
    }
  })
  alertResult(data.id, '新增銀行')
  fetchUserBankList()
}

const bankList = ref([])
const fetchUserBankList = async () => {
  const { data } = await fetchWithToken(`/api/banks?filters[user]=${route.params.memberId}`)
  bankList.value = data
}
fetchUserBankList()

const handleDeleteBank = async (bankId) => {
  if (!confirm('確定要刪除此銀行？')) return
  const { data } = await fetchWithToken(`/api/banks/${bankId}`, 'DELETE')
  alertResult(data.id, '刪除銀行')
  fetchUserBankList()
}

// crypto 
const cryptoAddress = ref('')
const handleAddCrypto = async () => {
  const { data } = await fetchWithToken('/api/cryptos', 'POST', {
    data: {
      address: cryptoAddress.value,
      user: String(route.params.memberId)
    }
  })
  console.log(data)
  alertResult(data.id, '新增虛擬錢包地址')
  fetchUserCryptoList()
}

const cryptoList = ref([])
const fetchUserCryptoList = async () => {
  const { data } = await fetchWithToken(`/api/cryptos?filters[user]=${route.params.memberId}`)
  console.log(data)
  cryptoList.value = data
}
fetchUserCryptoList()

const handleDeleteCrypto = async (cryptoId) => {
  if (!confirm('確定要刪除此虛擬錢包地址？')) return
  const { data } = await fetchWithToken(`/api/cryptos/${cryptoId}`, 'DELETE')
  alertResult(data.id, '刪除虛擬錢包地址')
  fetchUserBankList()
}

</script>

<template>
  <div class="border-[1px] border-gray-300 col-start-1 col-span-5 row-start-1 row-span-2">
    <div class="bg-[#949DB0] pl-2">新增銀行資料</div>
    <div class="px-6 py-1">
      <form @submit.prevent="handleAddBank">
        <table>
          <tr>
            <td>
              <label for="bankName">
                銀行名稱
              </label>
            </td>
            <td>
              <input
                type="text"
                v-model="bank.bank_name"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="bankBranch">
                銀行分行
              </label>
            </td>
            <td>
              <input
                id="bankBranch"
                type="text"
                v-model="bank.branch_name"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="bankAccountName">
                銀行戶名
              </label>
            </td>
            <td>
              <input
                id="bankAccountName"
                type="text"
                v-model="bank.account_name"
              >
            </td>
          </tr>
          <tr>
            <td>
              <label for="bankAccount">
                銀行帳號
              </label>
            </td>
            <td>
              <input
                id="bankAccount"
                type="text"
                v-model="bank.account"
              >
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button class="bg-[#2055A5] text-white px-5 py-1">
                提交
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>

  <div class="border-[1px] border-gray-300 col-start-1 col-span-5 row-start-3 row-span-1">
    <div class="bg-[#949DB0]">新增虛擬錢包位址(TRC通道) USDT</div>
    <div class="px-6 py-1">
      <div>
        <form @submit.prevent="handleAddCrypto">
          <table class="w-full">
            <tr>
              <td>
                <label for="cryptoAddress">
                  位址
                </label>
              </td>
              <td>
                <input
                  id="cryptoAddress"
                  type="text"
                  v-model="cryptoAddress"
                >
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button class="bg-[#2055A5] text-white px-5 py-1">提交</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  </div>

  <div class="border-[1px] border-gray-300 col-start-6 col-span-7 row-start-1 row-span-2">
    <div class="bg-[#87AE91]">銀行列表</div>
    <div class="px-2 py-1">
      <div>
        <table
          class="w-full"
          v-for="bank in bankList"
          :key="bank.id"
        >
          <tr class="flex gap-2 justify-between items-center">
            <td>
              {{ bank.attributes.bank_name }}
            </td>
            <td>
              {{ bank.attributes.account }}
            </td>
            <td>
              {{ bank.attributes.account_name }}
            </td>
            <td class="">
              <button
                class="bg-[#F5B248] text-white px-5 py-1"
                @click="() => handleDeleteBank(bank.id)"
              >刪除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div class="border-[1px] border-gray-300 col-start-6 col-span-7 row-start-3 row-span-1">
    <div class="bg-[#87AE91]">錢包列表</div>
    <div class="px-2 py-1">
      <div>
        <table class="w-full">
          <tr
            class="flex gap-2 justify-between items-center"
            v-for="crypto in cryptoList"
            :key="crypto.id"
          >
            <td>
              {{ crypto.attributes.address }}
            </td>
            <td class="">
              <button
                class="bg-[#F5B248] text-white px-5 py-1"
                @click="() => handleDeleteCrypto(crypto.id)"
              >刪除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply bg-[#949DB0];
}

form tr td {
  @apply py-1;
}

form tr td:first-child {
  @apply text-right;
  @apply pr-2;
}

form tr td input[type='text'],
form tr td input[type='dateTime-local'] {
  @apply border-[1px];
  @apply border-gray-300;
  @apply h-8;
  @apply w-full
}

form tr td textarea {
  @apply border-[1px];
  @apply border-gray-300;
}

.filter-table td,
.filter-table th {
  @apply border-[1px];
  @apply border-gray-400;
  @apply text-center;
  @apply p-2;
}

input {
  padding: 0 8px;
}
</style>