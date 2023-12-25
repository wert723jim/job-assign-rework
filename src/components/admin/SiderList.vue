<template>
  <li :class="{unwind: dropDown}">
    <a href="" @click.stop.prevent="toggleDropDown">
      <i class="iconfont mr-1"></i>
      {{ menuItem.name }}
      <i v-if="menuItem.list.length" class="iconfont arrow float-right">&#xe66c;</i>
    </a>
    <ul v-if="menuItem.list.length" class="sub-menu">
      <li v-for="item in menuItem.list" :key="item.name">
        <router-link :to="{name: item.routerName}">{{ item.name }}</router-link>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  menuItem: Object,
})

const dropDown = ref(false)

const toggleDropDown = () => {
  dropDown.value = !dropDown.value
}
</script>