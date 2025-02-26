<template>
  <div ref="containerRef" style="position: relative;width: 100%; height: 100%"></div>
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
import vtkPixelSpaceCallbackMapper from '@kitware/vtk.js/Rendering/Core/PixelSpaceCallbackMapper';
import vtk from '@kitware/vtk.js/vtk';
import { mat4, vec3 } from "gl-matrix";

const reader = vtkDracoReader.newInstance();
const drcMapper = vtkMapper.newInstance({ scalarVisibility: false });
const drcActor = vtkActor.newInstance();

let textCtx: CanvasRenderingContext2D | null = null;

drcActor.setMapper(drcMapper);
drcMapper.setInputConnection(reader.getOutputPort());

const containerRef = ref();

const addTextActor = (dom: HTMLElement) => {
  const dims = containerRef.value.getBoundingClientRect();
  const textCanvas = document.createElement('canvas');
  textCanvas.classList.add('textBox');
  textCtx = textCanvas.getContext('2d');
  textCanvas.setAttribute('width', dims.width);
  textCanvas.setAttribute('height', dims.height);
  dom.appendChild(textCanvas);

  const pointPoly = vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      dataType: 'Float32Array',
      numberOfComponents: 3,
      values: [10, 0, -1, -10, 0, -1, 0, 10, -1, 0, -10, -1],
    },
  });

  pointPoly.getPoints().setData([0, 0, -1]);
  console.log("pointPoly", pointPoly);
  
  const psMapper = vtkPixelSpaceCallbackMapper.newInstance();
  psMapper.setInputData(pointPoly);
  psMapper.setUseZValues(true);
  psMapper.setCallback((coordsList, camera, aspect) => {
    if (textCtx && dims) {
      textCtx.clearRect(0, 0, dims.width, dims.height);

      const viewMatrix = camera.getViewMatrix();
      mat4.transpose(viewMatrix, viewMatrix);
      const projMatrix = camera.getProjectionMatrix(aspect, -1, 1);
      mat4.transpose(projMatrix, projMatrix);

      const dataPoints = psMapper.getInputData().getPoints();
      const pdPoint = dataPoints.getPoint(0);
      const vc = vec3.fromValues(pdPoint[0], pdPoint[1], pdPoint[2]);
      vec3.transformMat4(vc, vc, viewMatrix);
      vc[2] += 0.5;
      vec3.transformMat4(vc, vc, projMatrix);

      coordsList.forEach((xy, idx) => {
        if (vc[2] - 0.001 < xy[3]) {
          if (!textCtx) return;
          textCtx.font = '22px serif';
          textCtx.fillStyle = "red";
          textCtx.textAlign = 'center';
          textCtx.textBaseline = 'middle';
          textCtx.fillText(`p ${idx}`, xy[0], dims.height - xy[1]);
        }
      });
    }
  });

  // psMapper.getInputData().getPoints().setData([0, 10, -1]);
  // psMapper.modified();

  const textActor = vtkActor.newInstance();
  textActor.setMapper(psMapper);
  return textActor;
}

function update() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();
  renderer.addActor(drcActor);

  const textActor = addTextActor(containerRef.value);
  renderer.addActor(textActor);

  renderer.resetCamera();
  renderWindow.render();
}

window.module = {};
// Add new script tag with draco CDN
vtkResourceLoader
  .loadScript('https://unpkg.com/draco3d@1.3.4/draco_decoder_nodejs.js')
  .then(() => {
    vtkDracoReader.setDracoDecoder(window.CreateDracoModule);
    reader.setUrl('/data/draco/lower.drc').then(update);
  });

</script>
<style>
.textBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
