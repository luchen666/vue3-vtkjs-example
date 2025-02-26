<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div id="readerDom" style="position: absolute;top: 0; right: 0;color: #fff;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import '@/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper';
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader';
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';
import type vtkRenderer from "@/vtk.js/Rendering/Core/Renderer";
import type vtkRenderWindow from "@/vtk.js/Rendering/Core/RenderWindow";
// import vtkPLYReader from '@/vtk.js/IO/Geometry/PLYReader';
// import vtkTexture from '@/vtk.js/Rendering/Core/Texture';

const containerRef = ref();
let renderer: vtkRenderer;
let renderWindow: vtkRenderWindow;

console.time('vtk');

const setActorProperty = (actor: vtkActor) => {
  const property = actor.getProperty();
  property.setColor(1, 1, 1);
  property.setSpecular(0.15);
  property.setAmbient(0.8);
  property.setDiffuse(0.03);
  property.setSpecularPower(600);
}

const baseUrl = "/data/ply_png/ply2";
onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  renderer = fullScreenRenderer.getRenderer();
  renderWindow = fullScreenRenderer.getRenderWindow();

  const reader1 = vtkDracoReader.newInstance();
  const mapper1 = vtkMapper.newInstance();
  const actor1 = vtkActor.newInstance();
  actor1.setMapper(mapper1);
  mapper1.setInputConnection(reader1.getOutputPort());
  renderer.addActor(actor1);

  const reader2 = vtkDracoReader.newInstance();
  const mapper2 = vtkMapper.newInstance();
  const actor2 = vtkActor.newInstance();
  actor2.setMapper(mapper2);
  mapper2.setInputConnection(reader2.getOutputPort());
  renderer.addActor(actor2);

  await vtkResourceLoader
  .loadScript('https://unpkg.com/draco3d@1.3.4/draco_decoder_nodejs.js')
  .then(async () => {
    vtkDracoReader.setDracoDecoder(window.CreateDracoModule);

    await reader1.setUrl('/data/draco/lower1.drc', { binary: true });
    await reader2.setUrl('/data/draco/upper1.drc', { binary: true });

    
    let cellColor = reader1.getOutputData().getPointData().getScalars()?.getData() || [];
    console.log(cellColor, 'cellColor drc');
    
  });

  // setActorProperty(actor1);

  // setActorProperty(actor2);

  renderer.resetCamera();
  renderWindow.render();
  console.timeEnd('vtk');
});

</script>
<style scoped></style>
