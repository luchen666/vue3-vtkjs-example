<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@/vtk.js/Rendering/Profiles/Volume';

// Force DataAccessHelper to have access to various data source
import '@/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';

import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkImageMapper from '@/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@/vtk.js/Rendering/Core/ImageSlice';

import { getImageData2 } from "@/utils/covertImageData.js";
import controlPanel from '@/components/controlPanel/MultiSliceImageMapper';
import { controlPanelStyle } from '@/components/controlPanel/controlPanelStyle';
import imageData from "@/testData/buffer3D.json";

// @ts-ignore

const containerRef = ref();
let fullScreenRenderer: vtkFullScreenRenderWindow | null = null;

function update() {
  fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
    controlPanelStyle
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();
  fullScreenRenderer.addController(controlPanel);

  const imageActorI = vtkImageSlice.newInstance();
  const imageActorJ = vtkImageSlice.newInstance();
  const imageActorK = vtkImageSlice.newInstance();

  renderer.addActor(imageActorK);
  renderer.addActor(imageActorJ);
  renderer.addActor(imageActorI);

  const getSelector = (selector: string) => document.querySelector(selector) as HTMLElement;

  function updateColorLevel(e?: any) {
    const colorLevel = Number((e ? e.target : getSelector('.colorLevel')).value);
    imageActorI.getProperty().setColorLevel(colorLevel);
    imageActorJ.getProperty().setColorLevel(colorLevel);
    imageActorK.getProperty().setColorLevel(colorLevel);
    renderWindow.render();
  }

  function updateColorWindow(e?: any) {
    const colorLevel = Number((e ? e.target : getSelector('.colorWindow')).value);
    imageActorI.getProperty().setColorWindow(colorLevel);
    imageActorJ.getProperty().setColorWindow(colorLevel);
    imageActorK.getProperty().setColorWindow(colorLevel);
    renderWindow.render();
  }

  const data = getImageData2(imageData);

  const dataRange = data.getPointData().getScalars().getRange();
  const extent = data.getExtent();

  const imageMapperK = vtkImageMapper.newInstance();
  imageMapperK.setInputData(data);
  imageMapperK.setKSlice(30);
  imageActorK.setMapper(imageMapperK);

  const imageMapperJ = vtkImageMapper.newInstance();
  imageMapperJ.setInputData(data);
  imageMapperJ.setJSlice(30);
  imageActorJ.setMapper(imageMapperJ);

  const imageMapperI = vtkImageMapper.newInstance();
  imageMapperI.setInputData(data);
  imageMapperI.setISlice(30);
  imageActorI.setMapper(imageMapperI);

  renderer.resetCamera();
  renderer.resetCameraClippingRange();
  renderWindow.render();

  ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
    getSelector(selector).setAttribute('min', extent[idx * 2 + 0]);
    getSelector(selector).setAttribute('max', extent[idx * 2 + 1]);
    getSelector(selector).setAttribute('value', 30);
  });

  ['.colorLevel', '.colorWindow'].forEach((selector) => {
    getSelector(selector).setAttribute('max', dataRange[1]);
    getSelector(selector).setAttribute('value', dataRange[1]);
  });

  getSelector('.colorLevel').setAttribute('value', (dataRange[0] + dataRange[1]) / 3);
  updateColorLevel();
  updateColorWindow();

  getSelector('.sliceI').addEventListener('input', (e) => {
    imageActorI.getMapper().setISlice(Number(e.target.value));
    renderWindow.render();
  });

  window.imageActorI = imageActorI;

  getSelector('.sliceJ').addEventListener('input', (e) => {
    imageActorJ.getMapper().setJSlice(Number(e.target.value));
    renderWindow.render();
  });

  getSelector('.sliceK').addEventListener('input', (e) => {
    imageActorK.getMapper().setKSlice(Number(e.target.value));
    renderWindow.render();
  });

  getSelector('.colorLevel').addEventListener('input', updateColorLevel);
  getSelector('.colorWindow').addEventListener('input', updateColorWindow);
}

onMounted(() => {
  update()
})

onBeforeRouteLeave(() => {
  fullScreenRenderer && fullScreenRenderer.removeController()
})

</script>
