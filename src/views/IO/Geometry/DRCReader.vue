<template>
  <button class="rotate-btn" @click="rotateFn">click</button>
  <button class="pose-btn" @click="poseFn">pose</button>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader'
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader'
import vtkMatrixBuilder from '@kitware/vtk.js/Common/Core/MatrixBuilder'
import vtkArrowSource from '@kitware/vtk.js/Filters/Sources/ArrowSource'

import { createOrientation } from '@/utils/vtkUtils/Orientation'
import vtkLight from '@/vtk.js/Rendering/Core/Light'

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

let renderer: any
let renderWindow: any

const reader = vtkDracoReader.newInstance()
const mapper = vtkMapper.newInstance({ scalarVisibility: false })
const actor = vtkActor.newInstance()

actor.setMapper(mapper)
mapper.setInputConnection(reader.getOutputPort())

// ----------------------------------------------------------------------------

const containerRef = ref(null)
function update() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  renderer = fullScreenRenderer.getRenderer()
  renderWindow = fullScreenRenderer.getRenderWindow()

  const arrowSource = vtkArrowSource.newInstance({ direction: [1, 1, 0] })
  const arrowActor = vtkActor.newInstance()
  const mapper = vtkMapper.newInstance()
  arrowActor.setMapper(mapper)
  arrowActor.getProperty().setEdgeVisibility(true)
  arrowActor.getProperty().setEdgeColor(1, 0, 0)
  arrowActor.getProperty().setRepresentationToSurface()
  mapper.setInputConnection(arrowSource.getOutputPort())
  arrowActor.setScale(15, 15, 15)
  arrowActor.setPosition(0, 0, 0)
  renderer.addActor(arrowActor)

  const camera = renderer.getActiveCamera()
  camera.setViewUp(0, 1, 0)
  // camera.setPosition(1, 1, 0)
  // camera.setFocalPoint(0, 0, 0)

  renderer.addActor(actor)
  renderer.resetCamera()

  createOrientation(renderWindow, 'BOTTOM_LEFT')

  // 添加灯光
  const light = vtkLight.newInstance({
    positional: false,
    color: [1.0, 1.0, 1.0],
  })
  light.setLightTypeToCameraLight()
  light.setShadowAttenuation(0)
  light.setIntensity(0.5)
  renderer.addLight(light)
  renderer.updateLightsGeometryToFollowCamera();

  renderWindow.render()
}

const rotateFn = () => {
  // const arrawActor = renderer.getActors()[0]
  // // 设置箭头的方向
  // const direction = [0.3, 0.4, 0.3]
  // const position = [0, 10, 0]

  // // 计算箭头的旋转矩阵，平移到 position 的位置
  // let matrix = vtkMatrixBuilder
  //   .buildFromDegree()
  //   .translate(position[0], position[1], position[2])
  //   .rotateFromDirections([1, 0, 0], direction)
  //   .getMatrix()

  // //   // 设置箭头的位置
  // // arrawActor.setPosition(position);

  // // 应用旋转矩阵到箭头
  // arrawActor.setUserMatrix(matrix)
  // renderWindow.render()

  const camera = renderer.getActiveCamera()
  camera.setPosition(1, 1, 0.6)

  camera.setViewUp(1, 1, 0)
  camera.setFocalPoint(30, 20, 10)

  renderWindow.render()
}

const poseFn = () => {
  console.log(1111);
  
  const camera = renderer.getActiveCamera()
  camera.setPosition(0, 1, 0);
  // camera.setViewUp(0, 1, 1)
  renderer.resetCamera()
  renderWindow.render()
}

window.module = {}

// Add new script tag with draco CDN
vtkResourceLoader
  .loadScript('https://unpkg.com/draco3d@1.3.4/draco_decoder_nodejs.js')
  .then(() => {
    // Set decoder function to the vtk reader
    vtkDracoReader.setDracoDecoder(window.CreateDracoModule)

    // Trigger data download
    reader.setUrl('/data/draco/lower.drc').then(update)
  })
</script>
<style scoped>
.rotate-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 1;
}
.pose-btn {
  position: absolute;
  top: 20px;
  right: 100px;
  z-index: 1;
}
</style>
