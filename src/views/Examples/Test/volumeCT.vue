<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import '@/vtk.js/Rendering/Profiles/All'
import '@/vtk.js/Rendering/Profiles/Volume'
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkVolume from '@/vtk.js/Rendering/Core/Volume'
import vtkVolumeMapper from '@/vtk.js/Rendering/Core/VolumeMapper'
import vtkImageCropFilter from '@/vtk.js/Filters/General/ImageCropFilter'

import { getImageData2 } from '@/utils/covertImageData'
import imageData from '@/testData/buffer3D.json'
import { setModelAction } from '@/utils/vtkUtils/view3DROI'
import { comManipulator } from '@/utils/vtkUtils/ComManipulator'
import vtkInteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator'
import { sharedMapper } from '@/utils/useSharedMapper'

const props = defineProps({
  idx: {
    type: Number,
    default: 0,
  },
})

const containerRef = ref()
let view: any = {}
async function init() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  const renderer = fullScreenRenderer.getRenderer()
  const renderWindow = fullScreenRenderer.getRenderWindow() // getApiSpecificRenderWindow

  const image = sharedMapper.getImage()
  const cropFilter = vtkImageCropFilter.newInstance()
  cropFilter.setCroppingPlanes(image.getExtent())
  cropFilter.setInputData(image)
  const mapper = vtkVolumeMapper.newInstance()
  mapper.setInputConnection(cropFilter.getOutputPort())

  // const bd = [-0.249, 128.235, -0.249, 128.235, -0.249, 99.351]
  // const ext = [0, 257, 0, 257, 0, 199]
  const plane = [
    { normal: [1, 0, 0], center: [64, 64, 49] },
    { normal: [-1, 0, 0], center: [64, 64, 49] },
    { normal: [0, 1, 0], center: [64, 64, 49] },
    { normal: [0, -1, 0], center: [64, 64, 49] },
    { normal: [0, 0, 1], center: [64, 64, 49] },
    { normal: [0, 0, -1], center: [64, 64, 49] },
    { normal: [1, 0, 0], center: [64, 64, 49] },
    { normal: [-1, 0, 0], center: [64, 64, 49] },
  ]
  sharedMapper.clipPlane([plane[props.idx]], mapper)

  const actor = vtkVolume.newInstance()
  actor.setMapper(mapper)
  renderer.addVolume(actor)
  // 设置模式
  setModelAction(actor, 'tooth') // tooth, grey, skeleton

  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  renderWindow.getInteractor().setInteractorStyle(interactorStyle)
  comManipulator.addMouseManipulator(interactorStyle)

  // 设置旋转中心点
  const center = image.getCenter()
  interactorStyle.setCenterOfRotation(center[0], center[1], center[2])

  actor.setPickable(false)

  const activeCamera = renderer.getActiveCamera()
  activeCamera.setParallelProjection(true)
  activeCamera.setFocalPoint(0, 0, 0)
  activeCamera.setPosition(0, -1, 0)
  activeCamera.setViewUp(0, 0, 1)

  renderer.resetCameraClippingRange()
  renderer.resetCamera(actor.getBounds())
  renderWindow.render()
}

onMounted(() => {
  init()
})
</script>
<style scoped></style>
