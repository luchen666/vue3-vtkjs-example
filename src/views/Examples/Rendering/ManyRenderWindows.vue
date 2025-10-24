<template>
  <select
    name="selectId"
    id="selectId"
    v-model="windowSize"
    @change="changeSize"
  >
    <option v-for="item in optionList" :key="item.join(',')" :value="item">
      {{ item }}
    </option>
  </select>

  <div ref="rootContainerRef" class="renderWindowContainer"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import '@kitware/vtk.js/Rendering/Misc/RenderingAPIs'
import '@kitware/vtk.js/Rendering/Profiles/Volume'

import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction'
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera'
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction'
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer'
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow'
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor'
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice'
import vtkImageResliceMapper from '@kitware/vtk.js/Rendering/Core/ImageResliceMapper'
import vtkPlane from '@kitware/vtk.js/Common/DataModel/Plane'
import { SlabTypes } from '@kitware/vtk.js/Rendering/Core/ImageResliceMapper/Constants'
import vtkMath from '@kitware/vtk.js/Common/Core/Math'
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper'

import buffer3D from '@/testData/buffer3D.json'
import { getImageData2 } from '@/utils/covertImageData'

const rootContainerRef = ref()

function createImageActor(imageData: any) {
  const randomQuat: [number, number, number, number] = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ]
  const randomMat = new Float32Array(9)
  vtkMath.quaternionToMatrix3x3(randomQuat, randomMat)
  const randomNormal: [number, number, number] = [
    randomMat[0],
    randomMat[1],
    randomMat[2],
  ]

  const slicePlane = vtkPlane.newInstance()
  slicePlane.setNormal(...randomNormal)
  slicePlane.setOrigin(imageData.getCenter())

  const mapper = vtkImageResliceMapper.newInstance()
  mapper.setSlicePlane(slicePlane)
  mapper.setSlabType(SlabTypes.MAX)
  mapper.setInputData(imageData)

  const actor = vtkImageSlice.newInstance()
  actor.setMapper(mapper)

  return actor
}

let mainRenderWindow: any
let mainRenderWindowView: any
function resetMainRenderWindowAndView() {
  mainRenderWindow = vtkRenderWindow.newInstance()
  mainRenderWindowView = mainRenderWindow.newAPISpecificView()
  mainRenderWindow.addView(mainRenderWindowView)
  mainRenderWindowView.initialize()
}
resetMainRenderWindowAndView()

function applyStyle(element: HTMLElement) {
  element.style.width = `calc(${100 / windowSize.value[1]}% - 20px)`
  element.style.height = `${100 / windowSize.value[0]}%`
  element.style.margin = '10px'
  return element
}


  const childRenderWindows: any[] = []
  function addRenderWindow(actor: any) {
    if (mainRenderWindow.isDeleted()) {
      resetMainRenderWindowAndView()
    }
    const renderWindow = vtkRenderWindow.newInstance()
    mainRenderWindow.addRenderWindow(renderWindow)

    const renderWindowView = mainRenderWindowView.addMissingNode(renderWindow)
    renderWindow.addView(renderWindowView)

    const container = applyStyle(document.createElement('div'))
    rootContainerRef.value.appendChild(container)
    renderWindowView.setContainer(container)

    const containerBounds = container.getBoundingClientRect()
    const pixRatio = window.devicePixelRatio
    const dimensions = [
      containerBounds.width * pixRatio,
      containerBounds.height * pixRatio,
    ]
    renderWindowView.setSize(...dimensions)
    const canvas = renderWindowView.getCanvas()
    canvas.style.width = `${container.clientWidth}px`
    canvas.style.height = `${container.clientHeight}px`

    // Add an interactor to the view
    const interactor = vtkRenderWindowInteractor.newInstance()
    interactor.setView(renderWindowView)
    interactor.initialize()
    interactor.bindEvents(canvas)
    interactor.setInteractorStyle(
      vtkInteractorStyleTrackballCamera.newInstance(),
    )

    const renderer = vtkRenderer.newInstance({ background: [0, 0, 0] })
    renderWindow.addRenderer(renderer)

    renderer.addActor(actor)
    renderer.resetCamera()

    childRenderWindows.push(renderWindow)

    return renderWindow
  }

  const imageData = getImageData2(buffer3D)
const addWindow = () => {
  for (let i = 0; i < windowSize.value[0] * windowSize.value[1]; i++) {
    addRenderWindow(createImageActor(imageData))
  }
}

const removeWindow = () => {
  console.log(childRenderWindows,  ' childRenderWindows')
  console.log( mainRenderWindow,' mainRenderWindow.getView()')

  const renderWindowView = mainRenderWindow.getViews()[0]
  childRenderWindows.forEach((renderWindow) => {
    const container = renderWindowView.getContainer();
      rootContainerRef.value.removeChild(container)
      renderWindowView.getInteractor().delete()

      mainRenderWindow.removeRenderWindow(renderWindow)
      renderWindow.delete()

      mainRenderWindowView.removeNode(renderWindowView)

      if (mainRenderWindow.getChildRenderWindowsByReference().length === 0) {
        mainRenderWindowView.delete()
        mainRenderWindow.delete()
      }
  })
}

const windowSize = ref([1, 5])
const optionList = [
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
]

const changeSize = () => {
  removeWindow();
  // addWindow()
}

onMounted(() => {
  addWindow();
  mainRenderWindowView.resizeFromChildRenderWindows()
  mainRenderWindow.render()
})
</script>
<style>
.renderWindowContainer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
