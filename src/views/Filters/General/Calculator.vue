<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave } from 'vue-router';

import '@/vtk.js/Rendering/Profiles/Geometry';
import macro from '@/vtk.js/macros';
import vtkFullScreenRenderWindow from '@/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from '@/vtk.js/Rendering/Core/Actor';
import vtkCalculator from '@/vtk.js/Filters/General/Calculator';
import vtkDataSet from '@/vtk.js/Common/DataModel/DataSet';
import vtkLookupTable from '@/vtk.js/Common/Core/LookupTable';
import vtkMapper from '@/vtk.js/Rendering/Core/Mapper';
import vtkPlaneSource from '@/vtk.js/Filters/Sources/PlaneSource';
import vtkPoints from '@/vtk.js/Common/Core/Points';
import vtkPolyData from '@/vtk.js/Common/DataModel/PolyData';
import vtkWarpScalar from '@/vtk.js/Filters/General/WarpScalar';

import controlPanel from '@/components/controlPanel/Calculator';
import { controlPanelLeftStyle } from '@/components/controlPanel/controlPanelStyle';

const { ColorMode, ScalarMode } = vtkMapper;
const { FieldDataTypes } = vtkDataSet;
const { vtkErrorMacro } = macro;

let formulaIdx = 0;
const FORMULA = [
  '((x[0] - 0.5) * (x[0] - 0.5)) + ((x[1] - 0.5) * (x[1] - 0.5)) + 0.125',
  '0.25 * Math.sin(Math.sqrt(((x[0] - 0.5) * (x[0] - 0.5)) + ((x[1] - 0.5) * (x[1] - 0.5)))*50)',
];

const containerRef = ref();
let fullScreenRenderer: vtkFullScreenRenderWindow | null = null;

onMounted(async () => {
  fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
    controlPanelStyle: controlPanelLeftStyle
  });
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();
  fullScreenRenderer.addController(controlPanel);

  const lookupTable = vtkLookupTable.newInstance({ hueRange: [0.666, 0] });

  const planeSource = vtkPlaneSource.newInstance({
    xResolution: 25,
    yResolution: 25,
  });
  const planeMapper = vtkMapper.newInstance({
    interpolateScalarsBeforeMapping: true,
    colorMode: ColorMode.DEFAULT,
    scalarMode: ScalarMode.DEFAULT,
    useLookupTableScalarRange: true,
    lookupTable,
  });
  const planeActor = vtkActor.newInstance();
  planeActor.getProperty().setEdgeVisibility(true);

  const simpleFilter = vtkCalculator.newInstance();

  simpleFilter.setFormulaSimple(
    FieldDataTypes.POINT, // Generate an output array defined over points.
    [], // We don't request any point-data arrays because point coordinates are made available by default.
    'z', // Name the output array "z"
    (x: number[]) => (x[0] - 0.5) * (x[0] - 0.5) + (x[1] - 0.5) * (x[1] - 0.5) + 0.125
  ); // Our formula for z

  const warpScalar = vtkWarpScalar.newInstance();
  const warpMapper = vtkMapper.newInstance({
    interpolateScalarsBeforeMapping: true,
    useLookupTableScalarRange: true,
    lookupTable,
  });
  const warpActor = vtkActor.newInstance();

  // The generated 'z' array will become the default scalars, so the plane mapper will color by 'z':
  simpleFilter.setInputConnection(planeSource.getOutputPort());

  // We will also generate a surface whose points are displaced from the plane by 'z':
  warpScalar.setInputConnection(simpleFilter.getOutputPort());
  warpScalar.setInputArrayToProcess(0, 'z', 'PointData', 'Scalars');

  planeMapper.setInputConnection(simpleFilter.getOutputPort());
  planeActor.setMapper(planeMapper);

  warpMapper.setInputConnection(warpScalar.getOutputPort());
  warpActor.setMapper(warpMapper);

  renderer.addActor(planeActor);
  renderer.addActor(warpActor);

  renderer.resetCamera();
  renderWindow.render();

  // ----------------------------------------------------------------------------
  // UI control handling
  // ----------------------------------------------------------------------------

  const scalarMin = document.querySelector('.min') as HTMLInputElement;
  const scalarMax = document.querySelector('.max') as HTMLInputElement;
  function updateScalarRange() {
    const min = Number(scalarMin.value);
    const max = Number(scalarMax.value);
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      lookupTable.setMappingRange(min, max);
      renderWindow.render();
    }
  }

  const formulaInput = document.querySelector('.formula') as HTMLInputElement;
  function applyFormula() {
    let fn = null;
    try {
      fn = new Function('x,y', `return ${formulaInput.value}`);
    } catch (exc: any) {
      if (!('name' in exc && exc.name === 'SyntaxError')) {
        vtkErrorMacro(`Unexpected exception ${exc}`);
        formulaInput.style.background = '#fbb';
        return;
      }
    }
    if (fn) {
      formulaInput.style.background = '#fff';
      const formulaObj = simpleFilter.createSimpleFormulaObject(
        FieldDataTypes.POINT,
        [],
        'z',
        fn
      );

      // See if the formula is actually valid by invoking "formulaObj" on
      // a dataset containing a single point.
      planeSource.update();
      const arraySpec = formulaObj.getArrays(planeSource.getOutputData());
      const testData = vtkPolyData.newInstance();
      const testPts = vtkPoints.newInstance({
        name: 'coords',
        numberOfComponents: 3,
        size: 3,
        values: [0, 0, 0],
      });
      testData.setPoints(testPts);
      const testOut = vtkPolyData.newInstance();
      testOut.shallowCopy(testData);
      const testArrays = simpleFilter.prepareArrays(arraySpec, testData, testOut);
      try {
        formulaObj.evaluate(testArrays.arraysIn, testArrays.arraysOut);

        // We evaluated 1 point without exception... it's safe to update the
        // filter and re-render.
        simpleFilter.setFormula(formulaObj);

        simpleFilter.update();

        // Update UI with new range
        const [min, max] = simpleFilter
          .getOutputData()
          .getPointData()
          .getScalars()
          .getRange();
        debugger;
        scalarMin.value = min;
        scalarMax.value = max;
        lookupTable.setMappingRange(min, max);

        renderWindow.render();
        return;
      } catch (exc) {
        vtkErrorMacro(`Unexpected exception ${exc}`);
      }
    }
    formulaInput.style.background = '#ffb';
  }

  ['xResolution', 'yResolution'].forEach((propertyName) => {
    const dom = document.querySelector(`.${propertyName}`) as HTMLInputElement;
    dom.addEventListener('input', (e) => {
      const value = Number(e.target.value);
      planeSource.set({ [propertyName]: value });
      renderWindow.render();
    });
  });

  ['scaleFactor'].forEach((propertyName) => {
    const dom = document.querySelector(`.${propertyName}`) as HTMLInputElement;
    dom.addEventListener('input', (e) => {
      const value = Number(e.target.value);
      warpScalar.set({ [propertyName]: value });
      renderWindow.render();
    });
  });

  // Checkbox
  const visibleDom = document.querySelector('.visibility') as HTMLInputElement;
  visibleDom.addEventListener('change', (e) => {
    planeActor.setVisibility(!!e.target.checked);
    renderWindow.render();
  });

  formulaInput.addEventListener('input', applyFormula);

  ['min', 'max'].forEach((selector) => {
    const dom = document.querySelector(`.${selector}`) as HTMLInputElement;
    dom.addEventListener('input', updateScalarRange);
  });

  const nextDom = document.querySelector('.next') as HTMLElement;
  nextDom.addEventListener('click', (e) => {
    formulaIdx = (formulaIdx + 1) % FORMULA.length;
    formulaInput.value = FORMULA[formulaIdx];
    applyFormula();
    renderWindow.render();
  });

});

onBeforeRouteLeave(() => {
  fullScreenRenderer && fullScreenRenderer.removeController()
})
</script>