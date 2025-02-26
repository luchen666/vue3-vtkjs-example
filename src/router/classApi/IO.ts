export const IO = {
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
      component: () => import('@/views/IO/Geometry/PLYReader.vue'),
    },
    {
      menu: 'DRCReader',
      path: '/DRCReader',
      name: 'DRCReader.vue',
      component: () => import('@/views/IO/Geometry/DRCReader.vue'),
    },
    {
      menu: 'GLTFImporter',
      path: '/GLTFImporter',
      name: 'GLTFImporter.vue',
      component: () => import('@/views/IO/Geometry/GLTFImporter.vue'),
    },
  ],
}
