import { m as macro } from '../../macros2.js';
import vtkActor from '../../Rendering/Core/Actor.js';
import vtkGlyph3DMapper from '../../Rendering/Core/Glyph3DMapper.js';
import vtkHandleRepresentation from './HandleRepresentation.js';
import vtkContextRepresentation from './ContextRepresentation.js';
import vtkSphereSource from '../../Filters/Sources/SphereSource.js';
import vtkPolyData from '../../Common/DataModel/PolyData.js';
import { ScalarMode } from '../../Rendering/Core/Mapper/Constants.js';
import { getPixelWorldHeightAtCoord } from '../Core/WidgetManager.js';
import vtkWidgetRepresentation, { allocateArray } from './WidgetRepresentation.js';
import { Behavior } from './WidgetRepresentation/Constants.js';
import { OrientationModes } from '../../Rendering/Core/Glyph3DMapper/Constants.js';

// ----------------------------------------------------------------------------
// vtkGlyphRepresentation methods
// ----------------------------------------------------------------------------
function origin(publicAPI, model) {
  return (polyData, states) => {
    const points = allocateArray(polyData, 'points', states.length).getData();
    let j = 0;
    for (let i = 0; i < states.length; ++i) {
      const coord = states[i].getOrigin(model.scaleInPixels && model.displayScaleParams);
      points[j++] = coord[0];
      points[j++] = coord[1];
      points[j++] = coord[2];
    }
  };
}
function noPosition(publicAPI, model) {
  return (polyData, states) => {
    allocateArray(polyData, 'points', 0);
  };
}
function color3(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setColorByArrayName('color');
    const colorArray = allocateArray(polyData, 'color', states.length, 'Uint8Array',
    // RGBA
    4);
    const colors = colorArray.getData();
    let j = 0;
    for (let i = 0; i < states.length; ++i) {
      let c3 = states[i].getColor3();
      if (states[i].getActive() && model.useActiveColor) {
        c3 = model.activeColor;
      }
      colors[j++] = c3[0];
      colors[j++] = c3[1];
      colors[j++] = c3[2];
      colors[j++] = states[i].getOpacity();
    }
    colorArray.dataChange();
  };
}
function color(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setColorByArrayName('color');
    const colors = allocateArray(polyData, 'color', states.length).getData();
    for (let i = 0; i < states.length; ++i) {
      let c = states[i].getColor();
      if (states[i].getActive() && model.useActiveColor) {
        c = model.activeColor;
      }
      colors[i] = c;
    }
  };
}
function noColor(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setColorByArrayName(null);
  };
}
function scale3(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setScaleArray('scale');
    model._pipeline.mapper.setScaleFactor(1);
    model._pipeline.mapper.setScaling(true);
    model._pipeline.mapper.setScaleMode(vtkGlyph3DMapper.ScaleModes.SCALE_BY_COMPONENTS);
    const scales = allocateArray(polyData, 'scale', states.length, 'Float32Array', 3).getData();
    let j = 0;
    for (let i = 0; i < states.length; ++i) {
      const state = states[i];
      let scaleFactor = state.getActive() ? model.activeScaleFactor : 1;
      if (publicAPI.getScaleInPixels()) {
        scaleFactor *= getPixelWorldHeightAtCoord(state.getOrigin(), model.displayScaleParams);
      }
      const scale = state.getScale3?.() ?? model.defaultScale;
      scales[j++] = scaleFactor * scale[0];
      scales[j++] = scaleFactor * scale[1];
      scales[j++] = scaleFactor * scale[2];
    }
  };
}
function scale1(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setScaleArray('scale');
    model._pipeline.mapper.setScaleFactor(1);
    model._pipeline.mapper.setScaling(true);
    const scales = allocateArray(polyData, 'scale', states.length).getData();
    for (let i = 0; i < states.length; ++i) {
      const state = states[i];
      let scaleFactor = state.getActive() ? model.activeScaleFactor : 1;
      if (publicAPI.getScaleInPixels()) {
        scaleFactor *= getPixelWorldHeightAtCoord(state.getOrigin(), model.displayScaleParams);
      }
      const scale = state.getScale1?.() ?? model.defaultScale;
      scales[i] = scaleFactor * scale;
    }
  };
}
function noScale(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setScaleArray(null);
    model._pipeline.mapper.setScaleFactor(model.defaultScale);
    model._pipeline.mapper.setScaling(model.defaultScale !== 1);
  };
}
function direction(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setOrientationArray('orientation');
    model._pipeline.mapper.setOrientationMode(OrientationModes.MATRIX);
    const orientation = allocateArray(polyData, 'orientation', states.length, 'Float64Array', 9).getData();
    for (let i = 0; i < states.length; ++i) {
      const state = states[i];
      const right = state.getRight ? state.getRight() : [1, 0, 0];
      const up = state.getUp ? state.getUp() : [0, 1, 0];
      const dir = state.getDirection ? state.getDirection() : [0, 0, 1];
      orientation.set(right, 9 * i);
      orientation.set(up, 9 * i + 3);
      orientation.set(dir, 9 * i + 6);
    }
  };
}
function noOrientation(publicAPI, model) {
  return (polyData, states) => {
    model._pipeline.mapper.setOrientationArray(null);
  };
}
function vtkGlyphRepresentation(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkGlyphRepresentation');
  const superClass = {
    ...publicAPI
  };
  const internalPolyData = vtkPolyData.newInstance({
    mtime: 0
  });
  function hasMixin(states) {
    for (var _len = arguments.length, requiredMixins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      requiredMixins[_key - 1] = arguments[_key];
    }
    return requiredMixins.every(requiredMixin => states[0]?.[`get${macro.capitalize(requiredMixin)}`]?.() != null);
  }
  // --------------------------------------------------------------------------
  // Generic rendering pipeline
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------

  publicAPI.getRepresentationStates = function () {
    let input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : model.inputData[0];
    return superClass.getRepresentationStates(input).filter(state => state.getOrigin?.() && (state.isVisible?.() ?? true));
  };

  // --------------------------------------------------------------------------
  publicAPI.getMixins = states => {
    const glyphProperties = {};
    if (hasMixin(states, 'origin')) {
      glyphProperties.position = model.applyMixin.origin;
    } else {
      glyphProperties.position = model.applyMixin.noPosition;
    }
    if (hasMixin(states, 'color3')) {
      glyphProperties.color = model.applyMixin.color3;
    } else if (hasMixin(states, 'color')) {
      glyphProperties.color = model.applyMixin.color;
    } else {
      glyphProperties.color = model.applyMixin.noColor;
    }
    if (hasMixin(states, 'scale3')) {
      glyphProperties.scale = model.applyMixin.scale3;
    } else if (hasMixin(states, 'scale1')) {
      glyphProperties.scale = model.applyMixin.scale1;
    } else {
      glyphProperties.scale = model.applyMixin.noScale;
    }
    if (hasMixin(states, 'direction')) {
      glyphProperties.orientation = model.applyMixin.direction;
    } else {
      glyphProperties.orientation = model.applyMixin.noOrientation;
    }
    return glyphProperties;
  };
  publicAPI.requestData = (inData, outData) => {
    const states = publicAPI.getRepresentationStates(inData[0]);
    outData[0] = internalPolyData;
    const glyphProperties = publicAPI.getMixins(states);
    Object.values(glyphProperties).forEach(property => property(internalPolyData, states));
    internalPolyData.getPoints().modified();
    internalPolyData.modified();
  };
  vtkWidgetRepresentation.connectPipeline(model._pipeline);
  publicAPI.addActor(model._pipeline.actor);
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

function defaultValues(publicAPI, model, initialValues) {
  return {
    defaultScale: 1,
    ...initialValues,
    _pipeline: {
      source: initialValues._pipeline?.source ?? publicAPI,
      glyph: initialValues._pipeline?.glyph ??
      // in case glyph was provided
      vtkSphereSource.newInstance({
        phiResolution: 8,
        thetaResolution: 8
      }),
      mapper: initialValues._pipeline?.mapper ??
      // in case mapper was provided
      vtkGlyph3DMapper.newInstance({
        scalarMode: ScalarMode.USE_POINT_FIELD_DATA
      }),
      actor: initialValues._pipeline?.actor ??
      // in case actor was provided
      vtkActor.newInstance({
        parentProp: publicAPI
      }),
      ...initialValues._pipeline // in case there is something else to add to pipeline
    },

    applyMixin: {
      origin: initialValues.applyMixin?.origin ?? origin(publicAPI, model),
      noPosition: initialValues.applyMixin?.noPosition ?? noPosition(),
      color3: initialValues.applyMixin?.color3 ?? color3(publicAPI, model),
      color: initialValues.applyMixin?.color ?? color(publicAPI, model),
      noColor: initialValues.applyMixin?.noColor ?? noColor(publicAPI, model),
      scale3: initialValues.applyMixin?.scale3 ?? scale3(publicAPI, model),
      scale1: initialValues.applyMixin?.scale1 ?? scale1(publicAPI, model),
      noScale: initialValues.applyMixin?.noScale ?? noScale(publicAPI, model),
      direction: initialValues.applyMixin?.direction ?? direction(publicAPI, model),
      noOrientation: initialValues.applyMixin?.noOrientation ?? noOrientation(publicAPI, model),
      ...initialValues.applyMixin
    }
  };
}

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (initialValues.behavior === Behavior.CONTEXT) {
    vtkContextRepresentation.extend(publicAPI, model, defaultValues(publicAPI, model, initialValues));
  } else {
    vtkHandleRepresentation.extend(publicAPI, model, defaultValues(publicAPI, model, initialValues));
  }
  if ('lighting' in initialValues) {
    model._pipeline.actor.getProperty().setLighting(initialValues.lighting);
  }
  macro.setGet(publicAPI, model._pipeline, ['defaultScale']);
  macro.get(publicAPI, model._pipeline, ['glyph', 'mapper', 'actor']);
  // Expose the mixin functions to allow overwriting
  macro.setGet(publicAPI, model.applyMixin, Object.keys(model.applyMixin));

  // Object specific methods
  vtkGlyphRepresentation(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkGlyphRepresentation');

// ----------------------------------------------------------------------------

var vtkGlyphRepresentation$1 = {
  newInstance,
  extend
};

export { color, color3, vtkGlyphRepresentation$1 as default, direction, extend, newInstance, noColor, noOrientation, noPosition, noScale, origin, scale1, scale3 };
