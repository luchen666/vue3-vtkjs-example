// name 可以没有，但不能重复
export const VtkVsThree = {
  vtk: [
    {
      menu: 'vtkPlyLoad',
      path: '/vtkPlyLoad',
      component: () => import('@/views/VtkVsThree/vtk/plyLoad.vue'),
    },
    {
      menu: 'vtkDrcLoad',
      path: '/vtkDrcLoad',
      component: () => import('@/views/VtkVsThree/vtk/drcLoad.vue'),
    },
  ],
  three: [
    {
      menu: 'threePlyLoad',
      path: '/threePlyLoad',
      // name: 'threePlyLoad.vue',
      component: () => import('@/views/VtkVsThree/three/plyLoad.vue'),
    },
    {
      menu: 'threeDrcLoad',
      path: '/threeDrcLoad',
      component: () => import('@/views/VtkVsThree/three/drcLoad.vue'),
    },
    {
      menu: 'plyLoadColor',
      path: '/plyLoadColor',
      // name: 'plyLoadColor.vue',
      component: () => import('@/views/VtkVsThree/three/plyLoadColor.vue'),
    },
  ],
}
