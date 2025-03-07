import { m as macro } from '../../macros2.js';
import { k as add } from '../../Common/Core/Math/index.js';
import vtkAbstractWidgetFactory from '../Core/AbstractWidgetFactory.js';
import vtkImplicitPlaneRepresentation from '../Representations/ImplicitPlaneRepresentation.js';
import vtkLineManipulator from '../Manipulators/LineManipulator.js';
import vtkTrackballManipulator from '../Manipulators/TrackballManipulator.js';
import vtkPlanePointManipulator from '../Manipulators/PlaneManipulator.js';
import { ViewTypes } from '../Core/WidgetManager/Constants.js';

// ----------------------------------------------------------------------------
// Widget linked to a view
// ----------------------------------------------------------------------------

function widgetBehavior(publicAPI, model) {
  model.classHierarchy.push('vtkPlaneWidget');
  model._isDragging = false;
  // used to track the constrained widget position
  model._draggingWidgetOrigin = [0, 0, 0];
  publicAPI.setDisplayCallback = callback => model.representations[0].setDisplayCallback(callback);
  publicAPI.updateCursor = () => {
    switch (model.activeState.getUpdateMethodName()) {
      case 'updateFromOrigin':
        model._apiSpecificRenderWindow.setCursor('crosshair');
        break;
      case 'updateFromPlane':
        model._apiSpecificRenderWindow.setCursor('move');
        break;
      case 'updateFromNormal':
        model._apiSpecificRenderWindow.setCursor('alias');
        break;
      default:
        model._apiSpecificRenderWindow.setCursor('grabbing');
        break;
    }
  };
  publicAPI.handleLeftButtonPress = callData => {
    if (!model.activeState || !model.activeState.getActive() || !model.pickable) {
      return macro.VOID;
    }
    model.lineManipulator.setWidgetOrigin(model.activeState.getOrigin());
    model.lineManipulator.setWidgetNormal(model.activeState.getNormal());
    model.planeManipulator.setWidgetOrigin(model.activeState.getOrigin());
    model.planeManipulator.setWidgetNormal(model.activeState.getNormal());
    model.trackballManipulator.reset(callData); // setup trackball delta
    model.trackballManipulator.setWidgetNormal(model.activeState.getNormal());

    // update worldDelta with the proper manipulator
    let activeManipulator = null;
    switch (model.activeState.getUpdateMethodName()) {
      case 'updateFromOrigin':
        activeManipulator = model.planeManipulator;
        break;
      case 'updateFromPlane':
        activeManipulator = model.lineManipulator;
        break;
      case 'updateFromNormal':
        activeManipulator = model.trackballManipulator;
        break;
      // skip
    }

    if (activeManipulator) {
      activeManipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    }
    if (model.dragable) {
      model._draggingWidgetOrigin = model.widgetState.getOrigin();
      model._isDragging = true;
      model._apiSpecificRenderWindow.setCursor('grabbing');
      model._interactor.requestAnimation(publicAPI);
    }
    publicAPI.invokeStartInteractionEvent();
    return macro.EVENT_ABORT;
  };
  publicAPI.handleMouseMove = callData => {
    if (model._isDragging) {
      return publicAPI.handleEvent(callData);
    }
    return macro.VOID;
  };
  publicAPI.handleLeftButtonRelease = () => {
    if (!model.activeState || !model.activeState.getActive() || !model.pickable) {
      return macro.VOID;
    }
    if (model._isDragging) {
      model._interactor.cancelAnimation(publicAPI);
      model._isDragging = false;
    }
    model.widgetState.deactivate();
    publicAPI.invokeEndInteractionEvent();
    return macro.EVENT_ABORT;
  };
  publicAPI.handleEvent = callData => {
    if (model.pickable && model.activeState && model.activeState.getActive()) {
      publicAPI[model.activeState.getUpdateMethodName()](callData);
      publicAPI.invokeInteractionEvent();
      return macro.EVENT_ABORT;
    }
    return macro.VOID;
  };

  // --------------------------------------------------------------------------
  // Event coordinate translation
  // --------------------------------------------------------------------------

  publicAPI.updateFromOrigin = callData => {
    model.planeManipulator.setWidgetNormal(model.widgetState.getNormal());
    const {
      worldCoords,
      worldDelta
    } = model.planeManipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    add(model._draggingWidgetOrigin, worldDelta, model._draggingWidgetOrigin);

    // test containment of interaction coords
    if (model.widgetState.containsPoint(...worldCoords)) {
      model.activeState.setOrigin(model._draggingWidgetOrigin);
    }
  };

  // --------------------------------------------------------------------------

  publicAPI.updateFromPlane = callData => {
    // Move origin along normal axis
    model.lineManipulator.setWidgetNormal(model.activeState.getNormal());
    const {
      worldDelta
    } = model.lineManipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    add(model._draggingWidgetOrigin, worldDelta, model._draggingWidgetOrigin);
    if (model.widgetState.containsPoint(...model._draggingWidgetOrigin)) {
      model.activeState.setOrigin(model._draggingWidgetOrigin);
    }
  };

  // --------------------------------------------------------------------------

  publicAPI.updateFromNormal = callData => {
    model.trackballManipulator.setWidgetNormal(model.activeState.getNormal());
    const {
      worldCoords: newNormal
    } = model.trackballManipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    model.activeState.setNormal(newNormal);
  };

  // --------------------------------------------------------------------------
  // initialization
  // --------------------------------------------------------------------------

  model.lineManipulator = vtkLineManipulator.newInstance();
  model.planeManipulator = vtkPlanePointManipulator.newInstance();
  model.trackballManipulator = vtkTrackballManipulator.newInstance();
}

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function vtkImplicitPlaneWidget(publicAPI, model) {
  model.classHierarchy.push('vtkPlaneWidget');

  // --- Widget Requirement ---------------------------------------------------

  model.methodsToLink = ['representationStyle', 'sphereResolution', 'handleSizeRatio', 'axisScale', 'normalVisible', 'originVisible', 'planeVisible', 'outlineVisible'];
  publicAPI.getRepresentationsForViewType = viewType => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [{
          builder: vtkImplicitPlaneRepresentation
        }];
    }
  };
}

// ----------------------------------------------------------------------------

const defaultValues = initialValues => ({
  behavior: widgetBehavior,
  widgetState: vtkImplicitPlaneRepresentation.generateState(),
  ...initialValues
});

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, defaultValues(initialValues));
  vtkAbstractWidgetFactory.extend(publicAPI, model, initialValues);
  vtkImplicitPlaneWidget(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkImplicitPlaneWidget');

// ----------------------------------------------------------------------------

var vtkImplicitPlaneWidget$1 = {
  newInstance,
  extend
};

export { vtkImplicitPlaneWidget$1 as default, extend, newInstance };
