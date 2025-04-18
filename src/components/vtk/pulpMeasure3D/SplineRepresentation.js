import macro from "@kitware/vtk.js/macros";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkContextRepresentation from "@kitware/vtk.js/Widgets/Representations/ContextRepresentation";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
import vtkSpline3D from "@kitware/vtk.js/Common/DataModel/Spline3D";
import vtkLineFilter from "@kitware/vtk.js/Filters/General/LineFilter";
import vtkWidgetRepresentation, {
  allocateArray,
} from "@kitware/vtk.js/Widgets/Representations/WidgetRepresentation";
import * as vtkMath from "@kitware/vtk.js/Common/Core/Math";

// ----------------------------------------------------------------------------
// vtkSplineRepresentation methods
// ----------------------------------------------------------------------------

function vtkSplineRepresentation(publicAPI, model) {
  // Set our className
  model.classHierarchy.push("vtkSplineRepresentation");

  // --------------------------------------------------------------------------
  // Generic rendering pipeline
  // --------------------------------------------------------------------------

  model.internalPolyData = vtkPolyData.newInstance({ mtime: 0 });

  model._pipelines = {
    border: {
      source: publicAPI,
      filter: vtkLineFilter.newInstance(),
      mapper: vtkMapper.newInstance(),
      actor: vtkActor.newInstance({ parentProp: publicAPI }),
    },
  };

  vtkWidgetRepresentation.connectPipeline(model._pipelines.border);
  model._pipelines.border.actor.getProperty().setOpacity(1);
  model._pipelines.border.actor.getProperty().setColor(0.1, 1, 0.1);
  model._pipelines.border.actor.setVisibility(model.outputBorder);
  publicAPI.addActor(model._pipelines.border.actor);

  // --------------------------------------------------------------------------
  const superGetRepresentationStates = publicAPI.getRepresentationStates;
  publicAPI.getRepresentationStates = (input = model.inputData[0]) =>
    superGetRepresentationStates(input).filter(
      (state) => state.getOrigin?.() && state.isVisible?.()
    );

  // 计算长度
  publicAPI.getMeasure22 = macro.throttle(() => {
    window.internalPolyData = model.internalPolyData
    const points = internalPolyData.getPoints().getData();
    if (!points || !points.length) return 0;
    let result = 0;
    for (let i = 0; i < points.length / 3 - 1; i++) {
      const point0 = points.slice(i * 3, i * 3 + 3);
      const point1 = points.slice((i + 1) * 3, (i + 1) * 3 + 3);
      result += Math.sqrt(vtkMath.distance2BetweenPoints(point0, point1));
    }
    model.inputData[0].setSplineLength(result);
    return result;
  }, 50);

  publicAPI.requestData = (inData, outData) => {
    if (model.deleted) {
      return;
    }

    const widgetState = inData[0];

    const list = publicAPI.getRepresentationStates(widgetState);
    const inPoints = list.map((state) => state.getOrigin());
    if (inPoints.length <= 1) {
      outData[0] = model.internalPolyData;
      return;
    }

    const numVertices = inPoints.length - 1;

    const spline = vtkSpline3D.newInstance({
      close: true,
      kind: widgetState.getSplineKind(),
      tension: widgetState.getSplineTension(),
      bias: widgetState.getSplineBias(),
      continuity: widgetState.getSplineContinuity(),
      boundaryCondition: widgetState.getSplineBoundaryCondition(),
      boundaryConditionValues: widgetState.getSplineBoundaryConditionValues(),
    });
    spline.computeCoefficients(inPoints);

    const outPoints = allocateArray(
      model.internalPolyData,
      "points",
      numVertices * model.resolution + 1
    ).getData();
    const outCells = new Uint32Array(numVertices * model.resolution + 2);
    outCells[0] = numVertices * model.resolution + 1;
    outCells[numVertices * model.resolution + 1] = 0;

    for (let i = 0; i < numVertices; i++) {
      for (let j = 0; j < model.resolution; j++) {
        const t = j / model.resolution;
        const point = spline.getPoint(i, t);
        outPoints[3 * (i * model.resolution + j) + 0] = point[0];
        outPoints[3 * (i * model.resolution + j) + 1] = point[1];
        outPoints[3 * (i * model.resolution + j) + 2] = point[2];
        outCells[i * model.resolution + j + 1] = i * model.resolution + j;
      }
    }

    const lastPointIndex = numVertices * model.resolution;
    const lastPoint = spline.getPoint(numVertices, 0);

    outPoints[3 * lastPointIndex + 0] = lastPoint[0];
    outPoints[3 * lastPointIndex + 1] = lastPoint[1];
    outPoints[3 * lastPointIndex + 2] = lastPoint[2];
    outCells[numVertices * model.resolution + 1] = lastPointIndex;

    // publicAPI.getMeasure([...outPoints]);

    if (model.fill) {
      model.internalPolyData.getPolys().setData(outCells);
    }

    model.internalPolyData
      .getLines()
      .setData(model.outputBorder ? outCells : []);

    model.internalPolyData.modified();
    outData[0] = model.internalPolyData;

    window.internalPolyData = model.internalPolyData;

    const color = widgetState.getBorderColor() ?? model.borderColor;
    model._pipelines.border.actor.getProperty().setColor(...color);
  };

  publicAPI.getSelectedState = (prop, compositeID) => model.state;

  publicAPI.setOutputBorder = macro.chain(publicAPI.setOutputBorder, (v) =>
    model._pipelines.border.actor.setVisibility(v)
  );
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  resolution: 16,
  fill: false,
  outputBorder: true,
  borderColor: [0.1, 1, 0.1],
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  vtkContextRepresentation.extend(publicAPI, model, initialValues);
  macro.get(publicAPI, model, ["mapper"]);
  macro.setGet(publicAPI, model, [
    "resolution",
    "boundaryCondition",
    "fill",
    "outputBorder",
    "borderColor",
  ]);
  macro.setGetArray(publicAPI, model, ["borderColor"], 3);

  // Object specific methods
  vtkSplineRepresentation(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, "vtkSplineRepresentation");

// ----------------------------------------------------------------------------

export default { newInstance, extend };
