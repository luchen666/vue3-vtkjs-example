import vtkOBBTree from '@kitware/vtk.js/Filters/General/OBBTree'
import type vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData'
import {
  add,
  distance2BetweenPoints,
  multiplyScalar,
  normalize,
  subtract,
} from '@kitware/vtk.js/Common/Core/Math'
import type { Vector3 } from '@kitware/vtk.js/types'
import vtkLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/LineWidget'

// 获取两点中点
export function getMiddlePoint(p1, p2): Vector3 {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2]
}

export type IToothMOBBTO =
  | {
      longestEdgeLength: number
      origin: {
        p1: Vector3
        p2: Vector3
      }
      obb: vtkOBBTree
      vertexes: number[][]
      vertex0124: Vector3[]
      shortestEdge: {
        p1: Vector3
        p3: Vector3
        shortestIndexOfVertex: number
      }
      longestIndexOfVertex: number
    }
  | {}

// obbTree缓存
export const toothModelOBBTVessel = {} as Record<string, IToothMOBBTO>

// 通过最小包围盒，计算牙长轴
export function calcLongestAxis(pyd: vtkPolyData): IToothMOBBTO {
  // 使用obbtree包裹牙体
  const obbTree = vtkOBBTree.newInstance()
  obbTree.setDataset(pyd)
  obbTree.buildLocator()
  const obb = obbTree.generateRepresentation(0)
  const pointAry = obb.getPoints().getData()
  if (!pointAry.length) {
    return {}
  }
  // 获取顶点0、1、2、4
  const vertex0124: Vector3[] = []
  for (let index = 0; index < 15; index = index + 3) {
    if (index === 9) {
      // 顶点3的坐标不处理
      continue
    }
    vertex0124.push([pointAry[index], pointAry[index + 1], pointAry[index + 2]])
  }
  // 获取所有顶点
  const vertexes = []
  for (let index = 0; index < pointAry.length; index = index + 3) {
    vertexes.push([pointAry[index], pointAry[index + 1], pointAry[index + 2]])
  }
  // 获取三个边长
  const edgeLengthList = [
    Math.sqrt(distance2BetweenPoints(vertex0124[0], vertex0124[1])),
    Math.sqrt(distance2BetweenPoints(vertex0124[0], vertex0124[2])),
    Math.sqrt(distance2BetweenPoints(vertex0124[0], vertex0124[3])),
  ]
  // 找到一个最长长轴索引 // 暂时不考虑为正方体的 情况
  const longestIndexOfEdge = edgeLengthList.reduce(
    (pre: number, cur: number, index: number) => {
      if (index === 0) {
        return pre
      }
      return edgeLengthList[pre] > cur ? pre : index
    },
    0,
  )
  const shortestIndexOfEdge = edgeLengthList.reduce(
    (pre: number, cur: number, index: number) => {
      if (index === 0) {
        return pre
      }
      return edgeLengthList[pre] < cur ? pre : index
    },
    0,
  )
  // 计算最长长轴的单位方向向量
  const directionOfLongestEdge = [] as any
  subtract(
    vertex0124[0],
    vertex0124[longestIndexOfEdge + 1],
    directionOfLongestEdge,
  )
  // 记录最长长轴长度
  const longestEdgeLength = normalize(directionOfLongestEdge)
  // 对中心点按照最长长轴的1.2倍来绘制牙长轴
  // 正方向向量
  const offsetVector = multiplyScalar(
    directionOfLongestEdge,
    longestEdgeLength * 0.5,
  )
  // 负方向向量
  const counterOffsetVector = [] as any
  subtract([0, 0, 0], offsetVector, counterOffsetVector)
  // // 计算中心点
  const obbTreeOrigin = getMiddlePoint(vertex0124[0], [
    pointAry[21],
    pointAry[22],
    pointAry[23],
  ])
  const p1: Vector3 = [...obbTreeOrigin]
  const p2: Vector3 = [...obbTreeOrigin]
  // 平移点到正方向坐标
  add(p1, offsetVector, p1)
  // 平移点到负方向坐标
  add(p2, counterOffsetVector, p2)
  // obbTree.delete();
  const local2GlobalVertex: { [key: number]: number } = {
    0: 1,
    1: 2,
    2: 4,
  }
  return {
    longestEdgeLength,
    origin: { p1, p2 },
    obb,
    vertexes,
    vertex0124,
    shortestEdge: {
      p1,
      p3: vertex0124[shortestIndexOfEdge + 1],
      // todo feat 映射
      shortestIndexOfVertex: local2GlobalVertex[shortestIndexOfEdge],
    },
    longestIndexOfVertex: local2GlobalVertex[longestIndexOfEdge],
  }
}

// 绘制3d两点长轴
export const init3dLineWidget = (
  origin: { p1: Vector3; p2: Vector3 },
  obj: any,
  colorAry = [0.25, 0.41, 1], // 淡蓝色
) => {
  // 绘制两个点间的直线
  const perpendicularWidget = vtkLineWidget.newInstance()
  const perpendicularViewWidget =
    obj.widgetManager.addWidget(perpendicularWidget)
  perpendicularViewWidget?.setDragable(false)
  const representations = perpendicularViewWidget.getRepresentations()
  representations.forEach(async (r: any) => {
    if (r.getClassName() === 'vtkPolyLineRepresentation') {
      r?.getActors()[0]?.getProperty()?.setColor(colorAry)
    }
  })
  const widgetStateP = perpendicularViewWidget?.getWidgetState()
  widgetStateP?.getHandle1().setScale1(0)
  widgetStateP?.getHandle2().setScale1(0)
  widgetStateP?.getHandle1().setOrigin(origin.p1)
  widgetStateP?.getHandle2().setOrigin(origin.p2)
  return perpendicularViewWidget
}
