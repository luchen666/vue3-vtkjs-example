<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'

import macro from '@kitware/vtk.js/macros'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
import vtkInteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator'

import vtkMouseCameraTrackballMultiRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballMultiRotateManipulator'
import vtkMouseCameraTrackballPanManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballPanManipulator'
import vtkMouseCameraTrackballRollManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRollManipulator'
import vtkMouseCameraTrackballRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator'
import vtkMouseCameraTrackballZoomManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomManipulator'
import vtkMouseCameraTrackballZoomToMouseManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomToMouseManipulator'

import vtkGestureCameraManipulator from '@kitware/vtk.js/Interaction/Manipulators/GestureCameraManipulator'
// import vtkPolyLineWidget from '@/vtk.js/Widgets/Widgets3D/PolyLineWidget'
import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget'
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager'

import controlPanel from '@/components/controlPanel/InteractorStyleManipulator'
import { controlPanelStyle } from '@/components/controlPanel/controlPanelStyle'

const { vtkDebugMacro } = macro

const containerRef = ref()

onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
    controlPanelStyle: controlPanelStyle,
  })
  const renderer = fullScreenRenderer.getRenderer()
  const renderWindow = fullScreenRenderer.getRenderWindow()

  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  fullScreenRenderer.getInteractor().setInteractorStyle(interactorStyle)

  // ----------------------------------------------------------------------------
  // Source, actor and mapper
  // ----------------------------------------------------------------------------

  const coneSource = vtkConeSource.newInstance({ height: 1 })
  const mapper = vtkMapper.newInstance()
  mapper.setInputConnection(coneSource.getOutputPort())

  const actor = vtkActor.newInstance()
  actor.setMapper(mapper)

  renderer.addActor(actor)
  renderer.resetCamera()
  renderWindow.render()

  // -----------------------------------------------------------
  // UI control handling
  // -----------------------------------------------------------

  fullScreenRenderer.addController(controlPanel)

  const manipulator = vtkMouseCameraTrackballPanManipulator.newInstance()
  manipulator.setButton(1)
  interactorStyle.addMouseManipulator(manipulator)

  // leftButton: { manipName: 'Zoom' },righttButton: { manipName: 'Pan' }
  const uiComponents = {}

  const selectMap = {
    leftButton: { button: 1 },
    middleButton: { button: 2 },
    rightButton: { button: 3 },
  }

  const manipulatorFactory = {
    None: null,
    Pan: vtkMouseCameraTrackballPanManipulator,
    Zoom: vtkMouseCameraTrackballZoomManipulator,
    Roll: vtkMouseCameraTrackballRollManipulator,
    Rotate: vtkMouseCameraTrackballRotateManipulator,
    MultiRotate: vtkMouseCameraTrackballMultiRotateManipulator,
    ZoomToMouse: vtkMouseCameraTrackballZoomToMouseManipulator,
  }

  function reassignManipulators() {
    interactorStyle.removeAllMouseManipulators()
    Object.keys(uiComponents).forEach(keyName => {
      const klass = manipulatorFactory[uiComponents[keyName].manipName]
      if (klass) {
        const manipulator = klass.newInstance()
        manipulator.setButton(selectMap[keyName].button)
        manipulator.setShift(!!selectMap[keyName].shift)
        manipulator.setControl(!!selectMap[keyName].control)
        manipulator.setAlt(!!selectMap[keyName].alt)
        if (selectMap[keyName].scrollEnabled !== undefined) {
          manipulator.setScrollEnabled(selectMap[keyName].scrollEnabled)
        }
        if (selectMap[keyName].dragEnabled !== undefined) {
          manipulator.setDragEnabled(selectMap[keyName].dragEnabled)
        }
        interactorStyle.addMouseManipulator(manipulator)
      }
    })

    // Always add gesture
    interactorStyle.addGestureManipulator(
      vtkGestureCameraManipulator.newInstance(),
    )
  }

  Object.keys(selectMap).forEach(name => {
    const elt = document.querySelector(`.${name}`)
    elt.addEventListener('change', e => {
      vtkDebugMacro(`Changing action of ${name} to ${e.target.value}`)

      uiComponents[name].manipName = e.target.value
      console.log(uiComponents, 'uiComponents')
      reassignManipulators()
    })
    uiComponents[name] = {
      elt,
      manipName: elt.value,
    }
  })
  reassignManipulators()
})
</script>
<style scoped></style>
