import { m as macro } from '../../macros2.js';
import vtkInteractorObserver from '../../Rendering/Core/InteractorObserver.js';
import vtkProp from '../../Rendering/Core/Prop.js';
import { RenderingTypes } from './WidgetManager/Constants.js';
import { WIDGET_PRIORITY } from './AbstractWidget/Constants.js';

// ----------------------------------------------------------------------------

function vtkAbstractWidget(publicAPI, model) {
  model.classHierarchy.push('vtkAbstractWidget');
  model.actorToRepresentationMap = new WeakMap();

  // --------------------------------------------------------------------------
  publicAPI.getBounds = model.widgetState.getBounds;
  publicAPI.getNestedProps = () => model.representations;
  // --------------------------------------------------------------------------

  publicAPI.activateHandle = _ref => {
    let {
      selectedState,
      representation
    } = _ref;
    model.widgetState.activateOnly(selectedState);
    model.activeState = selectedState;
    if (selectedState && selectedState.updateManipulator) {
      selectedState.updateManipulator();
    }
    publicAPI.invokeActivateHandle({
      selectedState,
      representation
    });
    if (publicAPI.updateCursor) {
      publicAPI.updateCursor();
    }
  };

  // --------------------------------------------------------------------------

  publicAPI.deactivateAllHandles = () => {
    model.widgetState.deactivate();
  };

  // --------------------------------------------------------------------------

  publicAPI.hasActor = actor => model.actorToRepresentationMap.has(actor);

  // --------------------------------------------------------------------------

  publicAPI.grabFocus = () => {
    model.hasFocus = true;
  };
  publicAPI.loseFocus = () => {
    model.hasFocus = false;
  };
  publicAPI.hasFocus = () => model.hasFocus;

  // --------------------------------------------------------------------------

  publicAPI.placeWidget = bounds => model.widgetState.placeWidget(bounds);
  publicAPI.getPlaceFactor = () => model.widgetState.getPlaceFactor();
  publicAPI.setPlaceFactor = factor => model.widgetState.setPlaceFactor(factor);

  // --------------------------------------------------------------------------

  publicAPI.getRepresentationFromActor = actor => model.actorToRepresentationMap.get(actor);

  // --------------------------------------------------------------------------

  publicAPI.updateRepresentationForRender = function () {
    let renderingType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RenderingTypes.FRONT_BUFFER;
    for (let i = 0; i < model.representations.length; i++) {
      const representation = model.representations[i];
      representation.updateActorVisibility(renderingType, model.contextVisibility, model.handleVisibility);
    }
  };
  publicAPI.getViewWidgets = () => model._factory.getViewWidgets();

  // --------------------------------------------------------------------------
  // Initialization calls
  // --------------------------------------------------------------------------

  publicAPI.setPriority(WIDGET_PRIORITY);
}

// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  contextVisibility: true,
  handleVisibility: true,
  hasFocus: false
};

/**
 * @param {*} publicAPI public methods to populate
 * @param {*} model internal values to populate
 * @param {object} initialValues Contains at least
 *   {viewType, _renderer, _camera, _openGLRenderWindow, _factory}
 */
function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);
  vtkProp.extend(publicAPI, model, initialValues);
  vtkInteractorObserver.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['contextVisibility', 'handleVisibility', '_widgetManager']);
  macro.get(publicAPI, model, ['representations', 'widgetState', 'activeState' // stores the last activated sub state(handle)
  ]);

  macro.moveToProtected(publicAPI, model, ['widgetManager']);
  macro.event(publicAPI, model, 'ActivateHandle');
  vtkAbstractWidget(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkAbstractWidget');

// ----------------------------------------------------------------------------

var vtkAbstractWidget$1 = {
  newInstance,
  extend
};

export { vtkAbstractWidget$1 as default, extend, newInstance };
