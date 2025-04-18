import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  attributesModule,
} from 'snabbdom'

// 初始化 Snabbdom
const patch = init([
  attributesModule,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
])

// 定义初始点的坐标
let x1 = 50, y1 = 50 // 点 A
let x2 = 150, y2 = 150 // 点 B
let x3 = 250, y3 = 50 // 点 C

// 文本初始位置
let textPosition = { x: x3 + 10, y: y3 }

// 拖动相关变量
let isDragging = false
let offsetX = 0, offsetY = 0

// 定义 span 的样式
const spanStyle = {
  position: 'absolute',
  fontSize: '14px',
  cursor: 'move',
  backgroundColor: 'white',
  padding: '2px 5px',
  border: '1px solid black',
  borderRadius: '4px',
}

// 创建虚拟 DOM
function render() {
  return h('div', [
    h('svg', { attrs: { width: '1000', height: '600' } }, [
      // 绘制虚折线 (A -> B -> C)
      h('polyline', {
        attrs: {
          points: `${x1},${y1} ${x2},${y2} ${x3},${y3}`, // 动态更新路径
          fill: 'none',
          stroke: 'black',
          'stroke-dasharray': '5,5', // 虚线样式
          'stroke-width': '2',
        },
      }),
    ]),
    // 文本使用 span 标签
    h('span', {
      style: {
        ...spanStyle,
        left: `${textPosition.x}px`,
        top: `${textPosition.y}px`,
      },
      on: {
        mousedown: handleMouseDown,
      },
    }, '龋病'),
  ])
}

// 鼠标按下事件
function handleMouseDown(event: MouseEvent) {
  isDragging = true
  const target = event.target as HTMLElement
  offsetX = event.clientX - parseFloat(target.style.left || '0')
  offsetY = event.clientY - parseFloat(target.style.top || '0')

  // 监听全局的 mousemove 和 mouseup 事件
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 鼠标移动事件
function handleMouseMove(event: MouseEvent) {
  if (!isDragging) return

  // 更新文本位置和点 C 的坐标
  textPosition.x = event.clientX - offsetX
  textPosition.y = event.clientY - offsetY
  x3 = textPosition.x - 10 // 同步更新点 C 的坐标
  y3 = textPosition.y

  // 防止拖出边界（可选）
  const container = document.getElementById('appId') as HTMLElement
  if (container) {
    const rect = container.getBoundingClientRect()
    textPosition.x = Math.max(rect.left, Math.min(rect.right - 50, textPosition.x))
    textPosition.y = Math.max(rect.top, Math.min(rect.bottom - 20, textPosition.y))
    x3 = textPosition.x - 10
    y3 = textPosition.y
  }

  // 更新虚拟 DOM
  vnode = patch(vnode, render())
}

// 鼠标松开事件
function handleMouseUp() {
  isDragging = false

  // 移除全局监听器
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

// 初始虚拟 DOM
let vnode = render()

// 挂载虚拟 DOM 到页面
export const createText = () => {
  const container = document.getElementById('appId') as HTMLElement
  if (!container) {
    console.error('Container with id "appId" not found!')
    return
  }

  // 如果容器已有内容，先清空
  if (container.firstChild) {
    patch(container, h('div'))
  }

  // 挂载新的虚拟 DOM
  vnode = patch(container, vnode)
}