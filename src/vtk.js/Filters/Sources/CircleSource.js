import { m as macro } from '../../macros2.js';
import vtkPolyData from '../../Common/DataModel/PolyData.js';
import vtkMatrixBuilder from '../../Common/Core/MatrixBuilder.js';
import { w as multiplyScalar } from '../../Common/Core/Math/index.js';

// ----------------------------------------------------------------------------
// vtkCircleSource methods
// ----------------------------------------------------------------------------

function vtkCircleSource(publicAPI, model) {
  // Set our classname
  model.classHierarchy.push('vtkCircleSource');
  function requestData(inData, outData) {
    if (model.deleted) {
      return;
    }
    let dataset = outData[0];

    // Points
    const points = macro.newTypedArray(model.pointType, model.resolution * 3);

    // Lines/cells
    // [# of points in line, vert_index_0, vert_index_1, ..., vert_index_0]
    const edges = new Uint32Array(model.resolution + 2);
    edges[0] = model.resolution + 1;

    // generate polydata
    const angle = 2.0 * Math.PI / model.resolution;
    for (let i = 0; i < model.resolution; i++) {
      const x = model.center[0];
      const y = model.radius * Math.cos(i * angle) + model.center[1];
      const z = model.radius * Math.sin(i * angle) + model.center[2];
      points.set([x, y, z], i * 3);
      edges[i + 1] = i;
    }

    // connect endpoints
    edges[edges.length - 1] = edges[1];
    dataset = vtkPolyData.newInstance();
    dataset.getPoints().setData(points, 3);
    if (model.lines) {
      dataset.getLines().setData(edges, 1);
    }
    if (model.face) {
      dataset.getPolys().setData(edges, 1);
    }

    // translate an eventual center different to [0, 0, 0] to ensure rotation is correct
    vtkMatrixBuilder.buildFromRadian().translate(...model.center).rotateFromDirections([1, 0, 0], model.direction).translate(...multiplyScalar([...model.center], -1)).apply(points);

    // Update output
    outData[0] = dataset;
  }

  // Expose methods
  publicAPI.requestData = requestData;
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

function defaultValues(initialValues) {
  return {
    face: true,
    center: [0, 0, 0],
    lines: false,
    direction: [1, 0, 0],
    pointType: 'Float64Array',
    radius: 1.0,
    resolution: 6,
    ...initialValues
  };
}

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, defaultValues(initialValues));

  // Build VTK API
  macro.obj(publicAPI, model);
  macro.setGet(publicAPI, model, ['radius', 'resolution', 'lines', 'face']);
  macro.setGetArray(publicAPI, model, ['center', 'direction'], 3);
  macro.algo(publicAPI, model, 0, 1);
  vtkCircleSource(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkCircleSource');

// ----------------------------------------------------------------------------

var vtkCircleSource$1 = {
  newInstance,
  extend
};

export { vtkCircleSource$1 as default, extend, newInstance };
