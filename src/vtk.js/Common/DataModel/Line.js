import { m as macro } from '../../macros2.js';
import Constants from './Line/Constants.js';
import vtkCell from './Cell.js';
import { d as dot, e as distance2BetweenPoints, s as subtract, g as solveLinearSystem } from '../Core/Math/index.js';
import { quat } from 'gl-matrix';

const {
  IntersectionState
} = Constants;

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------
function distanceToLine(x, p1, p2) {
  let closestPoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  const outObj = {
    t: Number.MIN_VALUE,
    distance: 0
  };
  const p21 = [];
  let closest;
  // Determine appropriate vector
  p21[0] = p2[0] - p1[0];
  p21[1] = p2[1] - p1[1];
  p21[2] = p2[2] - p1[2];

  // Get parametric location
  const num = p21[0] * (x[0] - p1[0]) + p21[1] * (x[1] - p1[1]) + p21[2] * (x[2] - p1[2]);
  const denom = dot(p21, p21);

  // trying to avoid an expensive fabs
  let tolerance = 1e-5 * num;
  if (denom !== 0.0) {
    outObj.t = num / denom;
  }
  if (tolerance < 0.0) {
    tolerance = -tolerance;
  }
  if (-tolerance < denom && denom < tolerance) {
    closest = p1;
  } else if (denom <= 0.0 || outObj.t < 0.0) {
    // If parametric coordinate is within 0<=p<=1, then the point is closest to
    // the line.  Otherwise, it's closest to a point at the end of the line.
    closest = p1;
  } else if (outObj.t > 1.0) {
    closest = p2;
  } else {
    closest = p21;
    p21[0] = p1[0] + outObj.t * p21[0];
    p21[1] = p1[1] + outObj.t * p21[1];
    p21[2] = p1[2] + outObj.t * p21[2];
  }
  if (closestPoint) {
    closestPoint[0] = closest[0];
    closestPoint[1] = closest[1];
    closestPoint[2] = closest[2];
  }
  outObj.distance = distance2BetweenPoints(closest, x);
  return outObj;
}
function intersection(a1, a2, b1, b2, u, v) {
  const a21 = [];
  const b21 = [];
  const b1a1 = [];
  u[0] = 0.0;
  v[0] = 0.0;

  // Determine line vectors.
  subtract(a2, a1, a21);
  subtract(b2, b1, b21);
  subtract(b1, a1, b1a1);

  // Compute the system (least squares) matrix.
  const A = [dot(a21, a21), -dot(a21, b21), -dot(a21, b21), dot(b21, b21)];

  // Compute the least squares system constant term.
  const c = [];
  c[0] = dot(a21, b1a1);
  c[1] = -dot(b21, b1a1);
  // Solve the system of equations
  if (solveLinearSystem(A, c, 2) === 0) {
    // The lines are colinear. Therefore, one of the four endpoints is the
    // point of closest approach
    let minDist = Number.MAX_VALUE;
    const p = [a1, a2, b1, b2];
    const l1 = [b1, b1, a1, a1];
    const l2 = [b2, b2, a2, a2];
    [v[0], v[0], u[0], u[0]];
    [u[0], u[0], v[0], v[0]];
    let obj;
    for (let i = 0; i < 4; i++) {
      obj = distanceToLine(p[i], l1[i], l2[i]);
      if (obj.distance < minDist) {
        minDist = obj.distance;
      }
    }
    return IntersectionState.ON_LINE;
  }
  u[0] = c[0];
  v[0] = c[1];

  // Check parametric coordinates for intersection.
  if (u[0] >= 0.0 && u[0] <= 1.0 && v[0] >= 0.0 && v[0] <= 1.0) {
    return IntersectionState.YES_INTERSECTION;
  }
  return IntersectionState.NO_INTERSECTION;
}

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

const STATIC = {
  distanceToLine,
  intersection
};

// ----------------------------------------------------------------------------
// vtkLine methods
// ----------------------------------------------------------------------------

function vtkLine(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkLine');
  function isBetweenPoints(t) {
    return t >= 0.0 && t <= 1.0;
  }
  publicAPI.getCellDimension = () => 1;
  publicAPI.intersectWithLine = (p1, p2, tol, x, pcoords) => {
    const outObj = {
      intersect: 0,
      t: Number.MAX_VALUE,
      subId: 0,
      betweenPoints: null
    };
    pcoords[1] = 0.0;
    pcoords[2] = 0.0;
    const projXYZ = [];
    const a1 = [];
    const a2 = [];
    model.points.getPoint(0, a1);
    model.points.getPoint(1, a2);
    const u = [];
    const v = [];
    const intersect = intersection(p1, p2, a1, a2, u, v);
    outObj.t = u[0];
    outObj.betweenPoints = isBetweenPoints(outObj.t);
    pcoords[0] = v[0];
    if (intersect === IntersectionState.YES_INTERSECTION) {
      // make sure we are within tolerance
      for (let i = 0; i < 3; i++) {
        x[i] = a1[i] + pcoords[0] * (a2[i] - a1[i]);
        projXYZ[i] = p1[i] + outObj.t * (p2[i] - p1[i]);
      }
      if (distance2BetweenPoints(x, projXYZ) <= tol * tol) {
        outObj.intersect = 1;
        return outObj;
      }
    } else {
      let outDistance;
      // check to see if it lies within tolerance
      // one of the parametric coords must be outside 0-1
      if (outObj.t < 0.0) {
        outDistance = distanceToLine(p1, a1, a2, x);
        if (outDistance.distance <= tol * tol) {
          outObj.t = 0.0;
          outObj.intersect = 1;
          outObj.betweenPoints = true; // Intersection is near p1
          return outObj;
        }
        return outObj;
      }
      if (outObj.t > 1.0) {
        outDistance = distanceToLine(p2, a1, a2, x);
        if (outDistance.distance <= tol * tol) {
          outObj.t = 1.0;
          outObj.intersect = 1;
          outObj.betweenPoints = true; // Intersection is near p2
          return outObj;
        }
        return outObj;
      }
      if (pcoords[0] < 0.0) {
        pcoords[0] = 0.0;
        outDistance = distanceToLine(a1, p1, p2, x);
        outObj.t = outDistance.t;
        if (outDistance.distance <= tol * tol) {
          outObj.intersect = 1;
          return outObj;
        }
        return outObj;
      }
      if (pcoords[0] > 1.0) {
        pcoords[0] = 1.0;
        outDistance = distanceToLine(a2, p1, p2, x);
        outObj.t = outDistance.t;
        if (outDistance.distance <= tol * tol) {
          outObj.intersect = 1;
          return outObj;
        }
        return outObj;
      }
    }
    return outObj;
  };
  publicAPI.evaluateLocation = (pcoords, x, weights) => {
    const a1 = [];
    const a2 = [];
    model.points.getPoint(0, a1);
    model.points.getPoint(1, a2);
    for (let i = 0; i < 3; i++) {
      x[i] = a1[i] + pcoords[0] * (a2[i] - a1[i]);
    }
    weights[0] = 1.0 - pcoords[0];
    weights[1] = pcoords[0];
  };
  publicAPI.evaluateOrientation = (pcoords, q, weights) => {
    if (model.orientations) {
      quat.slerp(q, model.orientations[0], model.orientations[1], pcoords[0]);
      weights[0] = 1.0 - pcoords[0];
      weights[1] = pcoords[0];
      return true;
    }
    return false;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  orientations: null // an array of two quat or null
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);
  vtkCell.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['orientations']);
  vtkLine(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkLine');

// ----------------------------------------------------------------------------

var vtkLine$1 = {
  newInstance,
  extend,
  ...STATIC,
  ...Constants
};

export { STATIC, vtkLine$1 as default, extend, newInstance };
