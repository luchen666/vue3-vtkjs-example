<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader';
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const reader = vtkDracoReader.newInstance();
const mapper = vtkMapper.newInstance({ scalarVisibility: false });
const actor = vtkActor.newInstance();

actor.setMapper(mapper);
mapper.setInputConnection(reader.getOutputPort());

// ----------------------------------------------------------------------------

const containerRef = ref(null);
function update() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const resetCamera = renderer.resetCamera;
  const render = renderWindow.render;

  renderer.addActor(actor);
  resetCamera();
  render();
}

window.module = {};

// Add new script tag with draco CDN
vtkResourceLoader
  .loadScript('https://unpkg.com/draco3d@1.3.4/draco_decoder_nodejs.js')
  .then(() => {
    // Set decoder function to the vtk reader
    vtkDracoReader.setDracoDecoder(window.CreateDracoModule);

    // Trigger data download
    reader.setUrl('/data/draco/lower.drc').then(update);
  });

</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
