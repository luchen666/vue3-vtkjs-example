<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkCellPicker from '@kitware/vtk.js/Rendering/Core/CellPicker';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const containerRef = ref(null);
onMounted(() => {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const cone = vtkConeSource.newInstance();
  const mapper = vtkMapper.newInstance();
  mapper.setInputData(cone.getOutputData());
  const actor = vtkActor.newInstance();
  actor.setMapper(mapper);
  actor.getProperty().setColor(0.0, 0.0, 1.0);

  renderer.addActor(actor);
  renderer.resetCamera();
  renderWindow.render();

  // ----------------------------------------------------------------------------
  // Setup picking interaction
  // ----------------------------------------------------------------------------
  // Only try to pick cone
  const picker = vtkCellPicker.newInstance();
  picker.setPickFromList(1);
  picker.setTolerance(0);
  picker.initializePickList();
  picker.addPickList(actor);

  // Pick on mouse right click
  renderWindow.getInteractor().onRightButtonPress((callData) => {
    if (renderer !== callData.pokedRenderer) {
      return;
    }

    const pos = callData.position;
    const point = [pos.x, pos.y, 0.0];
    console.log(`Pick at: ${point}`);
    picker.pick(point, renderer);

    if (picker.getActors().length === 0) {
      const pickedPoint = picker.getPickPosition();
      console.log(`No cells picked, default: ${pickedPoint}`);
      const sphere = vtkSphereSource.newInstance();
      sphere.setCenter(pickedPoint);
      sphere.setRadius(0.01);
      const sphereMapper = vtkMapper.newInstance();
      sphereMapper.setInputData(sphere.getOutputData());
      const sphereActor = vtkActor.newInstance();
      sphereActor.setMapper(sphereMapper);
      sphereActor.getProperty().setColor(1.0, 0.0, 0.0);
      renderer.addActor(sphereActor);
    } else {
      const pickedCellId = picker.getCellId();
      console.log('Picked cell: ', pickedCellId);

      const pickedPoints = picker.getPickedPositions();
      for (let i = 0;i < pickedPoints.length;i++) {
        const pickedPoint = pickedPoints[i];
        console.log(`Picked: ${pickedPoint}`);
        const sphere = vtkSphereSource.newInstance();
        sphere.setCenter(pickedPoint);
        sphere.setRadius(0.01);
        const sphereMapper = vtkMapper.newInstance();
        sphereMapper.setInputData(sphere.getOutputData());
        const sphereActor = vtkActor.newInstance();
        sphereActor.setMapper(sphereMapper);
        sphereActor.getProperty().setColor(0.0, 1.0, 0.0);
        renderer.addActor(sphereActor);
      }
    }
    renderWindow.render();
  })
});
</script>