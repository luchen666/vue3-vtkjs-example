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
import vtkPLYReader from '@/vtk.js/IO/Geometry/PLYReader';
import vtkTexture from '@/vtk.js/Rendering/Core/Texture';
import type vtkRenderer from "@/vtk.js/Rendering/Core/Renderer";
import type vtkRenderWindow from "@/vtk.js/Rendering/Core/RenderWindow";

const containerRef = ref();
let renderer: vtkRenderer;
let renderWindow: vtkRenderWindow;

console.time('vtk');

const setImgTexture = (actor: vtkActor, url: string) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const texture = vtkTexture.newInstance();
      texture.setInterpolate(true);
      texture.setEdgeClamp(true);
      texture.setImage(image);
      actor.addTexture(texture);
      renderer.resetCamera();
      resolve(actor)
    };
  })
}

const setActorProperty = (actor: vtkActor) => {
  const property = actor.getProperty();
  property.setColor(1, 1, 1);
  property.setSpecular(0.15);
  property.setAmbient(0.8);
  property.setDiffuse(0.03);
  property.setSpecularPower(600);
}

onMounted(async () => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  renderer = fullScreenRenderer.getRenderer();
  renderWindow = fullScreenRenderer.getRenderWindow();

  const reader1 = vtkPLYReader.newInstance();
  const mapper1 = vtkMapper.newInstance();
  const actor1 = vtkActor.newInstance();
  actor1.setMapper(mapper1);
  mapper1.setInputConnection(reader1.getOutputPort());
  renderer.addActor(actor1);

  const reader2 = vtkPLYReader.newInstance();
  const mapper2 = vtkMapper.newInstance();
  const actor2 = vtkActor.newInstance();
  actor2.setMapper(mapper2);
  mapper2.setInputConnection(reader2.getOutputPort());
  renderer.addActor(actor2);

  const baseUrl = "/data/ply_png/ply5";
  await reader1.setUrl(`${baseUrl}/upperJaw.ply`, { binary: true })
  setActorProperty(actor1);
  // await setImgTexture(actor1, `${baseUrl}/upperJaw.png`);
  let cellColor = reader1.getOutputData().getPointData().getScalars()?.getData() || [];
  console.log(cellColor, 'cellColor ply');
  mapper1.modified();
  actor1.modified();


  await reader2.setUrl(`${baseUrl}/lowerJaw.ply`, { binary: true })
  setActorProperty(actor2);
  // await setImgTexture(actor2, `${baseUrl}/lowerJaw.png`);

  renderer.resetCamera();
  renderWindow.render();
  console.timeEnd('vtk');
});

</script>
<style scoped></style>
