import { m as macro } from '../../macros2.js';
import vtkFieldData from './DataSetAttributes/FieldData.js';
import Constants from './DataSetAttributes/Constants.js';
import vtkDataArray from '../Core/DataArray.js';

const {
  AttributeTypes,
  AttributeCopyOperations
} = Constants;
const {
  vtkWarningMacro
} = macro;

// ----------------------------------------------------------------------------
// vtkDataSetAttributes methods
// ----------------------------------------------------------------------------

function vtkDataSetAttributes(publicAPI, model) {
  const attrTypes = ['Scalars', 'Vectors', 'Normals', 'TCoords', 'Tensors', 'GlobalIds', 'PedigreeIds'];
  function cleanAttributeType(attType) {
    // Given an integer or string, convert the result to one of the
    // strings in the "attrTypes" array above or null (if
    // no match is found)
    let cleanAttType = attrTypes.find(ee => AttributeTypes[ee.toUpperCase()] === attType || typeof attType !== 'number' && ee.toLowerCase() === attType.toLowerCase());
    if (typeof cleanAttType === 'undefined') {
      cleanAttType = null;
    }
    return cleanAttType;
  }

  // Set our className
  model.classHierarchy.push('vtkDataSetAttributes');
  const superClass = {
    ...publicAPI
  };
  publicAPI.checkNumberOfComponents = x => true; // TODO

  publicAPI.setAttribute = (arr, uncleanAttType) => {
    const attType = cleanAttributeType(uncleanAttType);
    if (arr && attType.toUpperCase() === 'PEDIGREEIDS' && !arr.isA('vtkDataArray')) {
      vtkWarningMacro(`Cannot set attribute ${attType}. The attribute must be a vtkDataArray.`);
      return -1;
    }
    if (arr && !publicAPI.checkNumberOfComponents(arr, attType)) {
      vtkWarningMacro(`Cannot set attribute ${attType}. Incorrect number of components.`);
      return -1;
    }
    let currentAttribute = model[`active${attType}`];
    if (currentAttribute >= 0 && currentAttribute < model.arrays.length) {
      if (model.arrays[currentAttribute] === arr) {
        return currentAttribute;
      }
      // FIXME setting an array actually changes its index
      publicAPI.removeArrayByIndex(currentAttribute);
    }
    if (arr) {
      currentAttribute = publicAPI.addArray(arr);
      model[`active${attType}`] = currentAttribute;
    } else {
      model[`active${attType}`] = -1;
    }
    publicAPI.modified();
    return model[`active${attType}`];
  };
  publicAPI.getAttributes = arr => attrTypes.filter(attrType => publicAPI[`get${attrType}`]() === arr);
  publicAPI.setActiveAttributeByName = (arrayName, attType) => publicAPI.setActiveAttributeByIndex(publicAPI.getArrayWithIndex(arrayName).index, attType);
  publicAPI.setActiveAttributeByIndex = (arrayIdx, uncleanAttType) => {
    const attType = cleanAttributeType(uncleanAttType);
    if (arrayIdx >= 0 && arrayIdx < model.arrays.length) {
      if (attType.toUpperCase() !== 'PEDIGREEIDS') {
        const arr = publicAPI.getArrayByIndex(arrayIdx);
        if (!arr.isA('vtkDataArray')) {
          vtkWarningMacro(`Cannot set attribute ${attType}. Only vtkDataArray subclasses can be set as active attributes.`);
          return -1;
        }
        if (!publicAPI.checkNumberOfComponents(arr, attType)) {
          vtkWarningMacro(`Cannot set attribute ${attType}. Incorrect number of components.`);
          return -1;
        }
      }
      model[`active${attType}`] = arrayIdx;
      publicAPI.modified();
      return arrayIdx;
    }
    if (arrayIdx === -1) {
      model[`active${attType}`] = arrayIdx;
      publicAPI.modified();
    }
    return -1;
  };
  publicAPI.getActiveAttribute = attType => {
    // Given an integer enum value or a string (with random capitalization),
    // find the matching string in attrTypes.
    const cleanAttType = cleanAttributeType(attType);
    return publicAPI[`get${cleanAttType}`]();
  };

  // Override to allow proper handling of active attributes
  publicAPI.removeAllArrays = () => {
    attrTypes.forEach(attType => {
      model[`active${attType}`] = -1;
    });
    superClass.removeAllArrays();
  };

  // Override to allow proper handling of active attributes
  publicAPI.removeArrayByIndex = arrayIdx => {
    if (arrayIdx !== -1) {
      attrTypes.forEach(attType => {
        if (arrayIdx === model[`active${attType}`]) {
          model[`active${attType}`] = -1;
        } else if (arrayIdx < model[`active${attType}`]) {
          model[`active${attType}`] -= 1;
        }
      });
    }
    return superClass.removeArrayByIndex(arrayIdx);
  };
  attrTypes.forEach(value => {
    const activeVal = `active${value}`;
    publicAPI[`get${value}`] = () => publicAPI.getArrayByIndex(model[activeVal]);
    publicAPI[`set${value}`] = da => publicAPI.setAttribute(da, value);
    publicAPI[`setActive${value}`] = arrayName => publicAPI.setActiveAttributeByIndex(publicAPI.getArrayWithIndex(arrayName).index, value);
    publicAPI[`copy${value}Off`] = () => {
      const attType = value.toUpperCase();
      model.copyAttributeFlags[AttributeCopyOperations.PASSDATA][AttributeTypes[attType]] = false;
    };
    publicAPI[`copy${value}On`] = () => {
      const attType = value.toUpperCase();
      model.copyAttributeFlags[AttributeCopyOperations.PASSDATA][AttributeTypes[attType]] = true;
    };
  });
  publicAPI.initializeAttributeCopyFlags = () => {
    // Default to copying all attributes in every circumstance:
    model.copyAttributeFlags = [];
    Object.keys(AttributeCopyOperations).filter(op => op !== 'ALLCOPY').forEach(attCopyOp => {
      model.copyAttributeFlags[AttributeCopyOperations[attCopyOp]] = Object.keys(AttributeTypes).filter(ty => ty !== 'NUM_ATTRIBUTES').reduce((a, b) => {
        a[AttributeTypes[b]] = true;
        return a;
      }, []);
    });
    // Override some operations where we don't want to copy:
    model.copyAttributeFlags[AttributeCopyOperations.COPYTUPLE][AttributeTypes.GLOBALIDS] = false;
    model.copyAttributeFlags[AttributeCopyOperations.INTERPOLATE][AttributeTypes.GLOBALIDS] = false;
    model.copyAttributeFlags[AttributeCopyOperations.COPYTUPLE][AttributeTypes.PEDIGREEIDS] = false;
  };
  publicAPI.initialize = macro.chain(publicAPI.initialize, publicAPI.initializeAttributeCopyFlags);

  // Process dataArrays if any
  if (model.dataArrays && Object.keys(model.dataArrays).length) {
    Object.keys(model.dataArrays).forEach(name => {
      if (!model.dataArrays[name].ref && model.dataArrays[name].type === 'vtkDataArray') {
        publicAPI.addArray(vtkDataArray.newInstance(model.dataArrays[name]));
      }
    });
  }
  const superShallowCopy = publicAPI.shallowCopy;
  publicAPI.shallowCopy = (other, debug) => {
    superShallowCopy(other, debug);
    model.arrays = other.getArrays().map(arr => {
      const arrNew = arr.newClone();
      arrNew.shallowCopy(arr, debug);
      return {
        data: arrNew
      };
    });
  };
  publicAPI.initializeAttributeCopyFlags();
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  activeScalars: -1,
  activeVectors: -1,
  activeTensors: -1,
  activeNormals: -1,
  activeTCoords: -1,
  activeGlobalIds: -1,
  activePedigreeIds: -1
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Object methods
  vtkFieldData.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['activeScalars', 'activeNormals', 'activeTCoords', 'activeVectors', 'activeTensors', 'activeGlobalIds', 'activePedigreeIds']);
  if (!model.arrays) {
    model.arrays = {};
  }

  // Object specific methods
  vtkDataSetAttributes(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkDataSetAttributes');

// ----------------------------------------------------------------------------

var vtkDataSetAttributes$1 = {
  newInstance,
  extend,
  ...Constants
};

export { vtkDataSetAttributes$1 as default, extend, newInstance };
