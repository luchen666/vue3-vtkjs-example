import {
  bindSVGRepresentation,
  makeListenableSVGNode,
} from '@/vtk-utils/SVGHelpers'
import vtkInteractorObserver from '@kitware/vtk.js/Rendering/Core/InteractorObserver'
import vtkPulpPolylineWidget from '@/components/vtk/pulpMeasure3D'
// import vtkPulpPolylineWidget from '@/components/vtk/PolyLineWidget'

const { computeWorldToDisplay } = vtkInteractorObserver

const svgCleanupCallbacks = new Map()
const setPlupMeasureSVG = (opts: any) => {
  const { widget, renderer, handle } = opts

  const widgetId = handle.get()['widget_id'] || '1'

  const bindObj = bindSVGRepresentation(renderer, widget.getWidgetState(), {
    mapState(widgetState: any, { size }: any) {
      const data: any = { list: [] }

      widgetState.getHandleList().forEach((item: any) => {
        const origin = item.getOrigin()
        if (origin) {
          const coords = computeWorldToDisplay(renderer, ...origin)
          data.list.push([coords[0], size[1] - coords[1]])
        }
      })

      const moveOrigin = widgetState.getMoveHandle().getOrigin()
      if (moveOrigin) {
        const moveCoords = computeWorldToDisplay(renderer, ...moveOrigin)
        data.list.push([moveCoords[0], size[1] - moveCoords[1]])
      }
      return data
    },
    render(data: any, h: any) {
      if (!data) return []
      const nodes: any[] = []

      if (data.list.length < 2) return []
      data.list.forEach((item: number[], idx: number) => {
        if (idx === data.list.length - 1) return
        const line = {
          key: 'lineText',
          attrs: {
            stroke: 'green',
            fill: 'none',
            x1: data.list[idx][0],
            y1: data.list[idx][1],
            x2: data.list[idx + 1][0],
            y2: data.list[idx + 1][1],
          },
        }
        const lineH = h('line', line)
        nodes.push(lineH)
      })
      return nodes
    },
  })
  svgCleanupCallbacks.set(widgetId, bindObj)
}

export const addPulpMeasure = (view: any) => {
  const { widgetManager, renderer, bounds, ysqPicker } = view
  const widget = vtkPulpPolylineWidget.newInstance()
  widget.placeWidget(bounds)

  const currentHandle = widgetManager.addWidget(widget)
  currentHandle.setVisibility(true)
  currentHandle.setScaleInPixels(false)
  currentHandle.setHandleSelector && currentHandle.setHandleSelector(ysqPicker, renderer)

  widgetManager.enablePicking()
  widgetManager.grabFocus(widget)

  // setPlupMeasureSVG({
  //   widget,
  //   renderer,
  //   handle: currentHandle,
  //   widgetManager,
  // })

  currentHandle.onStartInteractionEvent(() => {
    // viewState.setViewState({ currentMeasureViewName: view.viewCode });
    // console.log('StartInteraction')
  })

  currentHandle.onInteractionEvent(() => {
    // console.log('onInteraction',widget, currentHandle.getWidgetState())
    // currentHandle.getMeasure &&
    // console.log(widget.getMeasure(), 11);
    
    currentHandle.setText(Number(widget.getMeasure()));
  })
  currentHandle.onEndInteractionEvent(() => {
    console.log('onInteraction')

    window.widget = widget;
    window.currentHandle = currentHandle;
    const points = []
    // currentHandle.getMeasure &&
    // currentHandle.setText(Number(currentHandle.getMeasure()).toFixed(2));
    currentHandle
      .getWidgetState()
      .getHandleList()
      .forEach((item: any) => {
        const origin = item.getOrigin()
        if (origin) {
          points.push(origin)
        }
      })
    console.log('points', points)
  })
}

const newPoints = [
  [60.60920926091053, 33.23152120109721, 55.21723880710375],
  [68.45248021547981, 32.55030404448782, 54.17237850423226],
  [68.73981679876947, 31.519405163965335, 52.52672352720968],
  [68.58308775333875, 30.156121400004587, 50.88106855018711],
  [68.32187267762087, 29.38687719510449, 49.65335769431311],
]
export const addPoints = (view: any) => {
  const { widgetManager, renderer, bounds, ysqPicker } = view
  const widget = vtkPulpPolylineWidget.newInstance()
  widget.placeWidget(bounds)
  const currentHandle = widgetManager.addWidget(widget)
  currentHandle.setScaleInPixels(false)
  currentHandle.setHandleSelector && currentHandle.setHandleSelector(ysqPicker, renderer)

  widgetManager.grabFocus(widget);
  widgetManager.enablePicking();

  const widgetState = widget.getWidgetState();
  for (let i = 0; i < newPoints.length; i++) {
    widgetState.addHandle().setOrigin(...newPoints[i]);
  }

  currentHandle.loseFocus();
  widgetManager.releaseFocus(widget);
  currentHandle.setVisibility(true)
  
  // currentHandle.onStartInteractionEvent(() => {
  //   console.log('StartInteraction')
  // })
  // currentHandle.onInteractionEvent(() => {
  //   console.log('onInteraction')
  // })
  // currentHandle.onEndInteractionEvent(() => {
  //   console.log('onInteraction')
  //   const points = []
  // })
}
