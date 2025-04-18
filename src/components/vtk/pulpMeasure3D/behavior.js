import macro from "@kitware/vtk.js/macros";
import { add, subtract } from "@kitware/vtk.js/Common/Core/Math";

export default function widgetBehavior(publicAPI, model) {
  model.classHierarchy.push("vtkPolyLineWidgetProp");
  model._isDragging = false;

  // --------------------------------------------------------------------------
  // Display 2D
  // --------------------------------------------------------------------------

  publicAPI.setDisplayCallback = (callback) =>
    model.representations[0].setDisplayCallback(callback);

  // --------------------------------------------------------------------------
  // Interactor events
  // --------------------------------------------------------------------------

  function ignoreKey(e) {
    return e.altKey || e.controlKey || e.shiftKey;
  }

  // 设置表面选点属性
  publicAPI.setHandleSelector = (picker, renderer) => {
    model.renderer = renderer;
    model.picker = picker;
  };

  // 获取表面坐标
  publicAPI.getSurfacePoint = (e) => {
    const pos = e.position;
    const point = [pos.x, pos.y, 0.0];

    model.picker.pick(point, model.renderer);
    const pickedPoints = model.picker.getPickedPositions() || [];

    if (pickedPoints.length === 0) {
      return null;
    }
    return pickedPoints[0];
  };

  function updateMoveHandle(callData) {
    const manipulator =
      model.activeState?.getManipulator?.() ?? model.manipulator;
    if (!manipulator) {
      return macro.VOID;
    }

    const point = publicAPI.getSurfacePoint(callData);
    if (!point) return macro.VOID;
    const translation = model.previousPosition
      ? subtract(point, model.previousPosition, [])
      : [0, 0, 0];
    model.previousPosition = point;

    const isHandleMoving =
      model.activeState === model.widgetState.getMoveHandle() ||
      model._isDragging;
    // the line is pickable but not draggable
    const isPickingLine = !model.activeState.setOrigin;

    if (isHandleMoving && !isPickingLine) {
      // if (point) {
      //   model.activeState.setOrigin(point);
      // }
      if (model.activeState && model.activeState?.hasOwnProperty("setOrigin")) {
        // e.g. the line is pickable but not draggable
        model.activeState.setOrigin(point);
      } else {
        //dragger the line
        const handleList = model.widgetState.getHandleList();
        for (let i = 0; i < handleList.length; ++i) {
          handleList[i].setOrigin(
            add(handleList[i].getOrigin(), translation, [])
          );
        }
      }

      publicAPI.invokeInteractionEvent();
      return macro.EVENT_ABORT;
    }
    return macro.VOID;
  }

  // --------------------------------------------------------------------------
  // Right click: Delete handle
  // --------------------------------------------------------------------------

  publicAPI.handleRightButtonPress = (e) => {
    if (
      !model.activeState ||
      !model.activeState.getActive() ||
      !model.pickable ||
      ignoreKey(e)
    ) {
      return macro.VOID;
    }

    // 当鼠标右键取消的时候 增加一个点
    if (model.hasFocus) {
      const handle = model.widgetState.addHandle();
      const moveHandle = model.widgetState.getMoveHandle();
      handle.setOrigin(moveHandle.getOrigin());
      if (model.widgetState.getHandleList().length !== 1) {
        // 事件结束不能发生在仅一个点时
        publicAPI.loseFocus();
      } else {
        // 触发正常更新事件
        publicAPI.invokeStartInteractionEvent();
        publicAPI.invokeInteractionEvent();
      }
      return macro.EVENT_ABORT;
    }

    if (model.activeState !== model.widgetState.getMoveHandle()) {
      model._interactor.requestAnimation(publicAPI);

      model.activeState.deactivate();
      model.widgetState.removeHandle(model.activeState);
      model.activeState = null;

      model._interactor.cancelAnimation(publicAPI);
    }

    publicAPI.invokeStartInteractionEvent();
    publicAPI.invokeInteractionEvent();
    return macro.EVENT_ABORT;
  };

  // --------------------------------------------------------------------------
  // Left press: Select handle to drag
  // --------------------------------------------------------------------------

  publicAPI.handleLeftButtonPress = (e) => {
    if (
      !model.activeState ||
      !model.activeState.getActive() ||
      !model.pickable ||
      ignoreKey(e)
    ) {
      return macro.VOID;
    }
    const manipulator =
      model.activeState?.getManipulator?.() ?? model.manipulator;

    if (
      model.activeState === model.widgetState.getMoveHandle() &&
      manipulator
    ) {
      updateMoveHandle(e);
      const moveHandle = model.widgetState.getMoveHandle();
      const newHandle = model.widgetState.addHandle();

      const point = publicAPI.getSurfacePoint(e);

      newHandle.setOrigin(point);
      newHandle.setColor(moveHandle.getColor());
      newHandle.setScale1(moveHandle.getScale1());

      newHandle.setManipulator(manipulator);
    } else if (model.dragable) {
      // Update worldDelta
      // manipulator.handleEvent(e, model._apiSpecificRenderWindow);
      model._isDragging = true;
      model._apiSpecificRenderWindow.setCursor("grabbing");
      model._interactor.requestAnimation(publicAPI);
    }

    publicAPI.invokeStartInteractionEvent();
    publicAPI.invokeInteractionEvent();
    return macro.EVENT_ABORT;
  };

  // --------------------------------------------------------------------------
  // Mouse move: Drag selected handle / Handle follow the mouse
  // --------------------------------------------------------------------------

  publicAPI.handleMouseMove = (callData) => {
    if (
      model.pickable &&
      model.dragable &&
      model.activeState &&
      model.activeState.getActive() &&
      !ignoreKey(callData)
    ) {
      if (updateMoveHandle(callData) === macro.EVENT_ABORT) {
        return macro.EVENT_ABORT;
      }
    }
    if (model.hasFocus) {
      model._widgetManager.disablePicking();
    }
    return macro.VOID;
  };

  // --------------------------------------------------------------------------
  // Left release: Finish drag / Create new handle
  // --------------------------------------------------------------------------

  publicAPI.handleLeftButtonRelease = () => {
    if (
      !model.activeState ||
      !model.activeState.getActive() ||
      !model.pickable
    ) {
      return macro.VOID;
    }

    if (model._isDragging) {
      model._apiSpecificRenderWindow.setCursor("pointer");
      model.widgetState.deactivate();
      model._interactor.cancelAnimation(publicAPI);
      model._isDragging = false;
      // 修改后触发结束事件
      publicAPI.invokeEndInteractionEvent();
    } else if (model.activeState !== model.widgetState.getMoveHandle()) {
      model.widgetState.deactivate();
    }

    if (
      (model.hasFocus && !model.activeState) ||
      (model.activeState && !model.activeState.getActive())
    ) {
      model._widgetManager.enablePicking();
      model._interactor.render();
    }
    return macro.EVENT_ABORT;
  };

  // --------------------------------------------------------------------------
  // Escape key: Release focus to switch to drag mode
  // --------------------------------------------------------------------------

  publicAPI.handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      publicAPI.loseFocus();
    }
  };

  publicAPI.setText = function (text) {
    model.widgetState.getText().setText(text);
    model._interactor.render();
  };

  // --------------------------------------------------------------------------
  // Focus API - modeHandle follow mouse when widget has focus
  // --------------------------------------------------------------------------

  publicAPI.grabFocus = () => {
    if (!model.hasFocus) {
      model.activeState = model.widgetState.getMoveHandle();
      model.activeState.activate();
      model.activeState.setVisible(true);
      model._interactor.requestAnimation(publicAPI);
      publicAPI.invokeStartInteractionEvent();
    }
    model.hasFocus = true;
  };

  // --------------------------------------------------------------------------

  publicAPI.loseFocus = () => {
    if (model.hasFocus) {
      model._interactor.cancelAnimation(publicAPI);
      publicAPI.invokeEndInteractionEvent();
    }
    model.widgetState.deactivate();
    model.widgetState.getMoveHandle().deactivate();
    model.widgetState.getMoveHandle().setVisible(false);
    model.widgetState.getMoveHandle().setOrigin(null);
    model.activeState = null;
    model.hasFocus = false;
    model._widgetManager.enablePicking();
    model._interactor.render();
  };
}
