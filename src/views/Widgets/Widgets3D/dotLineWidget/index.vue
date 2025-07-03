<template>
  <div
    ref="containerRef"
    style="width: 100%; height: 100%; display: flex; flex-direction: wrap"
  >
    <View1 ref="view1Ref" :baseData="baseData[1]" />
    <View2 ref="view2Ref" :baseData="baseData[2]" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'
import View1 from './view1.vue'
import View2 from './view2.vue'

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const containerRef = ref()

const baseData = {
  1: {
    background: [0.2, 0.3, 0.4],
    viewCode: "view1"
  },
  2: {
    background: [0.4, 0.3, 0.2],
    viewCode: "view2"
  },
}

onMounted(() => {})
</script>
