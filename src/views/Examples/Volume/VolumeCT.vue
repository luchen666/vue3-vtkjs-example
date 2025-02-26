<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import "@/vtk.js/Rendering/Profiles/All";
import "@/vtk.js/Rendering/Profiles/Volume";
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkVolume from "@/vtk.js/Rendering/Core/Volume";
import vtkVolumeMapper from "@/vtk.js/Rendering/Core/VolumeMapper";
import vtkImageCropFilter from "@/vtk.js/Filters/General/ImageCropFilter";

import { getImageData2 } from "@/utils/covertImageData";
import imageData from "@/testData/buffer3D.json";
import { setModelAction } from "@/utils/vtkUtils/view3DROI";
import vtkWidgetManager from "@kitware/vtk.js/Widgets/Core/WidgetManager";
import vtkPolyLineWidget from '@kitware/vtk.js/Widgets/Widgets3D/PolyLineWidget';
import { comManipulator } from "@/utils/vtkUtils/ComManipulator";
import vtkInteractorStyleManipulator from "@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator";

// @ts-ignore

const containerRef = ref();

function init() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const actor = vtkVolume.newInstance();
  const mapper = vtkVolumeMapper.newInstance();
  actor.setMapper(mapper);

  // 设置模式
  setModelAction(actor, 'tooth'); // tooth, grey, skeleton

  const cropFilter = vtkImageCropFilter.newInstance();

  const data = getImageData2(imageData);

  cropFilter.setInputData(data);
  mapper.setInputConnection(cropFilter.getOutputPort());
  renderer.addVolume(actor);

  const activeCamera = renderer.getActiveCamera();
  activeCamera.setFocalPoint(0, 0, 0);
  activeCamera.setPosition(0, -1, 0);
  activeCamera.setViewUp(0, 0, 1);
  renderer.resetCamera(actor.getBounds());
  renderer.getActiveCamera().setParallelProjection(true);

  const interactorStyle = vtkInteractorStyleManipulator.newInstance();
  renderWindow.getInteractor().setInteractorStyle(interactorStyle);
  comManipulator.addMouseManipulator(interactorStyle);

  renderer.resetCamera();

  actor.setPickable(false);

  // 保证xyz 轴线能正常显示
  fullScreenRenderer.getInteractor().render();
  renderWindow.render();

  actor.setPickable(true);

  const widgetManager = vtkWidgetManager.newInstance()
  widgetManager.setRenderer(renderer)

  const widget = vtkPolyLineWidget.newInstance()
  widget.placeWidget(cropFilter.getOutputData().getBounds())

  widgetManager.addWidget(widget)

  renderer.resetCamera()
  widgetManager.enablePicking()
  widgetManager.grabFocus(widget)
}

onMounted(() => {
  init()
})

</script>
<style scoped></style>
