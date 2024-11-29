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
}
