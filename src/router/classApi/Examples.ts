export const Examples = {
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
    {
      menu: 'VolumeRenderingWithPolyData',
      path: '/VolumeRenderingWithPolyData',
      name: 'VolumeRenderingWithPolyData.vue',
      component: () => import('@/views/Examples/Volume/VolumeRenderingWithPolyData.vue'),
    },
  ],
  Geometry: [
    // {
    //   menu: 'AR',
    //   path: '/AR',
    //   name: 'AR.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/AR.vue'),
    // },
    // {
    //   menu: 'AxesActor',
    //   path: '/AxesActor',
    //   name: 'AxesActor.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/AxesActor.vue'),
    // },
    // {
    //   menu: 'Cone',
    //   path: '/Cone',
    //   name: 'Cone.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/Cone.vue'),
    // },
    // {
    //   menu: 'CubeAxes',
    //   path: '/CubeAxes',
    //   name: 'CubeAxes.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/CubeAxes.vue'),
    // },
    {
      menu: 'DepthTest',
      path: '/DepthTest',
      name: 'DepthTest.vue',
      component: () =>
        import('@/views/Examples/Geometry/DepthTest.vue'),
    },
    // {
    //   menu: 'GlyphRotation',
    //   path: '/GlyphRotation',
    //   name: 'GlyphRotation.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/GlyphRotation.vue'),
    // },
    // {
    //   menu: 'ItkWasmGeometry',
    //   path: '/ItkWasmGeometry',
    //   name: 'ItkWasmGeometry.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/ItkWasmGeometry.vue'),
    // },
    // {
    //   menu: 'LookingGlass',
    //   path: '/LookingGlass',
    //   name: 'LookingGlass.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/LookingGlass.vue'),
    // },
    // {
    //   menu: 'Picking',
    //   path: '/Picking',
    //   name: 'Picking.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/Picking.vue'),
    // },
    // {
    //   menu: 'SimpleCone',
    //   path: '/SimpleCone',
    //   name: 'SimpleCone.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/SimpleCone.vue'),
    // },
    {
      menu: 'SpheresAndLabels',
      path: '/SpheresAndLabels',
      name: 'SpheresAndLabels.vue',
      component: () =>
        import('@/views/Examples/Geometry/SpheresAndLabels.vue'),
    },
    // {
    //   menu: 'Texture',
    //   path: '/Texture',
    //   name: 'Texture.vue',
    //   component: () =>
    //     import('@/views/Examples/Geometry/Texture.vue'),
    // },
    {
      menu: 'DepthDrcAndLabel',
      path: '/DepthDrcAndLabel',
      name: 'DepthDrcAndLabel.vue',
      component: () =>
        import('@/views/Examples/Geometry/DepthDrcAndLabel.vue'),
    },
  ],
  Test: [
    {
      menu: 'Panorama',
      path: '/Panorama',
      name: 'Panorama.vue',
      component: () =>
        import('@/views/Examples/Test/Panorama.vue'),
    },
  ],
}
