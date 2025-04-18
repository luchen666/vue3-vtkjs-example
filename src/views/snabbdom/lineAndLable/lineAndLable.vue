<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div style="position: absolute; top: 20px; right: 20px">
    <button>GrabFocus</button>
    <input type="checkbox" />Show SVG layer
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor'
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource'
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper'
import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget'
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager'
import vtkInteractorObserver from '@kitware/vtk.js/Rendering/Core/InteractorObserver'

import { bindSVGRepresentation } from './SnabbdomHelpers.js'

const { computeWorldToDisplay } = vtkInteractorObserver

const containerRef = ref(null)

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
      const nodes: any[] = []
      const labels: any[] = []
      if (!data || data.list.length < 2) return { nodes, labels }

      data.list.forEach((item: number[], idx: number) => {
        if (idx === data.list.length - 1) return
        const [x1, y1] = data.list[idx]
        const [x2, y2] = data.list[idx + 1]
        const line = {
          key: 'lineText',
          attrs: { stroke: 'green', fill: 'none', x1, y1, x2, y2 },
        }
        const lineH = h('line', line)
        nodes.push(lineH)
      })

      const [x1, y1] = data.list[0]
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
            position: 'absolute',
            fontSize: '14px',
            cursor: 'move',
            backgroundColor: 'white',
            padding: '2px 5px',
            border: '1px solid black',
            borderRadius: '4px',
            pointerEvents: 'auto',
            left: `${x2}px`,
            top: `${y2}px`,
          },
          on: {
            // mousedown: handleMouseDown,
            mouseup: () => {
              console.log('mouseup');
            },
            mousedown: (event: any) => {
              console.log('mousedown');
            },
            mousemove: (event: any) => {
              console.log('mousemove');
            },
          },
        },
        '龋病',
      )
      labels.push(spanText)
      return { nodes, labels }
    },
  })
  svgCleanupCallbacks.set(widgetId, bindObj)
}

onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  const renderer = fullScreenRenderer.getRenderer()

  const cone = vtkConeSource.newInstance()
  const mapper = vtkMapper.newInstance()
  const actor = vtkActor.newInstance()

  actor.setMapper(mapper)
  mapper.setInputConnection(cone.getOutputPort())
  actor.getProperty().setOpacity(0.5)

  renderer.addActor(actor)

  // Widget manager
  const widgetManager = vtkWidgetManager.newInstance()
  widgetManager.setRenderer(renderer)

  const widget = vtkPolyLineWidget.newInstance()
  widget.placeWidget(cone.getOutputData().getBounds())

  const currentHandle = widgetManager.addWidget(widget)

  renderer.resetCamera()
  widgetManager.enablePicking()
  widgetManager.grabFocus(widget)

  setPlupMeasureSVG({
    widget,
    renderer,
    handle: currentHandle,
    widgetManager,
  })
})
</script>
