<template>
  <div ref="containerRef" style="width: 50%; height: 100%"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager'
import vtkInteractorStyleManipulator from '@/vtk.js/Interaction/Style/InteractorStyleManipulator'

import { useNerveWidget } from './addNerveWidget'

const props = defineProps({
  baseData: {
    type: Object,
    default: () => {
      return {
        background: [0.2, 0.3, 0.4],
        viewCode: ""
      }
    },
  }
})

let renderWindow = {} as any;
const containerRef = ref()
onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
    background: props.baseData.background,
  })
  renderWindow = fullScreenRenderer.getRenderWindow()
  const renderer = fullScreenRenderer.getRenderer()

  const cone = vtkConeSource.newInstance()
  const mapper = vtkMapper.newInstance()
  const actor = vtkActor.newInstance()

  actor.setMapper(mapper)
  mapper.setInputConnection(cone.getOutputPort())
  actor.getProperty().setOpacity(0.5)
  // renderer.addActor(actor)

  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  fullScreenRenderer.getInteractor().setInteractorStyle(interactorStyle)

  // ----------------------------------------------------------------------------
  // Widget manager

  const widgetManager = vtkWidgetManager.newInstance()
  widgetManager.setRenderer(renderer)

  useNerveWidget({ widgetManager, renderWindow, viewCode: props.baseData.viewCode, renderer });
  renderer.resetCamera()
  renderWindow.render()
})

</script>
