import { m as macro } from '../../../macros2.js';
import { vec3 } from 'gl-matrix';

function widgetBehavior(publicAPI, model) {
  model.painting = model._factory.getPainting();
  publicAPI.handleLeftButtonPress = callData => {
    const manipulator = model.activeState?.getManipulator?.() ?? model.manipulator;
    if (!(manipulator && model.activeState && model.activeState.getActive())) {
      model.painting = false;
      return macro.VOID;
    }
    const {
      worldCoords
    } = manipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    if (!worldCoords?.length) {
      model.painting = false;
      return macro.VOID;
    }
    model.painting = true;
    const trailCircle = model.widgetState.addTrail();
    trailCircle.set(model.activeState.get('origin', 'up', 'right', 'direction', 'scale1'));
    publicAPI.invokeStartInteractionEvent();
    return macro.EVENT_ABORT;
  };
  publicAPI.handleMouseMove = callData => publicAPI.handleEvent(callData);
  publicAPI.handleLeftButtonRelease = () => {
    if (model.painting) {
      publicAPI.invokeEndInteractionEvent();
      model.widgetState.clearTrailList();
    }
    model.painting = false;
    return macro.VOID;
  };
  publicAPI.handleEvent = callData => {
    const manipulator = model.activeState?.getManipulator?.() ?? model.manipulator;
    if (!(manipulator && model.activeState && model.activeState.getActive())) {
      model.painting = false;
      return macro.VOID;
    }
    const normal = model._camera.getDirectionOfProjection();
    const up = model._camera.getViewUp();
    const right = [];
    vec3.cross(right, up, normal);
    model.activeState.setUp(...up);
    model.activeState.setRight(...right);
    model.activeState.setDirection(...normal);
    const {
      worldCoords
    } = manipulator.handleEvent(callData, model._apiSpecificRenderWindow);
    if (!worldCoords?.length) {
      return macro.VOID;
    }
    model.widgetState.setTrueOrigin(...worldCoords);
    model.activeState.setOrigin(...worldCoords);
    if (model.painting) {
      const trailCircle = model.widgetState.addTrail();
      trailCircle.set(model.activeState.get('origin', 'up', 'right', 'direction', 'scale1'));
    } else {
      return macro.VOID;
    }
    publicAPI.invokeInteractionEvent();
    return macro.EVENT_ABORT;
  };
  publicAPI.grabFocus = () => {
    if (!model.hasFocus) {
      model.activeState = model.widgetState.getHandle();
      model.activeState.activate();
      model._interactor.requestAnimation(publicAPI);
      const canvas = model._apiSpecificRenderWindow.getCanvas();
      canvas.onmouseenter = () => {
        if (model.hasFocus && model.activeState === model.widgetState.getHandle()) {
          model.activeState.setVisible(true);
        }
      };
      canvas.onmouseleave = () => {
        if (model.hasFocus && model.activeState === model.widgetState.getHandle()) {
          model.activeState.setVisible(false);
        }
      };
    }
    model.hasFocus = true;
  };
  publicAPI.loseFocus = () => {
    if (model.hasFocus) {
      model._interactor.cancelAnimation(publicAPI);
    }
    model.widgetState.deactivate();
    model.widgetState.getHandle().deactivate();
    model.activeState = null;
    model.hasFocus = false;
  };
  macro.get(publicAPI, model, ['painting']);
}

export { widgetBehavior as default };
