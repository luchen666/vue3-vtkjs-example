import { m as macro } from '../../../macros2.js';
import vtkPolyData from '../../../Common/DataModel/PolyData.js';
import vtkFieldDataSerializer from './FieldDataSerializer.js';

const CLASS_NAME = 'vtkPolyData';
const ARRAYS = ['points', 'verts', 'lines', 'polys', 'strips'];
function canSerialize(obj) {
  return obj && obj.isA && obj.isA(CLASS_NAME);
}
function canDeserialize(obj) {
  return obj && obj.vtkClass && obj.vtkClass === CLASS_NAME;
}
function serialize(obj, arrayHandler) {
  const output = {
    vtkClass: CLASS_NAME
  };
  ARRAYS.forEach(arrayName => {
    const array = obj[`get${macro.capitalize(arrayName)}`]();
    if (array && array.getNumberOfValues() > 0) {
      output[arrayName] = arrayHandler.serialize(array);
    }
  });

  // Handle fields
  output.pointData = vtkFieldDataSerializer.serialize(obj.getPointData(), arrayHandler);
  output.cellData = vtkFieldDataSerializer.serialize(obj.getCellData(), arrayHandler);
  output.fieldData = vtkFieldDataSerializer.serialize(obj.getFieldData(), arrayHandler);
  return output;
}
function deserialize(obj, arrayHandler) {
  const ds = vtkPolyData.newInstance();
  ARRAYS.forEach(arrayName => {
    ds[`set${macro.capitalize(arrayName)}`](arrayHandler.deserialize(obj[arrayName]));
  });

  // Handle fields
  ds.setPointData(vtkFieldDataSerializer.deserialize(obj.pointData, arrayHandler));
  ds.setCellData(vtkFieldDataSerializer.deserialize(obj.cellData, arrayHandler));
  ds.setFieldData(vtkFieldDataSerializer.deserialize(obj.fieldData, arrayHandler));
  return ds;
}
var vtkPolyDataSerializer = {
  canSerialize,
  serialize,
  canDeserialize,
  deserialize
};

export { vtkPolyDataSerializer as default };
