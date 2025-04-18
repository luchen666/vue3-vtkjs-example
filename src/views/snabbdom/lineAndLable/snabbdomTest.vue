<template>
  <div class="mainBox">
    <div id="appId"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createText } from '.'

onMounted(() => {
  createText()
})
</script>
<style>
  .mainBox {
    position: relative;
    width: 1000px;
    height: 600px;
  }
  .appId {
    width: 100%;
    height: 100%;
  }
  svg {
    display: block;
  }
</style>
