<template>
  <div ref="containerRef" style="position: relative;width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkPixelSpaceCallbackMapper from '@kitware/vtk.js/Rendering/Core/PixelSpaceCallbackMapper';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

const containerRef = ref();
let textCtx: CanvasRenderingContext2D | null = null;
let dims = { width: 0, height: 0 };

onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();
  
  const coneSource = vtkConeSource.newInstance({ height: 1.0 });

  const mapper = vtkMapper.newInstance();
  mapper.setInputConnection(coneSource.getOutputPort());
  const actor = vtkActor.newInstance();
  actor.setMapper(mapper);
  renderer.addActor(actor);

  const psMapper = vtkPixelSpaceCallbackMapper.newInstance();
  psMapper.setInputConnection(coneSource.getOutputPort());
  psMapper.setCallback((coordsList) => {
    if (textCtx && dims) {
      textCtx.clearRect(0, 0, dims.width, dims.height);
      coordsList.forEach((xy, idx) => {
        if(!textCtx) return;
        textCtx.font = '12px serif';
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.fillText(`p ${idx}`, xy[0], dims.height - xy[1]);
      });
    }
  });

  const textActor = vtkActor.newInstance();
  textActor.setMapper(psMapper);
  renderer.addActor(textActor);

  const textCanvas = document.createElement('canvas');
  textCanvas.classList.add("container", 'textCanvas');
  containerRef.value.appendChild(textCanvas);
  textCtx = textCanvas.getContext('2d');

  renderer.resetCamera();
  
  function resize() {
    dims = textCanvas.getBoundingClientRect();
    textCanvas.setAttribute('width', dims.width);
    textCanvas.setAttribute('height', dims.height);
    renderWindow.render();
  }
  resize();

  window.addEventListener('resize', resize);
})
</script>
<style>
.container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
  width: 100%;
  height: 100%;
}
</style>
