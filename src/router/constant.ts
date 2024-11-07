import type { RouteRecordRaw } from 'vue-router'

export const menuList = {
  IO: {
    Geometry: [
      {
        menu: 'STLReader',
        path: '/STLReader',
        name: 'STLReader.vue',
        component: () => import('@/views/IO/Geometry/STLReader.vue'),
      },
      {
        menu: 'PLYReader',
        path: '/PLYReader',
        name: 'PLYReader.vue',
        component: () => import('@/views/IO/Geometry/PLYReader.vue'),
      },
      {
        menu: 'DRCReader',
        path: '/DRCReader',
        name: 'DRCReader.vue',
        component: () => import('@/views/IO/Geometry/DRCReader.vue'),
      },
    ],
  },
  Rendering: {
    Core: [
      {
        menu: 'PointPicker',
        path: '/PointPicker',
        name: 'PointPicker.vue',
        component: () => import('@/views/Rendering/Core/PointPicker.vue'),
      },
    ],
  },
  Examples: {
    Volume: [
      {
        menu: 'MultiSliceImageMapper',
        path: '/MultiSliceImageMapper',
        name: 'MultiSliceImageMapper.vue',
        component: () =>
          import('@/views/Examples/Volume/MultiSliceImageMapper.vue'),
      },
      {
        menu: 'VolumeCT',
        path: '/VolumeCT',
        name: 'VolumeCT.vue',
        component: () => import('@/views/Examples/Volume/VolumeCT.vue'),
      },
    ],
  },
  Interaction: {
    Manipulators: [
      {
        menu: 'KeyboardCameraManipulator',
        path: '/KeyboardCameraManipulator',
        name: 'KeyboardCameraManipulator.vue',
        component: () =>
          import(
            '@/views/Interaction/Manipulators/KeyboardCameraManipulator.vue'
          ),
      },
    ],
  },
}

const routeList: RouteRecordRaw[] = []
Object.values(menuList).forEach(prop => {
  const list = Object.values(prop)[0]
  routeList.push(...Object.values(list))
})

export { routeList }

const oldList = [
  // {
  //   name: "HardwareSelector",
  //   path: "HardwareSelector",
  //   keepAlive: true,
  // },
  // {
  //   name: "svg直线",
  //   path: "SvgLine",
  //   keepAlive: true,
  // },
  // {
  //   name: "svg折线",
  //   router: "svgPolyLine",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "picker",
  //   path: "cellPicker",
  //   keepAlive: true,
  // },
  // {
  //   name: "全景3D",
  //   router: "panorama3D",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "buffer3D",
  //   router: "buffer3D",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "种植体widget",
  //   router: "implantWidget3D",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "follow2D",
  //   router: "follow2D",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "骨密度",
  //   path: "guMiDu",
  //   keepAlive: true,
  // },
  // {
  //   name: "manyRender",
  //   path: "manyRender",
  //   keepAlive: true,
  // },
  // {
  //   name: "多视图1",
  //   path: "manyRender1",
  //   keepAlive: true,
  // },
  // {
  //   name: "多视图",
  //   path: "manyRender2",
  //   keepAlive: true,
  // },
  // {
  //   name: "简单视图",
  //   path: "EasyImage",
  //   keepAlive: true,
  // },
  // {
  //   name: "种植体灰度",
  //   path: "implantHu",
  //   keepAlive: true,
  // },
  // {
  //   name: "平面",
  //   router: "plane",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "canvas事件",
  //   router: "interactorCanvas",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "obbtree",
  //   router: "obbtree",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "牙颌obbtree",
  //   router: "obbtree",
  //   path: "obbtreeStl",
  //   keepAlive: true,
  // },
  // {
  //   name: "Pano3D", path: "Pano3D", keepAlive: true
  // },
  // {
  //   name: "管道", path: "TubeFilter", keepAlive: true
  // },
  // {
  //   name: "神经线",
  //   path: "Nerve",
  //   keepAlive: true,
  // },
  // {
  //   name: "神经线Cutter", path: "NerveCutter", keepAlive: true
  // },
  // {
  //   name: "神经线Update", path: "NerveUpdate", keepAlive: true
  // },
  // {
  //   name: "神经线编辑", path: "nerveEdit", keepAlive: true
  // },
  // {
  //   name: "气道",
  //   path: "airway",
  //   keepAlive: true,
  // },
  // {
  //   name: "ObjReader",
  //   path: "ObjReader",
  //   keepAlive: true,
  // },
  // {
  //   name: "种植体灰度", path: "implantHu", keepAlive: true
  // },
  // {
  //   name: "圆柱",
  //   router: "cylinder",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "压缩",
  //   router: "draco",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "ply",
  //   router: "ply",
  //   path: "index",
  //   keepAlive: true,
  // },
  // {
  //   name: "方向组件", path: "orientationMarkerWidget", keepAlive: true
  // },
  // {
  //   name: "自定义组件", path: "DiyWidget", keepAlive: true
  // },
]
