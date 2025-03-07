import { s as subtract, w as multiplyScalar, k as add, D as areEquals } from '../../../Common/Core/Math/index.js';

function calculateTextPosition(model) {
  const vector = [0, 0, 0];
  const handle1WorldPos = model.widgetState.getHandle1().getOrigin();
  const handle2WorldPos = model.widgetState.getHandle2().getOrigin();
  if (!handle1WorldPos || !handle2WorldPos) {
    return null;
  }
  let statePositionOnLine = model.widgetState.getPositionOnLine().getPosOnLine();
  statePositionOnLine = 1 - statePositionOnLine;
  subtract(handle1WorldPos, handle2WorldPos, vector);
  multiplyScalar(vector, statePositionOnLine);
  add(vector, handle2WorldPos, vector);
  return vector;
}
function updateTextPosition(model) {
  const SVGTextState = model.widgetState.getText();
  SVGTextState.setOrigin(calculateTextPosition(model));
}
function isHandlePlaced(handleIndex, widgetState) {
  if (handleIndex === 2) {
    return widgetState.getMoveHandle().getOrigin() != null;
  }
  const handle1Origin = widgetState.getHandle1().getOrigin();
  if (handleIndex === 0) {
    return handle1Origin != null;
  }
  const handle2Origin = widgetState.getHandle2().getOrigin();
  return handle1Origin && handle2Origin && !areEquals(handle1Origin, handle2Origin, 0);
}

/**
 * Returns the world position of line extremities (placed or not).
 * Returns null if no extremity exist.
 * @param {number} handleIndex 0 or 1
 * @param {object} widgetState state of line widget
 * @param {bool} moveHandle Get move handle position if moveHandle is true and handle is not placed
 */
function getPoint(handleIndex, widgetState) {
  let moveHandle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const handle = moveHandle && !isHandlePlaced(handleIndex, widgetState) ? widgetState.getMoveHandle() : widgetState[`getHandle${handleIndex + 1}`]();
  const origin = handle.getOrigin();
  return origin || null;
}

/**
 * Returns the number of handle placed on the scene by checking
 * handle positions. Returns 2 when the user is still
 * placing 2nd handle
 * */
function getNumberOfPlacedHandles(widgetState) {
  let numberOfPlacedHandles = 0;
  if (isHandlePlaced(0, widgetState)) {
    numberOfPlacedHandles = 1 + isHandlePlaced(1, widgetState);
  }
  return numberOfPlacedHandles;
}

export { calculateTextPosition, getNumberOfPlacedHandles, getPoint, isHandlePlaced, updateTextPosition };
