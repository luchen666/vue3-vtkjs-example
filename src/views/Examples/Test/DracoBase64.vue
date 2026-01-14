<template>
  <div class="control-panel">
    <button class="rotate-btn" @click="toggleAnimation">
      {{ isPlaying ? '暂停' : '播放' }}
    </button>
    <button class="pose-btn" @click="prevStep">上一步</button>
    <button class="next-btn" @click="nextStep">下一步</button>
  </div>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
import vtkPolyDataNormals from "@kitware/vtk.js/Filters/Core/PolyDataNormals";

import ArrangeTeeth from '@/testData/arrangeTeeth.json'
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader'
import DracoDecoderModule from '@/library/draco_decoder_nodejs1.5.7.js'
import { AxisToMatrix, quaternionToMatrix } from '@/vtk-utils/matrixMethod'
import type { ArrangeTeethType } from '@/testData/arrangeTeeth_const'
import { base64ToUint8Array } from '@/utils/vtkUtils/DracoReader'
import { addScalar, setActorProperty, setLookUpTableFn } from '@/utils/vtkUtils/view3DROI'

let renderer: any
let renderWindow: any
const view: any = {}
const containerRef = ref()

const reader = vtkDracoReader.newInstance()

const getPyd = (base64: string) => {
  const arrayBuffer = base64ToUint8Array(base64)
  reader.parseAsArrayBuffer(arrayBuffer.buffer)
  const polydata = reader.getOutputData()
  return { polydata }
}

const createActor = (base64: string, type: string, subType: string) => {
  const { polydata } = getPyd(base64)
  const mapper = vtkMapper.newInstance({ scalarVisibility: false })
  const actor = vtkActor.newInstance()
  actor.setMapper(mapper)
  // const normals = vtkPolyDataNormals.newInstance();
  // normals.setInputData(polydata);
  // mapper.setInputConnection(normals.getOutputPort());

  mapper.setInputData(polydata)
  renderer.addActor(actor)
  if (!view[type]) view[type] = { mapper: {}, actor: {} }
  view[type].mapper[subType] = mapper
  view[type].actor[subType] = actor
  return { actor, mapper, polydata }
}

const updateTeeth = (actors: any, data: any, idx: number) => {
  for (let key in actors) {
    if (key === 'gum') continue
    const item = data.find((item: any) => item.fdiName === key + '')
    if (!item) continue
    // 将四元数转换为旋转矩阵
    const rotationMatrix = quaternionToMatrix(item.stepOffset[idx])
    actors[key].setUserMatrix(rotationMatrix)
  }
}

let idx = 0
const isPlaying = ref(false)
let animationTimerId: number | null = null

// 更新当前帧
const updateFrame = (currentIndex: number) => {
  const { lowerJaw, upperJaw } = ArrangeTeeth as ArrangeTeethType

  if (lowerJaw.gums[currentIndex].dracoBase64) {
    const { polydata: lowPyd } = getPyd(lowerJaw.gums[currentIndex].dracoBase64)
    view.lower.mapper.gum.setInputData(lowPyd)
    updateTeeth(view.lower.actor, lowerJaw.teeth, currentIndex)
  }

  if (upperJaw.gums[currentIndex].dracoBase64) {
    const { polydata: upPyd } = getPyd(upperJaw.gums[currentIndex].dracoBase64)
    view.upper.mapper.gum.setInputData(upPyd)
    updateTeeth(view.upper.actor, upperJaw.teeth, currentIndex)
  }

  renderWindow.render()
}

// 播放动画
const playAnimation = () => {
  updateFrame(idx)

  const { lowerJaw } = ArrangeTeeth as ArrangeTeethType
  if (idx >= lowerJaw.gums.length - 1) {
    // 到达最后一帧，停止播放
    isPlaying.value = false
    animationTimerId = null
  } else {
    ++idx
    if (isPlaying.value) {
      animationTimerId = window.setTimeout(() => playAnimation(), 800)
    }
  }
}

// 切换播放/暂停
const toggleAnimation = () => {
  if (isPlaying.value) {
    // 暂停
    isPlaying.value = false
    if (animationTimerId !== null) {
      clearTimeout(animationTimerId)
      animationTimerId = null
    }
  } else {
    // 播放
    isPlaying.value = true
    playAnimation()
  }
}

// 上一步
const prevStep = () => {
  // 先暂停动画
  if (isPlaying.value) {
    isPlaying.value = false
    if (animationTimerId !== null) {
      clearTimeout(animationTimerId)
      animationTimerId = null
    }
  }

  const { lowerJaw } = ArrangeTeeth as ArrangeTeethType
  if (idx > 0) {
    --idx
  } else {
    idx = lowerJaw.gums.length - 1
  }
  updateFrame(idx)
}

// 下一步
const nextStep = () => {
  // 先暂停动画
  if (isPlaying.value) {
    isPlaying.value = false
    if (animationTimerId !== null) {
      clearTimeout(animationTimerId)
      animationTimerId = null
    }
  }

  const { lowerJaw } = ArrangeTeeth as ArrangeTeethType
  if (idx < lowerJaw.gums.length - 1) {
    ++idx
  } else {
    idx = 0
  }
  updateFrame(idx)
}

onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  renderer = fullScreenRenderer.getRenderer()
  renderWindow = fullScreenRenderer.getRenderWindow()

  // 创建 reader 并读取
  await vtkDracoReader.setDracoDecoder(DracoDecoderModule)

  const { lowerJaw, upperJaw } = ArrangeTeeth as ArrangeTeethType
  console.log('lowerJaw:', lowerJaw, 'upperJaw:', upperJaw)

  // 下颌牙龈
  const { mapper: lowMapper, actor: lowActor, polydata: lowPyd } = createActor(
    lowerJaw.gums[1].dracoBase64,
    'lower',
    'gum',
  )
  const { mapper: upMapper, actor: upActor } = createActor(
    upperJaw.gums[1].dracoBase64,
    'upper',
    'gum',
  )
  setActorProperty(upActor, 'gums')
  setActorProperty(lowActor, 'gums')

  // 获取纹理
  const lowTexture = lowMapper.getInputData().getPointData().getScalars()
  console.log(lowTexture, 'lowTexture');
  

  console.log(lowPyd, 'lowPyd');
  

  // addScalar(upArrayBuffer, upPyd);
  // addScalar(lowArrayBuffer, lowPyd);

  setLookUpTableFn(lowMapper)
  setLookUpTableFn(upMapper)

  for (let i = 0; i < lowerJaw.teeth.length; i++) {
    const { toothMesh, fdiName, stepOffset, toothAxis } = lowerJaw.teeth[i]
    const { actor } = createActor(toothMesh.dracoBase64, 'lower', `${fdiName}`)
    const matrix = quaternionToMatrix(stepOffset[0])
    // const matrix = AxisToMatrix({ Axis: toothAxis, position: stepOffset[0].position })
    actor.setUserMatrix(matrix)
    setActorProperty(actor, 'teeth')
  }

  for (let i = 0; i < upperJaw.teeth.length; i++) {
    const { toothMesh, fdiName, stepOffset, toothAxis } = upperJaw.teeth[i]
    const { actor } = createActor(toothMesh.dracoBase64, 'upper', `${fdiName}`)
    const matrix = quaternionToMatrix(stepOffset[0])
    // const matrix = AxisToMatrix({ Axis: toothAxis, position: stepOffset[0].position })
    actor.setUserMatrix(matrix)
    setActorProperty(actor, 'teeth')
  }

  renderer.getActiveCamera().setViewUp(0, 1, 0)
  renderer.resetCamera()
  renderWindow.render()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (animationTimerId !== null) {
    clearTimeout(animationTimerId)
    animationTimerId = null
  }
})
</script>
<style scoped>
.control-panel {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 1;
  display: flex;
  gap: 10px;
}

.rotate-btn,
.pose-btn,
.next-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.rotate-btn:hover,
.pose-btn:hover,
.next-btn:hover {
  background-color: #45a049;
}

.rotate-btn:active,
.pose-btn:active,
.next-btn:active {
  background-color: #3d8b40;
}
</style>
