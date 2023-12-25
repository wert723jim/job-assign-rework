<template>
  <div>
    <form>
      <div class="flex flex-col">
        <label for="groupName">
          群組名稱:
        </label>
        <input  type="text" id="groupName">
      </div>
      <div class="flex flex-col">
        <label for="pointBaseLine">
          門檻點數設定:
        </label>
        <input type="number" id="pointBaseLine">
      </div>
      <div class="flex items-center gap-2">
        <label for="groupDefault">
          預設群組
        </label>
        <input type="checkbox">
      </div>
    </form>
  </div>
</template>