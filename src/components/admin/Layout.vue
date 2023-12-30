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
import { watchEffect } from 'vue'
// import removeAdminCss from '@utils/removeAdminCss'

watchEffect(() => {
  // removeAdminCss()
  console.log('admin watch effect')
  const bootstrapCssFile = document.createElement('link')
  bootstrapCssFile.rel = 'stylesheet'
  bootstrapCssFile.href = '/src/public/bootstrap/css/bootstrap.min.css'
  bootstrapCssFile.className = 'admin-css'
  document.body.appendChild(bootstrapCssFile)

  const indexCssFile = document.createElement('link')
  indexCssFile.rel = 'stylesheet'
  indexCssFile.href = '/src/public/admin/css/index.css'
  indexCssFile.className = 'admin-css'
  document.body.appendChild(indexCssFile)

  const mainCssFile = document.createElement('link')
  mainCssFile.rel = 'stylesheet'
  mainCssFile.href = '/src/public/admin/css/main.css'
  mainCssFile.className = 'admin-css'
  document.body.appendChild(mainCssFile)
})
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