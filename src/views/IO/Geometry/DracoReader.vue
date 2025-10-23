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
import vtkArrowSource from '@kitware/vtk.js/Filters/Sources/ArrowSource'

import { createOrientation } from '@/utils/vtkUtils/Orientation'
import vtkLight from '@/vtk.js/Rendering/Core/Light'

import { getDracoPolyData } from '@/utils/vtkUtils/DracoReader'
import vtkOBBTree from '@kitware/vtk.js/Filters/General/OBBTree'
import vtkTriangleFilter from '@kitware/vtk.js/Filters/General/TriangleFilter'

import vtkPoints from '@kitware/vtk.js/Common/Core/Points'
import vtkCellArray from '@kitware/vtk.js/Common/Core/CellArray'
import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData'

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

let renderer: any
let renderWindow: any

// const reader = vtkDracoReader.newInstance()
const mapper = vtkMapper.newInstance({ scalarVisibility: false })
const actor = vtkActor.newInstance()

actor.setMapper(mapper)
// mapper.setInputConnection(reader.getOutputPort())

// ----------------------------------------------------------------------------

const arrowSource = vtkArrowSource.newInstance({ direction: [1, 1, 0] })
const containerRef = ref(null)
function update() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  renderer = fullScreenRenderer.getRenderer()
  renderWindow = fullScreenRenderer.getRenderWindow()

  // const arrowActor = vtkActor.newInstance()
  // const mapper = vtkMapper.newInstance()
  // arrowActor.setMapper(mapper)
  // arrowActor.getProperty().setEdgeVisibility(true)
  // arrowActor.getProperty().setEdgeColor(1, 0, 0)
  // arrowActor.getProperty().setRepresentationToSurface()
  // mapper.setInputConnection(arrowSource.getOutputPort())
  // arrowActor.setScale(15, 15, 15)
  // arrowActor.setPosition(0, 0, 0)
  // renderer.addActor(arrowActor)

  const camera = renderer.getActiveCamera()
  camera.setViewUp(0, 1, 0)
  // camera.setPosition(1, 1, 0)
  // camera.setFocalPoint(0, 0, 0)

  renderer.addActor(actor)
  renderer.resetCamera()

  createOrientation(renderWindow, 'BOTTOM_LEFT')

  // // 添加灯光
  // const light = vtkLight.newInstance({
  //   positional: false,
  //   color: [1.0, 1.0, 1.0],
  // })
  // light.setLightTypeToCameraLight()
  // light.setShadowAttenuation(0)
  // light.setIntensity(0.5)
  // renderer.addLight(light)
  // renderer.updateLightsGeometryToFollowCamera()

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
  const camera = renderer.getActiveCamera()
  camera.setPosition(0, 1, 0)
  // camera.setViewUp(0, 1, 1)
  renderer.resetCamera()
  renderWindow.render()
}

window.module = {}

const goujianPolydata = (pyd: any) => {
  const polydata = vtkPolyData.newInstance()
  const points = vtkPoints.newInstance()
  const polys = vtkCellArray.newInstance()
  const lines = vtkCellArray.newInstance()

  // 查找数组中第一个不是0的索引
  let index = pyd
    .getPolys()
    .getData()
    .findIndex((num: number) => num !== 0)
  let ply = pyd.getPolys().getData().slice(index)

  points.setData(pyd.getPoints().getData(), 3)
  polydata.setPoints(points)
  polys.setData(ply)
  polydata.setPolys(polys)
  if (pyd.getLines().getData()?.length) {
    lines.setData(pyd.getLines().getData().slice())
    polydata.setLines(lines)
  }
  return polydata
}

onMounted(async () => {
  // const url = '/data/draco/lower.drc'
  const url = '/data/draco/throw_14.drc'
  // let url = "https://dev-api.myyun.com/apiv1/oss/file/view/"
  // // url += '1930142792814387201'
  // url += '1930142794693435393'

  let triangulate = true
  const polydata = await getDracoPolyData(url)
  mapper.setInputData(polydata)

  const pyd = goujianPolydata(polydata)
  const obbTree = vtkOBBTree.newInstance()
  if (triangulate) {
    const triangleFilter = vtkTriangleFilter.newInstance()
    triangleFilter.setInputData(pyd)
    triangleFilter.update()
    obbTree.setDataset(triangleFilter.getOutputData())
  } else {
    obbTree.setDataset(pyd)
  }

  obbTree.buildLocator()
  const obb = obbTree.generateRepresentation(0)
  const pointAry = obb.getPoints().getData()
  console.log(pointAry, obb, "obb");
  

  update()
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
