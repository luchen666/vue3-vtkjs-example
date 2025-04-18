import macro from "@kitware/vtk.js/macros";
import vtkAbstractWidgetFactory from "@kitware/vtk.js/Widgets/Core/AbstractWidgetFactory";
import vtkPlanePointManipulator from "@kitware/vtk.js/Widgets/Manipulators/PlaneManipulator";
// import vtkSplineRepresentation from "@kitware/vtk.js/Widgets/Representations/PolyLineRepresentation";
// import vtkSplineRepresentation from "@kitware/vtk.js/Widgets/Representations/SplineContextRepresentation";
import vtkSplineRepresentation from "./SplineRepresentation";
import vtkSphereHandleRepresentation from "@kitware/vtk.js/Widgets/Representations/SphereHandleRepresentation";

import widgetBehavior from "./behavior";
import stateGenerator from "./state";

import { ViewTypes } from "@kitware/vtk.js/Widgets/Core/WidgetManager/Constants";
import * as vtkMath from '@kitware/vtk.js/Common/Core/Math';

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function vtkPulpMeasureWidget(publicAPI, model) {
  model.classHierarchy.push("vtkPulpMeasureWidget");

  const superClass = { ...publicAPI };

  // --- Widget Requirement ---------------------------------------------------

  model.methodsToLink = [
    "activeColor",
    "activeScaleFactor",
    "closePolyLine",
    "defaultScale",
    "glyphResolution",
    "lineThickness",
    "useActiveColor",
    "scaleInPixels",
    "textProps",
    "text",
    "textStateIndex",
    "borderColor",
  ];

  publicAPI.getMeasure = function () {

    const len = model.widgetState.getSplineLength();
    console.log(len, model.widgetState, "len");
    window.model = model;
    window.publicAPI = publicAPI;
    
    

    const handles = model.widgetState.getHandleList();
    const moveHandle = model.widgetState.getMoveHandle();
    const moveOrigin = moveHandle?.getOrigin();
    // 首次绘制时想要显示数值，要通过已绘制的点和移动中的那个点来算距离
    if (
      moveOrigin &&
      moveOrigin[0] !== 0 &&
      moveOrigin[1] !== 0 &&
      handles.length >= 1
    ) {
      handles.push(moveHandle);
    } else if (handles.length < 2) {
      return 0;
    }

    if (!handles[0].getOrigin() || !handles[1].getOrigin()) {
      return 0;
    }
    let result = 0;
    const length = handles.length;
    for (let i = 0; i < length - 1; ++i) {
      const origin1 = handles[i].getOrigin();
      const origin2 = handles[i + 1].getOrigin();
      if (origin1 && origin2) {
        result += Math.sqrt(vtkMath.distance2BetweenPoints(origin1, origin2));
      }
    }
    return result;
  };

  publicAPI.getRepresentationsForViewType = (viewType) => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [
          {
            builder: vtkSphereHandleRepresentation,
            labels: ["handles"],
            initialValues: {
              coincidentTopologyParameters: {
                Point: {
                  factor: -666.0,
                  offset: -666.0,
                },
                Line: {
                  factor: -666.0,
                  offset: -666.0,
                },
                Polygon: {
                  factor: -668.0,
                  offset: -668.0,
                },
              },
            },
          },
          {
            builder: vtkSphereHandleRepresentation,
            labels: ["moveHandle"],
          },
          {
            builder: vtkSplineRepresentation,
            labels: ["handles", "moveHandle"],
            initialValues: {
              lineThickness: 0.1,
              coincidentTopologyParameters: {
                Point: {
                  factor: -666.0,
                  offset: -666.0,
                },
                Line: {
                  factor: -666.0,
                  offset: -666.0,
                },
                Polygon: {
                  factor: -668.0,
                  offset: -668.0,
                },
              },
            },
          },
        ];
    }
  };

  // --- Public methods -------------------------------------------------------
  publicAPI.setManipulator = (manipulator) => {
    superClass.setManipulator(manipulator);
    model.widgetState.getMoveHandle().setManipulator(manipulator);
    model.widgetState.getHandleList().forEach((handle) => {
      handle.setManipulator(manipulator);
    });
  };

  // --------------------------------------------------------------------------
  // initialization
  // --------------------------------------------------------------------------

  // Default manipulator
  publicAPI.setManipulator(
    model.manipulator ||
      vtkPlanePointManipulator.newInstance({
        useCameraFocalPoint: true,
        useCameraNormal: true,
      })
  );
}

// ----------------------------------------------------------------------------

const defaultValues = (initialValues) => ({
  manipulator: null,
  behavior: widgetBehavior,
  widgetState: stateGenerator(),
  ...initialValues,
});

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, defaultValues(initialValues));

  vtkAbstractWidgetFactory.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ["manipulator"]);

  vtkPulpMeasureWidget(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, "vtkPulpMeasureWidget");

// ----------------------------------------------------------------------------

export default { newInstance, extend };
