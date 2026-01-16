<template>
  <div ref="containerRef" id="mainId"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import '@/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper';
import vtkPLYReader from '@/vtk.js/IO/Geometry/PLYReader';
import vtkTexture from '@/vtk.js/Rendering/Core/Texture';
import type vtkRenderer from "@/vtk.js/Rendering/Core/Renderer";
import type vtkRenderWindow from "@/vtk.js/Rendering/Core/RenderWindow";
import { FPSMonitor } from '@/utils/FPSMonitor';

const containerRef = ref();
let renderer: vtkRenderer;
let renderWindow: vtkRenderWindow;
let fpsMonitor: FPSMonitor | null = null;

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

const handleImgFile = (url: string, actor: vtkActor) => {
  const image = new Image();
  image.src = url;
  const texture = vtkTexture.newInstance();
  texture.setInterpolate(true);
  texture.setEdgeClamp(true);
  texture.setImage(image);
  actor.addTexture(texture);
  // renderer.resetCamera();
  // renderWindow.render();
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

  const baseUrl = "/data/ply_png/ply2";
  const url = baseUrl + "/upperJaw.png";
  handleImgFile(url, actor1);

  const url2 = baseUrl + "/lowerJaw.png";
  handleImgFile(url2, actor2);

  await reader1.setUrl(`${baseUrl}/upperJaw.ply`, { binary: true })
  setActorProperty(actor1);
  mapper1.modified();
  actor1.modified();

  await reader2.setUrl(`${baseUrl}/lowerJaw.ply`, { binary: true })
  setActorProperty(actor2);

  renderer.resetCamera();
  renderWindow.render();
  console.timeEnd('vtk');
  
  // 初始化 FPS 监控
  fpsMonitor = new FPSMonitor({
    updateInterval: 500,
    showElement: true,
    position: 'top-right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: '#00ff00',
    fontSize: '14px',
    padding: '10px',
    borderRadius: '5px'
  });
  fpsMonitor.start();
  
  // // 监听渲染事件来更新 FPS
  // renderWindow.onRender(() => {
  //   if (fpsMonitor) {
  //     fpsMonitor.update();
  //   }
  // });
  
  // 启用交互模式以持续渲染
  renderWindow.getInteractor().start();
});

onUnmounted(() => {
  if (fpsMonitor) {
    fpsMonitor.destroy();
    fpsMonitor = null;
  }
});

</script>
<style scoped lang='less'>
#mainId {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>