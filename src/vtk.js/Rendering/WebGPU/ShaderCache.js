import { m as macro } from '../../macros2.js';
import vtkWebGPUShaderModule from './ShaderModule.js';

// perform in place string substitutions, indicate if a substitution was done
// this is useful for building up shader strings which typically involve
// lots of string substitutions. Return true if a substitution was done.
function substitute(source, search, replace) {
  let all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const replaceStr = Array.isArray(replace) ? replace.join('\n') : replace;
  let replaced = false;
  if (source.search(search) !== -1) {
    replaced = true;
  }
  let gflag = '';
  if (all) {
    gflag = 'g';
  }
  const regex = new RegExp(search, gflag);
  const resultstr = source.replace(regex, replaceStr);
  return {
    replace: replaced,
    result: resultstr
  };
}

// ----------------------------------------------------------------------------
// vtkWebGPUShaderCache methods
// ----------------------------------------------------------------------------

function vtkWebGPUShaderCache(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkWebGPUShaderCache');
  publicAPI.getShaderModule = shaderDesc => {
    // has it already been created?
    const sType = shaderDesc.getType();
    const sHash = shaderDesc.getHash();
    const keys = model._shaderModules.keys();
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key.getHash() === sHash && key.getType() === sType) {
        return model._shaderModules.get(key);
      }
    }

    // console.log(JSON.stringify(shaderDesc));

    const sm = vtkWebGPUShaderModule.newInstance();
    sm.initialize(model.device, shaderDesc);
    model._shaderModules.set(shaderDesc, sm);
    return sm;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  shaderModules: null,
  device: null,
  window: null
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Internal objects
  model._shaderModules = new Map();

  // Build VTK API
  macro.obj(publicAPI, model);
  macro.setGet(publicAPI, model, ['device', 'window']);

  // Object methods
  vtkWebGPUShaderCache(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkWebGPUShaderCache');

// ----------------------------------------------------------------------------

var vtkWebGPUShaderCache$1 = {
  newInstance,
  extend,
  substitute
};

export { vtkWebGPUShaderCache$1 as default, extend, newInstance };
