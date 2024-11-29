const General = [
  {
    menu: 'Calculator',
    path: '/Calculator',
    name: 'Calculator.vue',
    component: () => import('@/views/Filters/General/Calculator.vue'),
  },
  {
    menu: 'ClipClosedSurface',
    path: '/ClipClosedSurface',
    name: 'ClipClosedSurface.vue',
    component: () => import('@/views/Filters/General/ClipClosedSurface.vue'),
  },
  {
    menu: 'ContourLoopExtraction',
    path: '/ContourLoopExtraction',
    name: 'ContourLoopExtraction.vue',
    component: () =>
      import('@/views/Filters/General/ContourLoopExtraction.vue'),
  },
  {
    menu: 'ContourTriangulator',
    path: '/ContourTriangulator',
    name: 'ContourTriangulator.vue',
    component: () => import('@/views/Filters/General/ContourTriangulator.vue'),
  },
  {
    menu: 'ImageCropFilter',
    path: '/ImageCropFilter',
    name: 'ImageCropFilter.vue',
    component: () => import('@/views/Filters/General/ImageCropFilter.vue'),
  },
  {
    menu: 'ImageMarchingCubes',
    path: '/ImageMarchingCubes',
    name: 'ImageMarchingCubes.vue',
    component: () => import('@/views/Filters/General/ImageMarchingCubes.vue'),
  },
  // {
  //   menu: 'ImageMarchingSquares',
  //   path: '/ImageMarchingSquares',
  //   name: 'ImageMarchingSquares.vue',
  //   component: () =>
  //     import('@/views/Filters/General/ImageMarchingSquares.vue'),
  // },
  // {
  //   menu: 'ImageOutlineFilter',
  //   path: '/ImageOutlineFilter',
  //   name: 'ImageOutlineFilter.vue',
  //   component: () =>
  //     import('@/views/Filters/General/ImageOutlineFilter.vue'),
  // },
  // {
  //   menu: 'ImageStreamline',
  //   path: '/ImageStreamline',
  //   name: 'ImageStreamline.vue',
  //   component: () =>
  //     import('@/views/Filters/General/ImageStreamline.vue'),
  // },
  // {
  //   menu: 'OBBTree',
  //   path: '/OBBTree',
  //   name: 'OBBTree.vue',
  //   component: () =>
  //     import('@/views/Filters/General/OBBTree.vue'),
  // },
  // {
  //   menu: 'OutlineFilter',
  //   path: '/OutlineFilter',
  //   name: 'OutlineFilter.vue',
  //   component: () =>
  //     import('@/views/Filters/General/OutlineFilter.vue'),
  // },
  // {
  //   menu: 'ScalarToRGBA',
  //   path: '/ScalarToRGBA',
  //   name: 'ScalarToRGBA.vue',
  //   component: () =>
  //     import('@/views/Filters/General/ScalarToRGBA.vue'),
  // },
  // {
  //   menu: 'TriangleFilter',
  //   path: '/TriangleFilter',
  //   name: 'TriangleFilter.vue',
  //   component: () =>
  //     import('@/views/Filters/General/TriangleFilter.vue'),
  // },
  // {
  //   menu: 'TubeFilter',
  //   path: '/TubeFilter',
  //   name: 'TubeFilter.vue',
  //   component: () =>
  //     import('@/views/Filters/General/TubeFilter.vue'),
  // },
  // {
  //   menu: 'WarpScalar',
  //   path: '/WarpScalar',
  //   name: 'WarpScalar.vue',
  //   component: () =>
  //     import('@/views/Filters/General/WarpScalar.vue'),
  // },
  // {
  //   menu: 'WindowedSincPolyDataFilter',
  //   path: '/WindowedSincPolyDataFilter',
  //   name: 'WindowedSincPolyDataFilter.vue',
  //   component: () =>
  //     import('@/views/Filters/General/WindowedSincPolyDataFilter.vue'),
  // },
]

const Sources = [
  {
    menu: 'ArrowSource',
    path: '/ArrowSource',
    name: 'ArrowSource.vue',
    component: () => import('@/views/Filters/Sources/ArrowSource.vue'),
  },
  // {
  //   menu: 'CircleSource',
  //   path: '/CircleSource',
  //   name: 'CircleSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/CircleSource.vue'),
  // },
  // {
  //   menu: 'ConcentricCylinderSource',
  //   path: '/ConcentricCylinderSource',
  //   name: 'ConcentricCylinderSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/ConcentricCylinderSource.vue'),
  // },
  // {
  //   menu: 'ConeSource',
  //   path: '/ConeSource',
  //   name: 'ConeSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/ConeSource.vue'),
  // },
  // {
  //   menu: 'CubeSource',
  //   path: '/CubeSource',
  //   name: 'CubeSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/CubeSource.vue'),
  // },
  // {
  //   menu: 'Cursor3D',
  //   path: '/Cursor3D',
  //   name: 'Cursor3D.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/Cursor3D.vue'),
  // },
  // {
  //   menu: 'CylinderSource',
  //   path: '/CylinderSource',
  //   name: 'CylinderSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/CylinderSource.vue'),
  // },
  // {
  //   menu: 'LineSource',
  //   path: '/LineSource',
  //   name: 'LineSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/LineSource.vue'),
  // },
  // {
  //   menu: 'PlaneSource',
  //   path: '/PlaneSource',
  //   name: 'PlaneSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/PlaneSource.vue'),
  // },
  // {
  //   menu: 'PlaneSource',
  //   path: '/PlaneSource',
  //   name: 'PlaneSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/PlaneSource.vue'),
  // },
  // {
  //   menu: 'PointSource',
  //   path: '/PointSource',
  //   name: 'PointSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/PointSource.vue'),
  // },
  // {
  //   menu: 'SLICSource',
  //   path: '/SLICSource',
  //   name: 'SLICSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/SLICSource.vue'),
  // },
  // {
  //   menu: 'SphereSource',
  //   path: '/SphereSource',
  //   name: 'SphereSource.vue',
  //   component: () =>
  //     import('@/views/Filters/Sources/SphereSource.vue'),
  // },
]

export const Filters = {
  General,
  Sources,
}
