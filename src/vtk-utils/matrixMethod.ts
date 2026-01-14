import type { mat4 } from 'gl-matrix'

// 将四元数转换为旋转矩阵
export const quaternionToMatrix = (stepObj: any) => {
  const { s, v } = stepObj.orientation
  const { x: qx, y: qy, z: qz } = v

  // 四元数转旋转矩阵
  const rotationMatrix: mat4 = [
    1 - 2 * (qy * qy + qz * qz),
    2 * (qx * qy + s * qz),
    2 * (qx * qz - s * qy),
    0,
    2 * (qx * qy - s * qz),
    1 - 2 * (qx * qx + qz * qz),
    2 * (qy * qz + s * qx),
    0,
    2 * (qx * qz + s * qy),
    2 * (qy * qz - s * qx),
    1 - 2 * (qx * qx + qy * qy),
    0,
    stepObj.position.x,
    stepObj.position.y,
    stepObj.position.z,
    1,
  ]
  return rotationMatrix
}

export const AxisToMatrix = ({
  Axis,
  position,
}: {
  Axis: any[]
  position: any
}) => {
  // Axis 数组作为旋转矩阵的列向量
  return [
    Axis[0].x, Axis[1].x, Axis[2].x, 0,
    Axis[0].y, Axis[1].y, Axis[2].y, 0,
    Axis[0].z, Axis[1].z, Axis[2].z, 0,
    position.x, position.y, position.z, 1,
  ] as mat4
}
