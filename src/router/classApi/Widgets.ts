export const Widgets = {
  Core: [
    // {
    //   menu: 'WidgetManager',
    //   path: '/WidgetManager',
    //   name: 'WidgetManager.vue',
    //   component: () =>
    //     import('@/views/Widgets/Core/WidgetManager.vue'),
    // },
  ],
  Representations: [
    // {
    //   menu: 'ImplicitPlaneRepresentation',
    //   path: '/ImplicitPlaneRepresentation',
    //   name: 'ImplicitPlaneRepresentation.vue',
    //   component: () =>
    //     import('@/views/Widgets/Representations/ImplicitPlaneRepresentation.vue'),
    // },
    // {
    //   menu: 'WidgetRepresentation',
    //   path: '/WidgetRepresentation',
    //   name: 'WidgetRepresentation.vue',
    //   component: () =>
    //     import('@/views/Widgets/Representations/WidgetRepresentation.vue'),
    // },
  ],
  Widgets3D: [
    {
      menu: 'PolyLineWidget',
      path: '/PolyLineWidget',
      name: 'PolyLineWidget.vue',
      component: () =>
        import('@/views/Widgets/Widgets3D/PolyLineWidget.vue'),
    },
  ],
}
