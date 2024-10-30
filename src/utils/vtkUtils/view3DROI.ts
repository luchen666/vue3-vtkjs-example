// 设置牙齿、骨骼、灰度的类
import vtkColorTransferFunction from '@/vtk.js/Rendering/Core/ColorTransferFunction'
import vtkPiecewiseFunction from '@/vtk.js/Common/DataModel/PiecewiseFunction'
import type vtkVolume from '@/vtk.js/Rendering/Core/Volume'

/**
 * 设置 牙齿、骨骼、灰度
 * @param view3D
 * @param modelValue
 */
export const setModelAction = (actor: vtkVolume, modelValue: string) => {
  // 不同的modelValue 对应不同的数据设置
  const range = [-512.0, 3072.0]
  // 设置三维的牙齿模式
  const opacityTransferFunction = vtkPiecewiseFunction.newInstance()
  const colorTransferFunction = vtkColorTransferFunction.newInstance()
  const value = 0.45
  const property = actor.getProperty()
  const minV = Math.max(0.0, value - 0.3) / 0.7
  property.setShade(false)
  property.setAmbient(0.1)
  property.setDiffuse(0.7)
  property.setSpecular(0.2)
  property.setSpecularPower(10)
  switch (modelValue) {
    case 'tooth':
      opacityTransferFunction.addPoint(
        range[0] + 0.39 * (range[1] - range[0]),
        0.0,
      )
      opacityTransferFunction.addPoint(
        range[0] + 0.66 * (range[1] - range[0]),
        0.28,
      )
      opacityTransferFunction.addPoint(
        range[0] + 1.0 * (range[1] - range[0]),
        0.5,
      )

      colorTransferFunction.addRGBPoint(
        range[0] + 0.0 * (range[1] - range[0]),
        0.0,
        0.0,
        0.0,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.33 * (range[1] - range[0]),
        0.6,
        0.0,
        0.0,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.69 * (range[1] - range[0]),
        0.86,
        0.67,
        0.3,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.95 * (range[1] - range[0]),
        1.0,
        1.0,
        1.0,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 1.0 * (range[1] - range[0]),
        1.0,
        1.0,
        1.0,
      )
      break
    case 'skeleton':
      opacityTransferFunction.addPoint(
        range[0] + 0.4 * (range[1] - range[0]),
        0.0,
      )
      opacityTransferFunction.addPoint(
        range[0] + 0.55 * (range[1] - range[0]),
        1.0,
      )
      opacityTransferFunction.addPoint(
        range[0] + 1.0 * (range[1] - range[0]),
        1.0,
      )

      colorTransferFunction.addRGBPoint(
        range[0] + 0.0 * (range[1] - range[0]),
        0.0,
        0.0,
        0.0,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.42 * (range[1] - range[0]),
        0.63,
        0.1,
        0.09,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.55 * (range[1] - range[0]),
        0.99,
        0.89,
        0.58,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.64 * (range[1] - range[0]),
        1.0,
        1.0,
        1.0,
      )
      property.setShade(true)
      property.setAmbient(0.3)
      property.setDiffuse(0.6)
      property.setSpecular(0.1)
      property.setSpecularPower(10)
      break
    case 'grey':
      opacityTransferFunction.addPoint(
        range[0] + 0.02 * (range[1] - range[0]),
        0.0,
      )
      opacityTransferFunction.addPoint(
        range[0] + 0.2 * (range[1] - range[0]),
        0.2,
      )
      opacityTransferFunction.addPoint(
        range[0] + 0.4 * (range[1] - range[0]),
        0.2,
      )
      opacityTransferFunction.addPoint(
        range[0] + 0.6 * (range[1] - range[0]),
        0.3,
      )
      opacityTransferFunction.addPoint(
        range[0] + 1.0 * (range[1] - range[0]),
        0.5,
      )

      colorTransferFunction.addRGBPoint(
        range[0] + 0.0 * (range[1] - range[0]),
        0.0,
        0.0,
        0.0,
      )
      colorTransferFunction.addRGBPoint(
        range[0] + 0.6 * (range[1] - range[0]),
        1.0,
        1.0,
        1.0,
      )
      break
  }

  property.setUseGradientOpacity(0, true)
  property.setGradientOpacityMinimumValue(
    0,
    (range[1] - range[0]) * 0.2 * minV * minV,
  )
  property.setGradientOpacityMaximumValue(
    0,
    (range[1] - range[0]) * 1.0 * value * value,
  )
  property.setRGBTransferFunction(0, colorTransferFunction)
  property.setScalarOpacity(0, opacityTransferFunction)
  property.setInterpolationTypeToLinear()
}
