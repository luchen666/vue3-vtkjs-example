<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div style="position: absolute; top: 20px; right: 20px">
    <button>GrabFocus</button>
    <input type="checkbox" />Show SVG layer
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
// import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget'
import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget';
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager'
import vtkInteractorStyleManipulator from '@/vtk.js/Interaction/Style/InteractorStyleManipulator'


// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const containerRef = ref()

onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  const renderer = fullScreenRenderer.getRenderer()

  const cone = vtkConeSource.newInstance()
  const mapper = vtkMapper.newInstance()
  const actor = vtkActor.newInstance()

  actor.setMapper(mapper)
  mapper.setInputConnection(cone.getOutputPort())
  actor.getProperty().setOpacity(0.5)
  renderer.addActor(actor)
  
  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  fullScreenRenderer.getInteractor().setInteractorStyle(interactorStyle)

  // ----------------------------------------------------------------------------
  // Widget manager
  // ----------------------------------------------------------------------------

  const widgetManager = vtkWidgetManager.newInstance()
  widgetManager.setRenderer(renderer)

  const widget = vtkPolyLineWidget.newInstance()
  widget.placeWidget(cone.getOutputData().getBounds())

  widgetManager.addWidget(widget)

  renderer.resetCamera()
  widgetManager.enablePicking()
  widgetManager.grabFocus(widget)
})
</script>
