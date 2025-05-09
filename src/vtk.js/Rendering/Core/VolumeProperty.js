import { m as macro } from '../../macros2.js';
import vtkColorTransferFunction from './ColorTransferFunction.js';
import vtkPiecewiseFunction from '../../Common/DataModel/PiecewiseFunction.js';
import Constants from './VolumeProperty/Constants.js';

const {
  InterpolationType,
  OpacityMode
} = Constants;
const {
  vtkErrorMacro
} = macro;
const VTK_MAX_VRCOMP = 4;

// ----------------------------------------------------------------------------
// vtkVolumeProperty methods
// ----------------------------------------------------------------------------

function vtkVolumeProperty(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkVolumeProperty');
  publicAPI.getMTime = () => {
    let mTime = model.mtime;
    let time;
    for (let index = 0; index < VTK_MAX_VRCOMP; index++) {
      // Color MTimes
      if (model.componentData[index].colorChannels === 1) {
        if (model.componentData[index].grayTransferFunction) {
          // time that Gray transfer function was last modified
          time = model.componentData[index].grayTransferFunction.getMTime();
          mTime = mTime > time ? mTime : time;
        }
      } else if (model.componentData[index].colorChannels === 3) {
        if (model.componentData[index].rGBTransferFunction) {
          // time that RGB transfer function was last modified
          time = model.componentData[index].rGBTransferFunction.getMTime();
          mTime = mTime > time ? mTime : time;
        }
      }

      // Opacity MTimes
      if (model.componentData[index].scalarOpacity) {
        // time that Scalar opacity transfer function was last modified
        time = model.componentData[index].scalarOpacity.getMTime();
        mTime = mTime > time ? mTime : time;
      }
      if (model.componentData[index].gradientOpacity) {
        if (!model.componentData[index].disableGradientOpacity) {
          // time that Gradient opacity transfer function was last modified
          time = model.componentData[index].gradientOpacity.getMTime();
          mTime = mTime > time ? mTime : time;
        }
      }
    }
    return mTime;
  };
  publicAPI.getColorChannels = index => {
    if (index < 0 || index > 3) {
      vtkErrorMacro('Bad index - must be between 0 and 3');
      return 0;
    }
    return model.componentData[index].colorChannels;
  };

  // Set the color of a volume to a gray transfer function
  publicAPI.setGrayTransferFunction = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let modified = false;
    if (model.componentData[index].grayTransferFunction !== func) {
      model.componentData[index].grayTransferFunction = func;
      modified = true;
    }
    if (model.componentData[index].colorChannels !== 1) {
      model.componentData[index].colorChannels = 1;
      modified = true;
    }
    if (modified) {
      publicAPI.modified();
    }
    return modified;
  };

  // Get the currently set gray transfer function. Create one if none set.
  publicAPI.getGrayTransferFunction = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (model.componentData[index].grayTransferFunction === null) {
      model.componentData[index].grayTransferFunction = vtkPiecewiseFunction.newInstance();
      model.componentData[index].grayTransferFunction.addPoint(0, 0.0);
      model.componentData[index].grayTransferFunction.addPoint(1024, 1.0);
      if (model.componentData[index].colorChannels !== 1) {
        model.componentData[index].colorChannels = 1;
      }
      publicAPI.modified();
    }
    return model.componentData[index].grayTransferFunction;
  };

  // Set the color of a volume to an RGB transfer function
  publicAPI.setRGBTransferFunction = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let modified = false;
    if (model.componentData[index].rGBTransferFunction !== func) {
      model.componentData[index].rGBTransferFunction = func;
      modified = true;
    }
    if (model.componentData[index].colorChannels !== 3) {
      model.componentData[index].colorChannels = 3;
      modified = true;
    }
    if (modified) {
      publicAPI.modified();
    }
    return modified;
  };

  // Get the currently set RGB transfer function. Create one if none set.
  publicAPI.getRGBTransferFunction = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (model.componentData[index].rGBTransferFunction === null) {
      model.componentData[index].rGBTransferFunction = vtkColorTransferFunction.newInstance();
      model.componentData[index].rGBTransferFunction.addRGBPoint(0, 0.0, 0.0, 0.0);
      model.componentData[index].rGBTransferFunction.addRGBPoint(1024, 1.0, 1.0, 1.0);
      if (model.componentData[index].colorChannels !== 3) {
        model.componentData[index].colorChannels = 3;
      }
      publicAPI.modified();
    }
    return model.componentData[index].rGBTransferFunction;
  };

  // Set the scalar opacity of a volume to a transfer function
  publicAPI.setScalarOpacity = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (model.componentData[index].scalarOpacity !== func) {
      model.componentData[index].scalarOpacity = func;
      publicAPI.modified();
      return true;
    }
    return false;
  };

  // Get the scalar opacity transfer function. Create one if none set.
  publicAPI.getScalarOpacity = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (model.componentData[index].scalarOpacity === null) {
      model.componentData[index].scalarOpacity = vtkPiecewiseFunction.newInstance();
      model.componentData[index].scalarOpacity.addPoint(0, 1.0);
      model.componentData[index].scalarOpacity.addPoint(1024, 1.0);
      publicAPI.modified();
    }
    return model.componentData[index].scalarOpacity;
  };
  publicAPI.setComponentWeight = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (index < 0 || index >= VTK_MAX_VRCOMP) {
      vtkErrorMacro('Invalid index');
      return false;
    }
    const val = Math.min(1, Math.max(0, value));
    if (model.componentData[index].componentWeight !== val) {
      model.componentData[index].componentWeight = val;
      publicAPI.modified();
      return true;
    }
    return false;
  };
  publicAPI.getComponentWeight = function () {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (index < 0 || index >= VTK_MAX_VRCOMP) {
      vtkErrorMacro('Invalid index');
      return 0.0;
    }
    return model.componentData[index].componentWeight;
  };
  publicAPI.setInterpolationTypeToNearest = () => publicAPI.setInterpolationType(InterpolationType.NEAREST);
  publicAPI.setInterpolationTypeToLinear = () => publicAPI.setInterpolationType(InterpolationType.LINEAR);
  publicAPI.setInterpolationTypeToFastLinear = () => publicAPI.setInterpolationType(InterpolationType.FAST_LINEAR);
  publicAPI.getInterpolationTypeAsString = () => macro.enumToString(InterpolationType, model.interpolationType);
  const sets = ['useGradientOpacity', 'scalarOpacityUnitDistance', 'gradientOpacityMinimumValue', 'gradientOpacityMinimumOpacity', 'gradientOpacityMaximumValue', 'gradientOpacityMaximumOpacity', 'opacityMode', 'forceNearestInterpolation'];
  sets.forEach(val => {
    const cap = macro.capitalize(val);
    publicAPI[`set${cap}`] = (index, value) => {
      if (model.componentData[index][`${val}`] !== value) {
        model.componentData[index][`${val}`] = value;
        publicAPI.modified();
        return true;
      }
      return false;
    };
  });
  const gets = ['useGradientOpacity', 'scalarOpacityUnitDistance', 'gradientOpacityMinimumValue', 'gradientOpacityMinimumOpacity', 'gradientOpacityMaximumValue', 'gradientOpacityMaximumOpacity', 'opacityMode', 'forceNearestInterpolation'];
  gets.forEach(val => {
    const cap = macro.capitalize(val);
    publicAPI[`get${cap}`] = index => model.componentData[index][`${val}`];
  });
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  colorMixPreset: null,
  independentComponents: true,
  interpolationType: InterpolationType.FAST_LINEAR,
  shade: false,
  ambient: 0.1,
  diffuse: 0.7,
  specular: 0.2,
  specularPower: 10.0,
  useLabelOutline: false,
  labelOutlineThickness: [1],
  labelOutlineOpacity: 1.0
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Build VTK API
  macro.obj(publicAPI, model);
  if (!model.componentData) {
    model.componentData = [];
    for (let i = 0; i < VTK_MAX_VRCOMP; ++i) {
      model.componentData.push({
        colorChannels: 1,
        grayTransferFunction: null,
        rGBTransferFunction: null,
        scalarOpacity: null,
        scalarOpacityUnitDistance: 1.0,
        opacityMode: OpacityMode.FRACTIONAL,
        gradientOpacityMinimumValue: 0,
        gradientOpacityMinimumOpacity: 0.0,
        gradientOpacityMaximumValue: 1.0,
        gradientOpacityMaximumOpacity: 1.0,
        useGradientOpacity: false,
        componentWeight: 1.0,
        forceNearestInterpolation: false
      });
    }
  }
  macro.setGet(publicAPI, model, ['colorMixPreset', 'independentComponents', 'interpolationType', 'shade', 'ambient', 'diffuse', 'specular', 'specularPower', 'useLabelOutline', 'labelOutlineOpacity']);
  macro.setGetArray(publicAPI, model, ['labelOutlineThickness']);

  // Object methods
  vtkVolumeProperty(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkVolumeProperty');

// ----------------------------------------------------------------------------

var vtkVolumeProperty$1 = {
  newInstance,
  extend,
  ...Constants
};

export { vtkVolumeProperty$1 as default, extend, newInstance };
