<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
    text-color="#fff" @open="handleOpen" @close="handleClose" :default-openeds="openedList">
    <el-sub-menu v-for="(item, key, index) in menuList" :key="index" :index="`${index}`">
      <template #title>
        <span>{{ key }}</span>
      </template>
      <el-sub-menu v-for="(item2, key2, idx2) in item" :key="idx2" :index="`${index}-${idx2}`">
        <template #title>{{ key2 }}</template>
        <template v-for="(item3, idx3) in item2" :key="idx3">
          <el-menu-item v-if="item3 && item3.menu" :index="`${index}-${idx2}-${idx3}`">
            <router-link :to="item3.path"> {{ item3.menu }} </router-link>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { menuList } from '@/router/constant';
import { ref } from 'vue';

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

// 默认打开的 menu
const openedList = ref<string[]>([]);
Object.values(menuList).forEach((item: any, idx: number) => {
  openedList.value.push(idx.toString());
  Object.keys(item).forEach((key: string, index: number) => {
    openedList.value.push(`${idx}-${index}`);
  })
})

</script>

<style scoped>
.el-menu {
  height: 100%;
}

.el-sub-menu .el-menu-item,
.el-sub-menu .el-menu-item a {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}

:deep(.el-sub-menu .el-sub-menu__title) {
  height: 30px;
}

:deep(.el-menu .el-sub-menu__title) {
  padding-left: 25px !important;
}

.el-menu .el-sub-menu .el-menu-item {
  padding-left: 30px !important;
}
</style>
