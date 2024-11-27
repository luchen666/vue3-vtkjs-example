<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import "@/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@/vtk.js/Rendering/Core/Mapper";
import vtkSTLReader from "@/vtk.js/IO/Geometry/STLReader";
import vtkFullScreenRenderWindow from "@/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkInteractorStyleManipulator from "@/vtk.js/Interaction/Style/InteractorStyleManipulator";
import { comManipulator } from "@/utils/vtkUtils/ComManipulator";
import vtkCamera from "@/vtk.js/Rendering/Core/Camera";
import vtkMouseCameraTrackballRotateManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator";

const containerRef = ref();

onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const airMapper = vtkMapper.newInstance();
  const airActor = vtkActor.newInstance();
  const reader = vtkSTLReader.newInstance();

  const url = "/data/stl/11-lowerjaw.stl";
  // const url = "/data/stl/airway.stl";
  await reader.setUrl(url, { binary: true });

  reader.update();
  airMapper.setInputConnection(reader.getOutputPort());

  airActor.setDragable(true);
  airActor.setMapper(airMapper);
  renderer.addActor(airActor);

  const bound = airActor.getBounds();
  const center = [(bound[0] + bound[1]) / 2, (bound[2] + bound[3]) / 2, (bound[4] + bound[5]) / 2];

  // 手动设置相机
  const activeCamera = vtkCamera.newInstance();
  activeCamera.setPosition(0, -1, 0);
  activeCamera.setViewUp(0, 0, 1);
  activeCamera.setFocalPoint(center[0], center[1], center[2]);
  activeCamera.setParallelProjection(true);
  renderer.setActiveCamera(activeCamera);

  const interactor = fullScreenRenderer.getInteractor();
  interactor.setInteractorStyle(vtkInteractorStyleManipulator.newInstance());

  const manipulator1 = vtkMouseCameraTrackballRotateManipulator.newInstance();
  manipulator1.setButton(3);
  manipulator1.setDragEnabled(true);
  interactor.getInteractorStyle().addMouseManipulator(manipulator1);
  // 设置旋转中心点
  interactor.getInteractorStyle().setCenterOfRotation(center[0], center[1], center[2])
  console.log(interactor.getInteractorStyle().getCenterOfRotation(), "interactor")

  // comManipulator.addMouseManipulator(interactor.getInteractorStyle());

  airMapper.setScalarVisibility(false);
  const property = airActor.getProperty();
  property.setColor(230 / 255, 180 / 255, 90 / 255);

  renderer.resetCamera();
  renderWindow.render();
});
</script>
<style scoped></style>
