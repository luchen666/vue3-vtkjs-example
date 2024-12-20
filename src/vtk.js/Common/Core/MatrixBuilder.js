import { mat4, glMatrix, vec3 } from 'gl-matrix';
import { a as areMatricesEqual } from './Math/index.js';
import { IDENTITY } from './Math/Constants.js';

const NoOp = v => v;
const EPSILON = 1e-6;
class Transform {
  constructor() {
    let useDegree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.matrix = mat4.identity(new Float64Array(16));
    this.tmp = new Float64Array(3);
    this.angleConv = useDegree ? glMatrix.toRadian : NoOp;
  }
  rotateFromDirections(originDirection, targetDirection) {
    const src = new Float64Array(3);
    const dst = new Float64Array(3);
    const transf = new Float64Array(16);
    vec3.set(src, originDirection[0], originDirection[1], originDirection[2]);
    vec3.set(dst, targetDirection[0], targetDirection[1], targetDirection[2]);
    vec3.normalize(src, src);
    vec3.normalize(dst, dst);
    const cosAlpha = vec3.dot(src, dst);
    if (cosAlpha >= 1) {
      return this;
    }
    vec3.cross(this.tmp, src, dst);
    if (vec3.length(this.tmp) < EPSILON) {
      // cross product is 0, so pick arbitrary axis perpendicular
      // to originDirection.
      vec3.cross(this.tmp, [1, 0, 0], originDirection);
      if (vec3.length(this.tmp) < EPSILON) {
        vec3.cross(this.tmp, [0, 1, 0], originDirection);
      }
    }
    mat4.fromRotation(transf, Math.acos(cosAlpha), this.tmp);
    mat4.multiply(this.matrix, this.matrix, transf);
    return this;
  }
  rotate(angle, axis) {
    vec3.set(this.tmp, ...axis);
    vec3.normalize(this.tmp, this.tmp);
    mat4.rotate(this.matrix, this.matrix, this.angleConv(angle), this.tmp);
    return this;
  }
  rotateX(angle) {
    mat4.rotateX(this.matrix, this.matrix, this.angleConv(angle));
    return this;
  }
  rotateY(angle) {
    mat4.rotateY(this.matrix, this.matrix, this.angleConv(angle));
    return this;
  }
  rotateZ(angle) {
    mat4.rotateZ(this.matrix, this.matrix, this.angleConv(angle));
    return this;
  }
  translate(x, y, z) {
    vec3.set(this.tmp, x, y, z);
    mat4.translate(this.matrix, this.matrix, this.tmp);
    return this;
  }
  scale(sx, sy, sz) {
    vec3.set(this.tmp, sx, sy, sz);
    mat4.scale(this.matrix, this.matrix, this.tmp);
    return this;
  }
  multiply(mat4x4) {
    mat4.multiply(this.matrix, this.matrix, mat4x4);
    return this;
  }
  multiply3x3(mat3x3) {
    mat4.multiply(this.matrix, this.matrix, [mat3x3[0], mat3x3[1], mat3x3[2], 0, mat3x3[3], mat3x3[4], mat3x3[5], 0, mat3x3[6], mat3x3[7], mat3x3[8], 0, 0, 0, 0, 1]);
    return this;
  }
  invert() {
    mat4.invert(this.matrix, this.matrix);
    return this;
  }
  identity() {
    mat4.identity(this.matrix);
    return this;
  }

  //-----------

  apply(typedArray) {
    let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let nbIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    if (areMatricesEqual(IDENTITY, this.matrix)) {
      // Make sure we can chain apply...
      return this;
    }
    const size = nbIterations === -1 ? typedArray.length : offset + nbIterations * 3;
    for (let i = offset; i < size; i += 3) {
      vec3.set(this.tmp, typedArray[i], typedArray[i + 1], typedArray[i + 2]);
      vec3.transformMat4(this.tmp, this.tmp, this.matrix);
      typedArray[i] = this.tmp[0];
      typedArray[i + 1] = this.tmp[1];
      typedArray[i + 2] = this.tmp[2];
    }

    // Make sure we can chain apply...
    return this;
  }
  getMatrix() {
    return this.matrix;
  }
  setMatrix(mat4x4) {
    if (!!mat4x4 && mat4x4.length === 16) {
      mat4.copy(this.matrix, mat4x4);
    }
    return this;
  }
}
function buildFromDegree() {
  return new Transform(true);
}
function buildFromRadian() {
  return new Transform(false);
}
var vtkMatrixBuilder = {
  buildFromDegree,
  buildFromRadian
};

export { vtkMatrixBuilder as default };
