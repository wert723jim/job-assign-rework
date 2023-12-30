<template>
  <nav>
    <div class="logo">
      <h4>管理後台</h4>
    </div>
    <ul class="menu">
      <SiderList v-for="item in menu" :key="item.name" :menuItem="item"></SiderList>
    </ul>
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import SiderList from './SiderList.vue'
const menu = ref([
  {
    name: '首頁',
    icon: '&#xe6a2;',
    url: 'main.html',
    hidden: false,
    list: []
  },
  {
    name: '員工',
    icon: '&#xe6e0;',
    url: '#',
    hidden: false,
    list: [
      {
        name: '員工管理',
        routerName: 'AdminMemberManage',
      }, {
          name: '員工群組',
          routerName: 'AdminMemberGroup',
      }, {
          name: '點數管理',
          routerName: 'AdminPointManage',
      },
    ]
  },
  {
    name: '報表',
    url: '#',
    list: [{
      name: '點數紀錄',
      routerName: 'AdminPointRecord',
    }],
  },
  {
    name: '工具',
    url: '#',
    list: [
      {
        name: '商品上架',
        routerName: 'AdminProductLaunch',
      },
      {
        name: '公告欄',
        routerName: 'AdminAnnouncement',
      }
    ],
  }
])
</script>

<style scoped>

</style>