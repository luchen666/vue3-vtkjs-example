import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray'

const getImageData2 = (obj: any) => {
  // 利用obj的数据开始聚合即可
  const pixelArray = obj.data || obj.image_data || obj.result_data //new Float32Array(xVoxels * yVoxels * zVoxels);
  // const xVoxels = obj.extent[1] + 1;
  // const yVoxels = obj.extent[3] + 1;
  // const zVoxels = obj.extent[5] + 1;
  const [xSpacing, ySpacing, zSpacing] = obj.spacing

  const origin = obj.origin

  const scalarArray = vtkDataArray.newInstance({
    name: 'Pixels',
    numberOfComponents: 1,
    values: pixelArray,
  })

  const imageData = vtkImageData.newInstance()
  imageData.setExtent(obj.extent)
  // imageData.setDimensions(xVoxels, yVoxels, zVoxels);
  imageData.setSpacing(xSpacing, ySpacing, zSpacing)
  // imageData.setDirection([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  imageData.setOrigin(...origin)
  imageData.getPointData().setScalars(scalarArray)
  imageData.modified()
  return imageData
}

export { getImageData2 }
