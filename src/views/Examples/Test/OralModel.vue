<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import '@/vtk.js/Rendering/Profiles/Geometry'
import vtkActor from '@/vtk.js/Rendering/Core/Actor'
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper'
import vtkSTLReader from '@/vtk.js/IO/Geometry/STLReader'
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkInteractorStyleManipulator from '@/vtk.js/Interaction/Style/InteractorStyleManipulator'
import vtkCamera from '@/vtk.js/Rendering/Core/Camera'
import vtkMouseCameraTrackballRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator'
import { calcLongestAxis } from '@/utils/vtkUtils/longest-axis'

const containerRef = ref()

// 设置相机和交互器
const setCameraAndInteractor = (
  renderer: any,
  fullScreenRenderer: any,
  center: number[],
) => {
  const activeCamera = vtkCamera.newInstance()
  // activeCamera.setPosition(0, -1, 0)
  // activeCamera.setViewUp(0, 0, 1)
  // activeCamera.setFocalPoint(center[0], center[1], center[2])
  // activeCamera.setParallelProjection(true)
  renderer.setActiveCamera(activeCamera)

  const interactor = fullScreenRenderer.getInteractor()
  interactor.setInteractorStyle(vtkInteractorStyleManipulator.newInstance())

  const manipulator1 = vtkMouseCameraTrackballRotateManipulator.newInstance()
  manipulator1.setButton(3)
  manipulator1.setDragEnabled(true)
  interactor.getInteractorStyle().addMouseManipulator(manipulator1)
  // 设置旋转中心点
  interactor
    .getInteractorStyle()
    .setCenterOfRotation(center[0], center[1], center[2])
}

const getPolydata = async (url: string) => {
  const reader = vtkSTLReader.newInstance()
  await reader.setUrl(url, { binary: true })
  reader.update()
  const { actor, mapper } = createActor(reader.getOutputPort())
  return { actor, mapper }
}

const createActor = (pyd: any) => {
  const mapper = vtkMapper.newInstance()
  const actor = vtkActor.newInstance()
  mapper.setInputConnection(pyd)
  actor.setMapper(mapper)

  mapper.setScalarVisibility(false)
  const property = actor.getProperty()
  property.setColor(230 / 255, 180 / 255, 90 / 255)
  return { actor, mapper }
}

onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  const renderer = fullScreenRenderer.getRenderer()
  const renderWindow = fullScreenRenderer.getRenderWindow()

  const upUrl = '/data/stl/test-matrix/upper.stl'
  const { actor: upActor } = await getPolydata(upUrl)

  const lowUrl = '/data/stl/test-matrix/lower.stl'
  const { actor: lowActor } = await getPolydata(lowUrl)

  renderer.addActor(upActor)
  renderer.addActor(lowActor)

  const bound = upActor.getBounds()
  const center = [
    (bound[0] + bound[1]) / 2,
    (bound[2] + bound[3]) / 2,
    (bound[4] + bound[5]) / 2,
  ]

  // const longestAxis = calcLongestAxis(upActor.getMapper().getInputData())

  console.log(upActor, 'upActor');
  

  // 设置相机和交互器
  setCameraAndInteractor(renderer, fullScreenRenderer, center)

  renderer.resetCamera()
  renderWindow.render()
})
</script>
<style scoped></style>
