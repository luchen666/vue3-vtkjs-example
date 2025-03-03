const DataTypeByteSize = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
const VtkDataTypes = {
  VOID: '',
  // not sure to know what that should be
  CHAR: 'Int8Array',
  SIGNED_CHAR: 'Int8Array',
  UNSIGNED_CHAR: 'Uint8Array',
  UNSIGNED_CHAR_CLAMPED: 'Uint8ClampedArray',
  // should be used for VTK.js internal purpose only
  SHORT: 'Int16Array',
  UNSIGNED_SHORT: 'Uint16Array',
  INT: 'Int32Array',
  UNSIGNED_INT: 'Uint32Array',
  FLOAT: 'Float32Array',
  DOUBLE: 'Float64Array'
};
const DefaultDataType = VtkDataTypes.FLOAT;
var Constants = {
  DefaultDataType,
  DataTypeByteSize,
  VtkDataTypes
};

export { DataTypeByteSize, DefaultDataType, VtkDataTypes, Constants as default };
