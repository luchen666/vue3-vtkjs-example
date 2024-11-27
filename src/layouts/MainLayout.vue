<template>
  <el-container>
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>
    <el-main>
      <Home />
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import Home from '@/views/home.vue';
import Menu from '@/components/menu/index.vue';

onMounted(() => {
  console.log('MainLayout mounted')
})
</script>
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  overflow-x: hidden;
}

.el-main {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
