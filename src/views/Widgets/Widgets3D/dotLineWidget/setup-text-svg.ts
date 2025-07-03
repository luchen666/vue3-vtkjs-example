import {
  bindSVGRepresentation,
  makeListenableSVGNode,
} from '@/vtk.js/Utilities/SVGHelpers'
import vtkInteractorObserver from '@kitware/vtk.js/Rendering/Core/InteractorObserver'
const { computeWorldToDisplay } = vtkInteractorObserver

type TextSVGOptions = {
  headPoint?: boolean
  textColor?: string
  textMoveable?: boolean
  showCircle?: boolean
}
// 为widget text绘制svg
export function setupTextSVG(w: any, renderer: any, opts: TextSVGOptions) {
  let { headPoint, textColor } = opts
  const { textMoveable = false, showCircle = true } = opts
  if (!headPoint) {
    headPoint = false
  }
  if (!textColor) {
    textColor = 'red'
  }
  bindSVGRepresentation(renderer, w.getWidgetState(), {
    mapState(widgetState: any, { size }: any) {
      console.log(1111);
      
      if (w.getVisibility() !== true) return null

      const data = []
      const len = widgetState.getHandleList().length
      for (let i = 0; i < len; i++) {
        const origin = widgetState.getHandleList()[i].getOrigin()
        if (!origin) continue
        const coords = computeWorldToDisplay(renderer, ...origin)
        const position = [coords[0], size[1] - coords[1]]
        data.push({
          text: i + 1,
          position,
        })
      }
      return data
    },
    // 注意这里的h函数是snabbdom的虚拟dom方式；而不是vue的虚拟dom
    render(data: any, h: any) {
      if (!data) return []

      const attrStyle = {
        dx: headPoint ? 12 : -6,
        dy: headPoint ? -12 : 0,
        fill: textColor,
        'font-size': 14,
      }
      const domList = []
      for (let i = 0; i < data.length; i++) {
        const attrs = {
          x: data[i].position[0],
          y: data[i].position[1],
          ...attrStyle,
        }
        let textNode = null
        if (textMoveable) {
          const node = {
            key: 'lineText',
            attrs,
            on: {
              pointerdown: e => {
                w.activateHandle({
                  selectedState: w.getWidgetState().getMoveHandle(),
                })
                // w.grabFocus();
              },
              pointerenter: e => {
                // todo xxx feat 释放时，widget解除激活
                w.loseFocus()
              },
            },
          }
          textNode = makeListenableSVGNode(h('text', node, [data[i].text]))
        } else {
          textNode = h('text', { key: 'lineText', attrs }, [data[i].text])
        }
        domList.push(textNode)
      }

      return domList
    },
  })
}
