<template>
  <nav>
    <div class="logo">
      <h4>BsAdmin</h4>
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
    list: [{
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
])
</script>

<style scoped>

</style>