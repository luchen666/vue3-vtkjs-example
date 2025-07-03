import vtkDotLineWidget from '@/components/vtk/dotLineWidget'
import { usePointStore } from '@/stores/pointStore'
import { watch } from 'vue'
import { setupTextSVG } from './setup-text-svg'

const NerveType = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
}
export const useNerveWidget = (obj: any) => {
  const { widgetManager, viewCode, renderWindow } = obj
  const pointStore = usePointStore()

  const widget = vtkDotLineWidget.newInstance()
  const viewWidget = widgetManager.addWidget(widget)

  widgetManager.enablePicking()
  widgetManager.grabFocus(widget)
  const id = viewCode + '_' + Date.now().toString()
  setupTextSVG(viewWidget, obj.renderer, {
    headPoint: true,
    textMoveable: true,
    showCircle: false,
  });

  viewWidget.onEndInteractionEvent(() => {
    const pointList = widget
      .getWidgetState()
      .getHandleList()
      .map((item: any) => item.getOrigin())

    const isActive = viewWidget.getActiveState()?.getActive() === true
    // 新增， 编辑， 删除
    let len = pointStore.nerveList?.[id]?.length || 0
    let widgetData = {
      id,
      viewCode: viewCode,
      type: isActive ? NerveType.ADD : NerveType.EDIT,
      point: [],
      idx: 0,
    }
    if (pointList.length < len) {
      // 删除
      widgetData = {
        ...widgetData,
        type: NerveType.DELETE,
        idx: pointList.length - 1,
      }
      pointStore.updateStore(widgetData)
    } else if (isActive) {
      // 新增
      widgetData = {
        ...widgetData,
        point: pointList[pointList.length - 1],
        idx: pointList.length - 1,
      }
      pointStore.updateStore(widgetData)
    } else {
      // 编辑
      for (let i = 0; i < pointList.length; i++) {
        const storeP = pointStore.nerveList?.[id]?.[i];
        if (storeP && pointList[i].toString() !== storeP.toString()) {
          widgetData = {
            ...widgetData,
            idx: i,
            point: pointList[i],
          }
          pointStore.updateStore(widgetData)
          break
        }
      }
    }
    pointStore.setPointList(pointList, id)
  })

  watch(
    () => pointStore.nerveState,
    () => {
      const nerveState = pointStore.nerveState
      if (nerveState.viewCode === viewCode) return

      if (!viewWidget) return
      const widgetState = viewWidget.getWidgetState()
      if (nerveState.type === NerveType.ADD) {
        widgetState.addHandle().setOrigin(nerveState.point)
      } else if (nerveState.type === NerveType.EDIT) {
        widgetState
          .getHandleList()
          [nerveState.idx].setOrigin(nerveState.point)
      } else if (nerveState.type === NerveType.DELETE) {
        widgetState.removeHandle(nerveState.idx)
      }
      renderWindow.getInteractor().render()
      renderWindow.render()
    },
  )
}
