<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <button
    @click="addMeasure"
    style="position: absolute; top: 20px; right: 20px"
  >
    添加测量
  </button>
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
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager'
import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget'
import { comManipulator } from '@/utils/vtkUtils/ComManipulator'
import vtkInteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator'
import {
  addPoints,
  addPulpMeasure,
} from '@/components/vtk/pulpMeasure3D/pulpSvg'
import vtkCellPicker from '@kitware/vtk.js/Rendering/Core/CellPicker'
import { addActor, clipBounds, drcReader } from '@/utils/vtkUtils/drcReader'

// @ts-ignore

const containerRef = ref()
let view: any = {}
async function init() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  const renderer = fullScreenRenderer.getRenderer()
  const renderWindow = fullScreenRenderer.getRenderWindow() // getApiSpecificRenderWindow

  const actor = vtkVolume.newInstance()
  const mapper = vtkVolumeMapper.newInstance()
  actor.setMapper(mapper)

  // 设置模式
  setModelAction(actor, 'tooth') // tooth, grey, skeleton

  const cropFilter = vtkImageCropFilter.newInstance()

  const data = getImageData2(imageData)

  const extent = data.getExtent()
  cropFilter.setCroppingPlanes(...extent)

  cropFilter.setInputData(data)
  mapper.setInputConnection(cropFilter.getOutputPort())

  renderer.addVolume(actor)

  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  renderWindow.getInteractor().setInteractorStyle(interactorStyle)
  comManipulator.addMouseManipulator(interactorStyle)

  console.log(imageData,data.getCenter(), "imageData")
  // 设置旋转中心点
  const center = data.getCenter()
  interactorStyle.setCenterOfRotation(center[0], center[1], center[2]);

  actor.setPickable(false)

  const activeCamera = renderer.getActiveCamera()
  activeCamera.setParallelProjection(true)
  activeCamera.setFocalPoint(0, 0, 0)
  activeCamera.setPosition(0, -1, 0)
  activeCamera.setViewUp(0, 0, 1)

  renderer.resetCameraClippingRange()
  renderer.resetCamera(actor.getBounds())

  // activeCamera.setParallelScale(20)
  renderWindow.render()

  // // await addActor(renderer, "/data/draco/ytys/11.drc");
  // const ysqActor = await addActor(renderer, '/data/draco/ytys/11_1.drc', 0.1)
  // const ybzActor = await addActor(renderer, '/data/draco/ytys/11_2.drc', 0.5)

  // // actor.getProperty().setOpacity(opacity)
  // window.actor = actor;
  // window.ybzActor = ybzActor;
  // window.renderWindow = renderWindow;

  // // await addActor(renderer, "/data/draco/ytys/11_3.drc");
  // const bounds = ybzActor.getBounds()
  // // clipBounds(bounds, { renderer, mapper })
  // renderWindow.render()

  // const widgetManager = vtkWidgetManager.newInstance()
  // widgetManager.setRenderer(renderer)

  // view = {
  //   renderer,
  //   bounds,
  //   widgetManager,
  // }

  // view.ysqPicker = vtkCellPicker.newInstance({ opacityThreshold: 0.0001 })
  // view.ysqPicker.setPickFromList(1)
  // view.ysqPicker.setTolerance(0)
  // view.ysqPicker.initializePickList()
  // view.ysqPicker.addPickList(ysqActor)
  // view.ysqPicker.addPickList(ybzActor);

  // addPoints(view);
}

const addMeasure = () => {
  // const widget = vtkPolyLineWidget.newInstance()
  // widget.placeWidget(view.bounds)
  // view.widgetManager.addWidget(widget)
  // view.renderer.resetCamera(view.bounds)
  // view.widgetManager.enablePicking()
  // view.widgetManager.grabFocus(widget)
  // addPulpMeasure(view)
}

onMounted(() => {
  init()
})
</script>
<style scoped></style>
