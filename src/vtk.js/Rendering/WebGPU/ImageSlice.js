import { mat4 } from 'gl-matrix';
import { n as newInstance$1, o as obj, g as get } from '../../macros2.js';
import vtkViewNode from '../SceneGraph/ViewNode.js';
import { registerOverride } from './ViewNodeFactory.js';

// ----------------------------------------------------------------------------
// vtkWebGPUImageSlice methods
// ----------------------------------------------------------------------------

function vtkWebGPUImageSlice(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkWebGPUImageSlice');

  // Builds myself.
  publicAPI.buildPass = prepass => {
    if (!model.renderable || !model.renderable.getVisibility()) {
      return;
    }
    if (prepass) {
      if (!model.renderable) {
        return;
      }
      model.WebGPURenderer = publicAPI.getFirstAncestorOfType('vtkWebGPURenderer');
      model.WebGPURenderWindow = model.WebGPURenderer.getFirstAncestorOfType('vtkWebGPURenderWindow');
      if (model.propID === undefined) {
        model.propID = model.WebGPURenderWindow.getUniquePropID();
      }
      publicAPI.prepareNodes();
      publicAPI.addMissingNode(model.renderable.getMapper());
      publicAPI.removeUnusedNodes();
    }
  };

  // we draw textures, then mapper, then post pass textures
  publicAPI.traverseOpaquePass = renderPass => {
    if (!model.renderable || !model.renderable.getNestedVisibility() || !model.renderable.getIsOpaque() || model.WebGPURenderer.getSelector() && !model.renderable.getNestedPickable()) {
      return;
    }
    publicAPI.apply(renderPass, true);
    model.children.forEach(child => {
      child.traverse(renderPass);
    });
    publicAPI.apply(renderPass, false);
  };
  publicAPI.traverseTranslucentPass = renderPass => {
    if (!model.renderable || !model.renderable.getNestedVisibility() || model.renderable.getIsOpaque() || model.WebGPURenderer.getSelector() && !model.renderable.getNestedPickable()) {
      return;
    }
    publicAPI.apply(renderPass, true);
    model.children.forEach(child => {
      child.traverse(renderPass);
    });
    publicAPI.apply(renderPass, false);
  };
  publicAPI.queryPass = (prepass, renderPass) => {
    if (prepass) {
      if (!model.renderable || !model.renderable.getVisibility()) {
        return;
      }
      if (model.renderable.getIsOpaque()) {
        renderPass.incrementOpaqueActorCount();
      } else {
        renderPass.incrementTranslucentActorCount();
      }
    }
  };
  publicAPI.getBufferShift = wgpuRen => {
    publicAPI.getKeyMatrices(wgpuRen);
    return model.bufferShift;
  };
  publicAPI.getKeyMatrices = wgpuRen => {
    // has the actor or stabilization center changed?
    if (Math.max(model.renderable.getMTime(), wgpuRen.getStabilizedTime()) > model.keyMatricesTime.getMTime()) {
      model.renderable.computeMatrix();
      const mcwc = model.renderable.getMatrix();

      // compute the net shift
      const center = wgpuRen.getStabilizedCenterByReference();
      model.bufferShift[0] = mcwc[3] - center[0];
      model.bufferShift[1] = mcwc[7] - center[1];
      model.bufferShift[2] = mcwc[11] - center[2];
      mat4.transpose(model.keyMatrices.bcwc, mcwc);
      if (model.renderable.getIsIdentity()) {
        mat4.identity(model.keyMatrices.normalMatrix);
      } else {
        // we use bcwc BEFORE the translate below (just to get transposed mcvc)
        mat4.copy(model.keyMatrices.normalMatrix, model.keyMatrices.bcwc);
        // zero out translation
        model.keyMatrices.normalMatrix[3] = 0.0;
        model.keyMatrices.normalMatrix[7] = 0.0;
        model.keyMatrices.normalMatrix[11] = 0.0;
        mat4.invert(model.keyMatrices.normalMatrix, model.keyMatrices.normalMatrix);
        mat4.transpose(model.keyMatrices.normalMatrix, model.keyMatrices.normalMatrix);
      }

      // only meed the buffer shift to get to world
      mat4.translate(model.keyMatrices.bcwc, model.keyMatrices.bcwc, [-model.bufferShift[0], -model.bufferShift[1], -model.bufferShift[2]]);

      // to get to stabilized we also need the center
      mat4.translate(model.keyMatrices.bcsc, model.keyMatrices.bcwc, [-center[0], -center[1], -center[2]]);
      model.keyMatricesTime.modified();
    }
    return model.keyMatrices;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  bufferShift: undefined,
  keyMatrixTime: null,
  keyMatrices: null,
  propID: undefined
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkViewNode.extend(publicAPI, model, initialValues);
  model.keyMatricesTime = {};
  obj(model.keyMatricesTime, {
    mtime: 0
  });
  model.keyMatrices = {
    normalMatrix: new Float64Array(16),
    bcwc: new Float64Array(16),
    bcsc: new Float64Array(16)
  };
  model.keyMatrixTime = {};
  obj(model.keyMatrixTime, {
    mtime: 0
  });
  model.keyMatrices = {
    mcwc: mat4.identity(new Float64Array(16))
  };
  model.bufferShift = [0, 0, 0, 0];
  get(publicAPI, model, ['propID', 'keyMatricesTime']);

  // Object methods
  vtkWebGPUImageSlice(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = newInstance$1(extend, 'vtkWebGPUImageSlice');

// ----------------------------------------------------------------------------

var index = {
  newInstance,
  extend
};

// Register ourself to WebGPU backend if imported
registerOverride('vtkImageSlice', newInstance);

export { index as default, extend, newInstance };
