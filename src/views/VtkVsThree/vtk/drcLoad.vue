<template>
  <div ref="containerRef" id="mainId"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import '@/vtk.js/Rendering/Profiles/Geometry'

import vtkActor from '@/vtk.js/Rendering/Core/Actor'
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow'
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper'
import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader'
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader'
import type vtkRenderer from '@/vtk.js/Rendering/Core/Renderer'
import type vtkRenderWindow from '@/vtk.js/Rendering/Core/RenderWindow'
import DracoDecoderModule from '@/library/draco_decoder_nodejs1.5.7.js'
import { FPSMonitor } from '@/utils/FPSMonitor'
import { setTextureByScalar } from '@/vtk-utils/scalarSetting'

const containerRef = ref()
let renderer: vtkRenderer
let renderWindow: vtkRenderWindow
let fpsMonitor: FPSMonitor | null = null;

const setActorProperty = (actor: vtkActor) => {
  const property = actor.getProperty();
  property.setColor(1, 1, 1);
  property.setSpecular(0.15);
  property.setAmbient(0.8);
  property.setDiffuse(0.03);
  property.setSpecularPower(600);
}

console.time('vtk')
onMounted(async () => {
  await vtkDracoReader.setDracoDecoder(DracoDecoderModule)
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  })
  renderer = fullScreenRenderer.getRenderer()
  renderWindow = fullScreenRenderer.getRenderWindow()

  const reader1 = vtkDracoReader.newInstance()
  const mapper1 = vtkMapper.newInstance()
  const actor1 = vtkActor.newInstance()
  actor1.setMapper(mapper1)
  mapper1.setInputConnection(reader1.getOutputPort())
  renderer.addActor(actor1)

  const reader2 = vtkDracoReader.newInstance()
  const mapper2 = vtkMapper.newInstance()
  const actor2 = vtkActor.newInstance()
  actor2.setMapper(mapper2)
  mapper2.setInputConnection(reader2.getOutputPort())
  renderer.addActor(actor2)

  await reader1.setUrl('/data/draco/lower1.drc', { binary: true })
  await reader2.setUrl('/data/draco/upper1.drc', { binary: true })

  setTextureByScalar(reader1.getOutputData().getPointData());
  setTextureByScalar(reader2.getOutputData().getPointData());
  
  // mapper1.setScalarVisibility(false);
  // mapper2.setScalarVisibility(false);
  setActorProperty(actor1);
  setActorProperty(actor2);

  renderer.resetCamera()
  renderWindow.render()
  console.timeEnd('vtk')
  
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
  // renderWindow.onAnimation(() => {
  //   if (fpsMonitor) {
  //     fpsMonitor.update();
  //   }
  // });
  
  // 启用交互模式以持续渲染
  renderWindow.getInteractor().start();
})
onUnmounted(() => {
  if (fpsMonitor) {
    fpsMonitor.destroy();
    fpsMonitor = null;
  }
});

</script>
<style scoped lang="less">
#mainId {
  width: 100%;
  height: 800px;
}
</style>
