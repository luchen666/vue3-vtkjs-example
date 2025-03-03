import { m as macro } from '../../macros2.js';
import vtkImageData from '../../Common/DataModel/ImageData.js';
import vtkDataArray from '../../Common/Core/DataArray.js';

const {
  vtkErrorMacro
} = macro;

// ----------------------------------------------------------------------------
// vtkScalarToRGBA methods
// ----------------------------------------------------------------------------

function vtkScalarToRGBA(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkScalarToRGBA');
  publicAPI.requestData = (inData, outData) => {
    // implement requestData
    const input = inData[0];
    if (!input) {
      vtkErrorMacro('Invalid or missing input');
      return;
    }
    const scalars = input.getPointData().getScalars();
    if (!scalars) {
      vtkErrorMacro('No scalars from input');
      return;
    }
    if (!model.lookupTable) {
      vtkErrorMacro('No lookupTable available');
      return;
    }
    if (!model.piecewiseFunction) {
      vtkErrorMacro('No piecewiseFunction available');
      return;
    }
    const rgba = [0, 0, 0, 0];
    const data = scalars.getData();
    const rgbaArray = new Uint8ClampedArray(data.length * 4);
    let offset = 0;
    for (let idx = 0; idx < data.length; idx++) {
      const x = data[idx];
      model.lookupTable.getColor(x, rgba);
      rgba[3] = model.piecewiseFunction.getValue(x);
      rgbaArray[offset++] = 255 * rgba[0];
      rgbaArray[offset++] = 255 * rgba[1];
      rgbaArray[offset++] = 255 * rgba[2];
      rgbaArray[offset++] = 255 * rgba[3];
    }
    const colorArray = vtkDataArray.newInstance({
      name: 'rgba',
      numberOfComponents: 4,
      values: rgbaArray
    });
    const datasetDefinition = input.get('extent', 'spacing', 'origin', 'direction');
    const output = vtkImageData.newInstance(datasetDefinition);
    output.getPointData().setScalars(colorArray);
    outData[0] = output;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Make this a VTK object
  macro.obj(publicAPI, model);

  // Also make it an algorithm with one input and one output
  macro.algo(publicAPI, model, 1, 1);
  macro.setGet(publicAPI, model, ['lookupTable', 'piecewiseFunction']);

  // Object specific methods
  vtkScalarToRGBA(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkScalarToRGBA');

// ----------------------------------------------------------------------------

var vtkScalarToRGBA$1 = {
  newInstance,
  extend
};

export { vtkScalarToRGBA$1 as default, extend, newInstance };
