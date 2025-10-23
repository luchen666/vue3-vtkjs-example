export const Interaction = {
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
  Style: [
    {
      menu: 'InteractorStyleManipulator',
      path: '/InteractorStyleManipulator',
      name: 'InteractorStyleManipulator.vue',
      component: () =>
        import(
          '@/views/Interaction/Style/InteractorStyleManipulator.vue'
        ),
    },
  ],
}
