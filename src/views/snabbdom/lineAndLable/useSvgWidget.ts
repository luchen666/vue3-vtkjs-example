import vtkInteractorObserver from '@kitware/vtk.js/Rendering/Core/InteractorObserver'
import { bindSVGRepresentation } from './SnabbdomHelpers.js'

const { computeWorldToDisplay } = vtkInteractorObserver

const spanTextStyle = {
  position: 'absolute',
  fontSize: '14px',
  cursor: 'move',
  backgroundColor: 'white',
  padding: '2px 5px',
  border: '1px solid black',
  borderRadius: '4px',
  pointerEvents: 'auto',
}

export const useWidgetAndSVG = ({ widgetManager }: any) => {
  const setWidgetSVG = (opts: any) => {
    const { widget, renderer, handle } = opts
    return bindSVGRepresentation(renderer, widget.getWidgetState(), {
      mapState(widgetState: any, { size }: any) {
        const data: any = []
        if (!handle.getVisibility()) return data

        widgetState.getHandleList().forEach((item: any) => {
          const origin = item.getOrigin()
          if (origin) {
            const coords = computeWorldToDisplay(renderer, ...origin)
            data.push([coords[0], size[1] - coords[1]])
          }
        })

        const moveOrigin = widgetState.getMoveHandle().getOrigin()
        if (moveOrigin) {
          const moveCoords = computeWorldToDisplay(renderer, ...moveOrigin)
          data.push([moveCoords[0], size[1] - moveCoords[1]])
        }
        return data
      },
      render(data: any, h: any) {
        const nodes: any[] = []
        const labels: any[] = []
        if (!data || data.length < 2) return { nodes, labels }

        data.forEach((item: number[], idx: number) => {
          if (idx === data.length - 1) return
          const [x1, y1] = data[idx]
          const [x2, y2] = data[idx + 1]
          const line = {
            key: 'polyline',
            attrs: { stroke: 'green', fill: 'none', x1, y1, x2, y2 },
          }
          const lineH = h('line', line)
          nodes.push(lineH)
        })

        const [x1, y1] = data[0]
        const [x2, y2] = [x1 + 40, y1 + 40]
        const dashedLine = {
          key: 'dashedLine',
          attrs: {
            stroke: 'green',
            fill: 'none',
            'stroke-dasharray': '3 5',
            x1,
            y1,
            x2,
            y2,
          },
        }
        const dashedlineH = h('line', dashedLine)
        nodes.push(dashedlineH)
        const spanText = h(
          'span',
          {
            style: {
              ...spanTextStyle,
              left: `${x2}px`,
              top: `${y2}px`,
            },
            on: {
              // mousedown: handleMouseDown,
              mouseup: () => {
                console.log('mouseup')
              },
              mousedown: (event: any) => {
                console.log('mousedown')
              },
              mousemove: (event: any) => {
                console.log('mousemove')
              },
            },
          },
          '龋病',
        )
        labels.push(spanText)
        return { nodes, labels }
      },
    })
  }

  // 删除widget
  const removeWidgetAndSVG = (obj: any) => {
    const { widgetId } = obj
    widgetManager = widgetManager || obj.widgetManager;
    const widgetList = widgetManager.getWidgets()
    widgetList.forEach((widget: any) => {
      const id = widget.get()?.widgetId
      if (id && +id === widgetId) {
        // 清除svg
        widget.get()?.cleanSVG()
        // 移除widget
        widgetManager.removeWidget(widget)
      }
    })
  }

// 显示隐藏widget
  const showOrHideWidgetAndSVG = (obj: any) => {
    const { widgetId, isShow } = obj;
    widgetManager = widgetManager || obj.widgetManager;
    const widgetList = widgetManager.getWidgets()
    widgetList.forEach((widget: any) => {
      const id = widget.get()?.widgetId
      if (id && +id === widgetId) {
        let visibility = isShow === undefined ? widget.getVisibility() : isShow
        widget.setVisibility(!visibility)
        // 触发widgetstate 的更新，保证svg 更新
        widget.getWidgetState().modified()
        widget.getInteractor().render();
      }
    })
  }
  return {
    setWidgetSVG,
    removeWidgetAndSVG,
    showOrHideWidgetAndSVG
  }
}
