import vtkActor from '@/vtk.js/Rendering/Core/Actor'
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper'
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader'
import vtkPolyDataNormals from '@kitware/vtk.js/Filters/Core/PolyDataNormals'
import vtkPlane from '@kitware/vtk.js/Common/DataModel/Plane'

/** 读取 drc 文件 */
export const drcReader = async (plydUrl: string) => {
  vtkDracoReader.setDracoDecoder(window.CreateDracoModule)
  const instReader = vtkDracoReader.newInstance()
  await instReader.setUrl(plydUrl)
  const polydata = instReader.getOutputData(0)
  return polydata
}

export const addActor = async (
  renderer: any,
  plydUrl: any,
  opacity: number,
) => {
  const mapper = vtkMapper.newInstance({ scalarVisibility: false })
  const actor = vtkActor.newInstance()

  const polydata = await drcReader(plydUrl)

  const normals = vtkPolyDataNormals.newInstance()
  normals.setInputData(polydata)
  mapper.setInputConnection(normals.getOutputPort())

  actor.setPosition(10, 5, 0)
  actor.setMapper(mapper)
  actor.getProperty().setOpacity(opacity)
  // actor.set({ typeId: type, num: toothNoStr }, true);

  actor.getProperty().setColor(1, 0, 0)

  renderer.addActor(actor)
  return actor
}

// 使用bounds剪切并计算
export const clipBounds = (bds: number[], view3D: any) => {
  bds = [
    bds[0] - 10,
    bds[1] + 10,
    bds[2] - 10,
    bds[3] + 10,
    bds[4] - 10,
    bds[5] + 10,
  ]
  // 体数据根据平面做裁剪
  const planes = [
    // 上下
    {
      center: [(bds[0] + bds[1]) / 2, (bds[2] + bds[3]) / 2, bds[4]],
      normal: [0, 0, 1],
    },
    {
      center: [(bds[0] + bds[1]) / 2, (bds[2] + bds[3]) / 2, bds[5]],
      normal: [0, 0, -1],
    },
    // 左右
    {
      center: [bds[0], (bds[2] + bds[3]) / 2, (bds[4] + bds[5]) / 2],
      normal: [1, 0, 0],
    },
    {
      center: [bds[1], (bds[2] + bds[3]) / 2, (bds[4] + bds[5]) / 2],
      normal: [-1, 0, 0],
    },
    // 前后
    {
      center: [(bds[0] + bds[1]) / 2, bds[2], (bds[4] + bds[5]) / 2],
      normal: [0, 1, 0],
    },
    {
      center: [(bds[0] + bds[1]) / 2, bds[3], (bds[4] + bds[5]) / 2],
      normal: [0, -1, 0],
    },
  ]

  // // 清除之前的裁剪
  // view3D.mapper.removeAllClippingPlanes()

  // 添加裁剪
  planes.forEach(plane => {
    const clipPlane1 = vtkPlane.newInstance()
    clipPlane1.setOrigin(plane.center)
    clipPlane1.setNormal(...plane.normal)
    view3D.mapper.addClippingPlane(clipPlane1)
  })

  const center = [
    (bds[0] + bds[1]) / 2,
    (bds[2] + bds[3]) / 2,
    (bds[4] + bds[5]) / 2,
  ]
  return { center, bounds: bds }
}
