import vtkDistance2Widget from "@/components/vtk/Distance3DWidget";
import vtkAngle2DWidget from "@/components/vtk/Angle2DWidget";
import vtkArea2DWidget from "@/components/vtk/Area2DWidget";
import vtkPolyline2DWidget from "@/components/vtk/Polyline2DWidget";
import vtkBezierWidget from "@/components/vtk/BezierWidget";
import vtkCurveWidget from "@/components/vtk/CurveWidget";
import vtkPointPicker from "@kitware/vtk.js/Rendering/Core/PointPicker";
import macro from "@kitware/vtk.js/macros.js";
import { useCurvedStore, useCommonStore } from "@/stores/index";
import { crossSectionLocalCoordinateToWorldApi } from "@/api/wasmApi/wasmWork";
import {
  addSurfaceMeasure,
  updateSurfaceMeasure,
  findSurfaceMeasure,
} from "@/api/curved";
import {
  CURVE_TOOL_EVENT_NAME_MAP,
  VIEWTYPE,
} from "@/views/curvedSurface/constant";
import { MeasureTitle, MeasureType } from "@/components/common/constant";

type anyTypeObj = { [key in string]: any };

const curvedState = useCurvedStore();
const commonState = useCommonStore();

const widgetList = {
  [CURVE_TOOL_EVENT_NAME_MAP.celiang.distance]: vtkDistance2Widget,
  [CURVE_TOOL_EVENT_NAME_MAP.celiang.angleDistance]: vtkAngle2DWidget,
  [CURVE_TOOL_EVENT_NAME_MAP.celiang.area]: vtkArea2DWidget,
  [CURVE_TOOL_EVENT_NAME_MAP.celiang.polylineDistance]: vtkPolyline2DWidget,
  [CURVE_TOOL_EVENT_NAME_MAP.celiang.curveDistance]: vtkCurveWidget,
  [CURVE_TOOL_EVENT_NAME_MAP.zydc.curveLine]: vtkBezierWidget, // 牙弓线
};

const makeLineWidgetData = async ({
  view,
  id,
  viewWidget,
  measureType,
}: any) => {
  const handleList = viewWidget.getState().widgetState.handleList;
  const points = handleList.map((item: any) => item.origin);

  // 获取当前存储的matrix
  const storeLocation = commonState.autoToothLine;
  const viewMatrix: number[] = storeLocation.matrix;

  const viewCode = view.viewCode || view.viewName;
  const lineData = {
    viewMatrix,
    lineInfo: points,
    vtkClassName: viewWidget.getClassName(),
    type: MeasureType[measureType],
    title: MeasureTitle[measureType],
    id: id || "",
    viewName: viewCode,
    sliceNum: viewMatrix[11],
    sliceInfo: {},
  };
  if (viewCode === VIEWTYPE.slice) {
    lineData.lineInfo = [];
    for (let i = 0; i < points.length; i++) {
      const index = view?.viewIdx;
      lineData.lineInfo[i] = await crossSectionLocalCoordinateToWorldApi(
        index,
        points[i]
      );
    }
    const info = curvedState.curveViewList[viewCode];
    const axisLocation = curvedState.curveViewList[VIEWTYPE.axial]?.location;
    const planeInfo = curvedState.curveViewList[VIEWTYPE.plane];
    const angle_radian = curvedState.curveViewList[VIEWTYPE.plane].angle_radian;
    const toothLine = storeLocation.curve_points;
    lineData.sliceInfo = {
      ...info,
      toothLine,
      axisLocation,
      angle_radian,
      planeAngle: planeInfo.angle_radian,
      planeLocation: planeInfo.location,
    };
  }
  return lineData;
};

let isAddFlag = false;
const saveMeasure = async (
  view: any,
  widget: any,
  viewWidget: any,
  measureType: string,
  lineId?: any
) => {
  // 阻止重复执行
  if (isAddFlag) {
    return;
  }
  isAddFlag = true;
  setTimeout(() => {
    isAddFlag = false;
  }, 500);
  const viewList = curvedState.measureViewList || {};
  const viewCode = view.viewCode || view.viewName;
  const list = viewList[viewCode] || [];
  const id = lineId.id ? lineId.id : viewWidget.id;
  // 判断是新增还是修改
  let findIndex = -1;
  if (id) {
    findIndex = list.findIndex((v: any) => v.id === id);
  }
  measureType = measureType ? measureType : list[findIndex].toolTypeCode;
  const lineData = await makeLineWidgetData({
    view,
    id,
    viewWidget,
    measureType,
  });

  if (findIndex >= 0) {
    const params = {
      id: lineData.id,
      toolTypeCode: measureType,
      points: JSON.stringify(lineData),
    };
    await updateSurfaceMeasure(params);
    list[findIndex] = {
      id: lineData.id,
      toolTypeCode: measureType,
      lineData,
      viewWidget,
    };
    findSurfaceMeasure();
  } else if (measureType !== CURVE_TOOL_EVENT_NAME_MAP.zydc.curveLine) {
    const params = {
      toolTypeCode: measureType,
      points: JSON.stringify(lineData),
    };
    const res = await addSurfaceMeasure(params);
    if (res?.code === 200) {
      lineData.id = res.data;
      lineId.id = res.data;
    }
    list.unshift({
      toolTypeCode: measureType,
      viewWidget,
      id: lineData.id || "",
      points: lineData.lineInfo,
      matrix: lineData.viewMatrix,
      sliceInfo: lineData.sliceInfo,
      toolParentTypeCode: lineData.toolParentTypeCode,
      lineData,
    });
  }
  viewList[lineData.viewName] = list;
  curvedState.setViewState({ measureViewList: viewList });
};

export function createPointPicker(view: anyTypeObj) {
  const picker = vtkPointPicker.newInstance();
  picker.setPickFromList(1);
  picker.initializePickList();
  picker.addPickList(view.resliceActor);
  return picker;
}

let clickCount = 0;
let viewWidget: any = null;
export const useMeasureWidget = ({
  view,
}:
  | {
      view: any;
    }
  | anyTypeObj) => {
  const widgetManager = view.widgetManager;

  view.interactor.onMouseMove(
    macro.throttle((event: any) => {
      const name = curvedState.currentMeasureViewName;
      const viewCode = view.viewCode || view.viewName;
      if (curvedState.currentToolName && (!name || name === viewCode)) {
        const widget = widgetList[curvedState.currentToolName].newInstance();

        // 添加当前的实例
        viewWidget = widgetManager.addWidget(widget, viewCode);
        viewWidget.setHandleVisibility(false);
        viewWidget.setTextStateIndex(0);
        viewWidget.setVisibility(true);
        widgetManager.enablePicking();
        widgetManager.grabFocus(widget);

        viewWidget.onStartInteractionEvent(() => {
          clickCount = clickCount + 1;
          curvedState.setViewState({
            currentMeasureViewName: viewCode + (view.viewIdx || ""),
          });
        });

        viewWidget.onInteractionEvent(() => {
          viewWidget.setText(Number(widget.getMeasure()).toFixed(2));
        });

        const lineId = { id: "" };
        viewWidget.onEndInteractionEvent(() => {
          saveMeasure(
            view,
            widget,
            viewWidget,
            curvedState.currentToolName,
            lineId
          );
          curvedState.setViewState({ isMeasureEnd: new Date() });
          curvedState.setViewState({ currentMeasureViewName: "" });
          curvedState.setViewState({ currentToolName: "" });

          viewWidget.setText(Number(widget.getMeasure()).toFixed(2));

          const widgetState = viewWidget.getWidgetState();
          const handleList = widgetState.getHandleList();
          const points = viewWidget
            .getState()
            .widgetState.handleList.map((item: any) => item.origin);
          // 绘制点，自动连线
          for (let i = 0; i < handleList.length; ++i) {
            points[i][2] = 0; // z 坐标需要设置为0，否则无法拖拽
            handleList[i].setOrigin(points[i]);
          }
          clickCount = 0;
          viewWidget = null;
        });
      }
    }, 100)
  );
  view.interactor.onMouseLeave(
    macro.throttle(() => {
      const name = curvedState.currentMeasureViewName;
      const viewCode = view.viewCode || view.viewName;
      if (clickCount === 0 && (!name || name !== viewCode)) {
        widgetManager.releaseFocus(viewWidget);
        widgetManager.removeWidget(viewWidget);
        viewWidget = null;
      }
    }, 100)
  );
};

export { useMeasureWidget as default };
