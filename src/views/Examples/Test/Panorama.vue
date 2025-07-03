<template>
  <div ref="containerAViewRef" style="width: 1000px; height: 600px"></div>
</template>

<script setup lang="ts">
import { ref, inject, watchEffect, nextTick } from 'vue'

import '@/vtk.js/Rendering/Profiles/All'
import vtkImageReslice from '@/vtk.js/Imaging/Core/ImageReslice'
import vtkInteractorStyleManipulator from '@/vtk.js/Interaction/Style/InteractorStyleManipulator'
import vtkWidgetManager from '@/vtk.js/Widgets/Core/WidgetManager'
import vtkImageMapper from '@/vtk.js/Rendering/Core/ImageMapper'
import vtkImageSlice from '@/vtk.js/Rendering/Core/ImageSlice'
import vtkGenericRenderWindow from '@/vtk.js/Rendering/Misc/GenericRenderWindow'

// 增加这个处理position的类
import vtkPointPicker from '@/vtk.js/Rendering/Core/PointPicker'

import type vtkImageData from '@/vtk.js/Common/DataModel/ImageData'
import type vtkCamera from '@/vtk.js/Rendering/Core/Camera'
import imageData from '@/testData/imageData.json'
import { getImageData2 } from '@/utils/covertImageData'

const containerAViewRef = ref()

let obj: any = {}

/** 获取HU 数据 */
const getHuData = (obj: any) => {
  // 增加pointPicker 类 这个类的作用只是把数据来做相应的处理类而已
  const picker = vtkPointPicker.newInstance()
  picker.setPickFromList(1)
  picker.initializePickList()
  picker.addPickList(obj.resliceActor)
  obj.interactor.onMouseMove((event: any) => {
    const pos = event.position
    const point = [pos.x, pos.y, 0]

    picker.pick(point, event.pokedRenderer)
    const pickedPoint = picker.getPickPosition()
    pickedPoint[2] = 0
    let pixel
    try {
      const mapperData = obj.resliceMapper.getInputData()
      pixel = mapperData.getScalarValueFromWorld(pickedPoint)
    } catch (error) {
      console.error(error)
    }

    let realPixelVal: string | null = null
    if (!isNaN(pixel)) {
      realPixelVal = parseInt(pixel) + 'HU'
    }
    console.log('realPixelVal', realPixelVal)
  }, 999)
}

const grw = vtkGenericRenderWindow.newInstance()
// 开始初始化函数即可
function initView(image: vtkImageData) {
  grw.setContainer(containerAViewRef.value)

  const dataArray =
    image.getPointData().getScalars() || image.getPointData().getArrays()[0]
  const dataRange = dataArray.getRange()

  grw.resize()
  obj = {
    renderWindow: grw.getRenderWindow(),
    renderer: grw.getRenderer(),
    GLWindow: grw.getApiSpecificRenderWindow(),
    interactor: grw.getInteractor(),
    widgetManager: vtkWidgetManager.newInstance(),
    reslice: vtkImageReslice.newInstance(),
    resliceActor: vtkImageSlice.newInstance(),
    resliceMapper: vtkImageMapper.newInstance(),
  }

  const interactorStyle = vtkInteractorStyleManipulator.newInstance()
  grw.getInteractor().setInteractorStyle(interactorStyle)

  const colorLevel = (dataRange[0] + dataRange[1]) / 2
  const colorWindow = dataRange[1] - dataRange[0]
  obj.resliceActor.getProperty().setColorLevel(colorLevel)
  obj.resliceActor.getProperty().setColorWindow(colorWindow)

  obj.renderer.setBackground([0, 0, 0])
  obj.renderWindow.addRenderer(obj.renderer)
  obj.renderWindow.addView(obj.GLWindow)

  obj.reslice.setSlabNumberOfSlices(1)
  obj.reslice.setInputData(image)
  // 设置2D
  obj.reslice.setOutputDimensionality(2)

  // ImageMapper mapper 数据
  obj.resliceMapper.setInputConnection(obj.reslice.getOutputPort())
  obj.resliceActor.setMapper(obj.resliceMapper)
  obj.renderer.addActor(obj.resliceActor)

  const bounds = obj.resliceMapper.getBounds()
  obj.renderer.resetCamera(bounds)

  // 获取HU 数据
  getHuData(obj)

  obj.widgetManager.setRenderer(obj.interactor.getCurrentRenderer())
}

const createView = () => {
  nextTick(async () => {
    const data = getImageData2(imageData)
    initView(data)

    obj.interactor.render()
    obj.renderWindow.render()
  })
}
createView()
</script>
