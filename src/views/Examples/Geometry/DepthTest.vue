<template>
  <div ref="containerRef" style="position: relative;width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Molecule'; // for vtkSphereMapper

import { mat4, vec3 } from 'gl-matrix';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkSphereMapper from '@kitware/vtk.js/Rendering/Core/SphereMapper';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkPixelSpaceCallbackMapper from '@kitware/vtk.js/Rendering/Core/PixelSpaceCallbackMapper';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';
import vtk from '@kitware/vtk.js/vtk';

// Need polydata registered in the vtk factory
import '@kitware/vtk.js/Common/Core/Points';
import '@kitware/vtk.js/Common/Core/DataArray';
import '@kitware/vtk.js/Common/Core/StringArray';
import '@kitware/vtk.js/Common/DataModel/PolyData';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

const containerRef = ref();

let textCtx = null;
let windowWidth = 0;
let windowHeight = 0;
const enableDebugCanvas = true;
let debugHandler = null;

function affine(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const pointPoly = vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      dataType: 'Float32Array',
      numberOfComponents: 3,
      values: [0, 0, -1],
    },
    polys: {
      vtkClass: 'vtkCellArray',
      dataType: 'Uint16Array',
      values: [1, 0],
    },
    pointData: {
      vtkClass: 'vtkDataSetAttributes',
      arrays: [
        {
          data: {
            vtkClass: 'vtkStringArray',
            name: 'pointLabels',
            dataType: 'string',
            values: ['Neo'],
          },
        },
      ],
    },
  });

  const planePoly = vtk({
    vtkClass: 'vtkPolyData',
    points: {
      vtkClass: 'vtkPoints',
      dataType: 'Float32Array',
      numberOfComponents: 3,
      values: [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0],
    },
    polys: {
      vtkClass: 'vtkCellArray',
      dataType: 'Uint16Array',
      values: [3, 0, 1, 2, 3, 0, 2, 3],
    },
  });

  function resetCameraPosition(doRender = false) {
    const activeCamera = renderWindow.getRenderers()[0].getActiveCamera();
    activeCamera.setPosition(0, 0, 3);
    activeCamera.setFocalPoint(0, 0, 0);
    activeCamera.setViewUp(0, 1, 0);
    activeCamera.setClippingRange(3.49999, 4.50001);

    if (doRender) {
      renderWindow.render();
    }
  }

  const pointMapper = vtkSphereMapper.newInstance({ radius: 0.5 });
  const pointActor = vtkActor.newInstance();
  pointMapper.setInputData(pointPoly);
  pointActor.setMapper(pointMapper);

  const planeMapper = vtkMapper.newInstance();
  const planeActor = vtkActor.newInstance();
  planeMapper.setInputData(planePoly);
  planeActor.setMapper(planeMapper);

  const psMapper = vtkPixelSpaceCallbackMapper.newInstance();
  psMapper.setInputData(pointPoly);
  psMapper.setUseZValues(true);
  psMapper.setCallback((coordsList, camera, aspect, depthBuffer) => {
    if (textCtx && windowWidth > 0 && windowHeight > 0) {
      const dataPoints = psMapper.getInputData().getPoints();

      const viewMatrix = camera.getViewMatrix();
      mat4.transpose(viewMatrix, viewMatrix);
      const projMatrix = camera.getProjectionMatrix(aspect, -1, 1);
      mat4.transpose(projMatrix, projMatrix);

      textCtx.clearRect(0, 0, windowWidth, windowHeight);
      console.log("xy", coordsList);
      coordsList.forEach((xy, idx) => {
        const pdPoint = dataPoints.getPoint(idx);
        const vc = vec3.fromValues(pdPoint[0], pdPoint[1], pdPoint[2]);
        vec3.transformMat4(vc, vc, viewMatrix);
        vc[2] += 0.5; // sphere mapper's radius
        vec3.transformMat4(vc, vc, projMatrix);

        // console.log(
        //   `Distance to camera: point = ${xy[2]}, depth buffer = ${xy[3]}`
        // );
        if (vc[2] - 0.001 < xy[3]) {
          textCtx.font = '12px serif';
          textCtx.textAlign = 'center';
          textCtx.textBaseline = 'middle';
          textCtx.fillText(`p ${idx}`, xy[0], windowHeight - xy[1]);
        }
      });
      // const activeCamera = renderWindow.getRenderers()[0].getActiveCamera();
      // const crange = activeCamera.getClippingRange();
      // console.log(`current clipping range: [${crange[0]}, ${crange[1]}]`);
    }

    // if (enableDebugCanvas && depthBuffer) {
    //   if (!debugHandler) {
    //     debugHandler = initializeDebugHandler();
    //   }
    //   debugHandler.update(coordsList, depthBuffer);
    // }
  });

  const textActor = vtkActor.newInstance();
  textActor.setMapper(psMapper);

  renderer.addActor(pointActor);
  renderer.addActor(textActor);
  renderer.addActor(planeActor);

  resetCameraPosition();

  const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
  renderWindow.addView(openGLRenderWindow);

  const textCanvas = document.createElement('canvas');
  textCanvas.classList.add("container", 'textCanvas');
  containerRef.value.appendChild(textCanvas);

  textCtx = textCanvas.getContext('2d');

  // const interactor = vtkRenderWindowInteractor.newInstance();
  // interactor.setView(openGLRenderWindow);
  // interactor.initialize();
  // interactor.bindEvents(containerRef.value);
  // interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

  // Handle window resize
  function resize() {
    const dims = containerRef.value.getBoundingClientRect();
    windowWidth = Math.floor(dims.width);
    windowHeight = Math.floor(dims.height);
    openGLRenderWindow.setSize(windowWidth, windowHeight);
    textCanvas.setAttribute('width', windowWidth);
    textCanvas.setAttribute('height', windowHeight);
    if (debugHandler) {
      debugHandler.resize(windowWidth, windowHeight);
    }
    renderWindow.render();
  }

  window.addEventListener('resize', resize);

  resize();

  containerRef.value.addEventListener('keypress', (e) => {
    if (String.fromCharCode(e.charCode) === 'm') {
      renderWindow.render();
    } else if (String.fromCharCode(e.charCode) === 'n') {
      resetCameraPosition(true);
    }
  });
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

.debugCanvas {
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 1;
}
</style>
