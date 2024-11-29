export const Rendering = {
  Core: [
    {
      menu: 'CellPicker',
      path: '/CellPicker',
      name: 'CellPicker.vue',
      component: () => import('@/views/Rendering/Core/CellPicker.vue'),
    },
    {
      menu: 'Glyph3DMapper',
      path: '/Glyph3DMapper',
      name: 'Glyph3DMapper.vue',
      component: () => import('@/views/Rendering/Core/Glyph3DMapper.vue'),
    },
    {
      menu: 'HardwareSelector',
      path: '/HardwareSelector',
      name: 'HardwareSelector.vue',
      component: () => import('@/views/Rendering/Core/HardwareSelector.vue'),
    },
    {
      menu: 'ImageCPRMapper',
      path: '/ImageCPRMapper',
      name: 'ImageCPRMapper.vue',
      component: () => import('@/views/Rendering/Core/ImageCPRMapper.vue'),
    },
    {
      menu: 'ScalarBarActor',
      path: '/ScalarBarActor',
      name: 'ScalarBarActor.vue',
      component: () => import('@/views/Rendering/Core/ScalarBarActor.vue'),
    },
    {
      menu: 'SphereMapper',
      path: '/SphereMapper',
      name: 'SphereMapper.vue',
      component: () => import('@/views/Rendering/Core/SphereMapper.vue'),
    },
    {
      menu: 'StickMapper',
      path: '/StickMapper',
      name: 'StickMapper.vue',
      component: () => import('@/views/Rendering/Core/StickMapper.vue'),
    },
    {
      menu: 'PointPicker',
      path: '/PointPicker',
      name: 'PointPicker.vue',
      component: () => import('@/views/Rendering/Core/PointPicker.vue'),
    },
  ],
}
