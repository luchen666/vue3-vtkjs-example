export const IO = {
  Geometry: [
    {
      menu: 'DracoReader',
      path: '/DracoReader',
      name: 'DracoReader.vue',
      component: () => import('@/views/IO/Geometry/DracoReader.vue'),
    },
    {
      menu: 'GLTFImporter',
      path: '/GLTFImporter',
      name: 'GLTFImporter.vue',
      component: () => import('@/views/IO/Geometry/GLTFImporter.vue'),
    },
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
  ],
}
