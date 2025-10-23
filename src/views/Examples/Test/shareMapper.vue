<template>
  <div style="display: flex">
    <div v-for="(item, index) in 8" :key="index" style="width: 50%; height: 50%">
      <View :idx="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import View from '@/views/Examples/Test/VolumeCT.vue'

onMounted(() => {})
</script>
<style scoped></style>
