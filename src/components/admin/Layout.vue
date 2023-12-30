<template>
  <div id="app2">
    <Sider></Sider>
    <main class="main">
      <Header></Header>
      <div class="content-wrapper">

        <body>
          <main>
            <slot name="content"></slot>
          </main>
        </body>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sider from './Sider.vue'
import Header from './Header.vue'
</script>

<style>
.content-wrapper {
  position: absolute;
  z-index: 100;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  border: 0;
  padding-top: 60px;
}

.main {
  position: relative;
  flex: 1;
  padding: 0;
}
</style>