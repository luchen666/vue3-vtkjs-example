<template>
  <div ref="containerRef" style="width: 100%; height: 100%"></div>
  <div id="readerDom" style="position: absolute;top: 0; right: 0;color: #fff;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

// Enable data soure for DataAccessHelper
import '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper'; // Just need HTTP
// import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper'; // HTTP + zip
// import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper'; // html + base64 + zip
// import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper'; // zip

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkTexture from '@kitware/vtk.js/Rendering/Core/Texture';
import vtkURLExtract from '@kitware/vtk.js/Common/Core/URLExtract';
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';

import vtkGLTFImporter from '@kitware/vtk.js/IO/Geometry/GLTFImporter';

import controlPanel, { loadSvg } from '@/components/controlPanel/GLTFImporter';

import { modelsJson } from '@/testData/model-index';

let mixer;
let selectedModel;
let selectedFlavor;
const userParms: any = vtkURLExtract.extractURLParameters();
const selectedScene = userParms.scene || 0;
const viewAPI = userParms.viewAPI || 'WebGL';

const modelsDictionary = {};

function createTextureWithMipmap(src: string, level: number) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = src;
  const tex = vtkTexture.newInstance();
  tex.setMipLevel(level);
  img.onload = () => {
    tex.setInterpolate(true);
    tex.setEdgeClamp(true);
    tex.setImage(img);
  };
  return tex;
}




const containerRef = ref();

function init() {

  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  fullScreenRenderer.addController(controlPanel);

  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  // Workaround for the variant switch
  const variantsModels = [
    'MaterialsVariantsShoe',
    'GlamVelvetSofa',
    'SheenChair',
    'AntiqueCamera',
  ];

  const environmentTex = createTextureWithMipmap(
    `/data/pbr/kiara_dawn_4k.jpg`,
    8
  );
  renderer.setUseEnvironmentTextureAsBackground(false);

  if (variantsModels.includes(userParms.model)) {
    renderer.setEnvironmentTextureDiffuseStrength(0);
    renderer.setEnvironmentTextureSpecularStrength(0);
  } else {
    renderer.setEnvironmentTexture(environmentTex);
    renderer.setEnvironmentTextureDiffuseStrength(1);
    renderer.setEnvironmentTextureSpecularStrength(1);
  }

  const reader = vtkGLTFImporter.newInstance({
    renderer,
  });

  const rootContainer = document.querySelector('body') as HTMLElement;
  const modelSelector = document.querySelector('.models') as HTMLElement;
  const flavorSelector = document.querySelector('.flavor') as HTMLElement;
  const scenesSelector = document.querySelector('.scenes') as HTMLElement;
  const camerasSelector = document.querySelector('.cameras') as HTMLElement;
  const animationsSelector = document.querySelector('.animations') as HTMLElement;
  const variantsSelector = document.querySelector('.variants') as HTMLElement;

  const eSpecularChange = document.querySelector('.e-specular') as HTMLElement;
  const eDiffuseChange = document.querySelector('.e-diffuse') as HTMLElement;
  const angleChange = document.querySelector('.angle') as HTMLElement;
  const useTextureBackgroundChange = document.querySelector('.use-background') as HTMLElement;

  // add a loading svg to the container and remove once the reader is ready
  const loading = document.createElement('div');
  loading.innerHTML = loadSvg;
  // loading message should center in the window
  loading.style.position = 'absolute';
  loading.style.left = '50%';
  loading.style.top = '50%';
  loading.style.transform = 'translate(-50%, -50%)';

  // ----------------------------------------------------------------------------
  function animateScene(lastTime = 0) {
    const currentTime = performance.now();
    const dt = (currentTime - lastTime) / 1000;

    mixer.update(dt);

    renderWindow.render();
    requestAnimationFrame(() => animateScene(currentTime));
  }

  function ready() {
    console.log('Ready');
    // remove loading message
    loading.remove();

    reader.importActors();
    reader.importCameras();
    reader.importLights();
    reader.importAnimations();

    renderer.resetCamera();
    renderWindow.render();

    // Play animations
    const animations = reader.getAnimations();
    if (animations.length > 0) {
      animations.forEach((animation, name) => {
        const option = document.createElement('option');
        option.value = animation.id;
        option.textContent = animation.id;
        animationsSelector.appendChild(option);
      });

      // Play the first animation by default
      const defaultAnimation = animations[0];
      mixer = reader.getAnimationMixer();
      mixer.play(defaultAnimation.id);
      animateScene();
      (document.querySelector('.animations-container') as HTMLElement).style.display = 'table-row';
    }

    const cameras = reader.getCameras();
    cameras.forEach((camera, name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      camerasSelector.appendChild(option);
    });

    const scenes = reader.getScenes();
    if (scenes.length > 1) {
      scenesSelector.innerHTML = '';
      scenes.forEach((scene, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Scene ${index}`;
        if (index === selectedScene) {
          option.selected = true;
        }
        scenesSelector.appendChild(option);
      });
    }

    const variants = reader.getVariants();
    if (variants.length > 1) {
      variantsSelector.innerHTML = '';
      variants.forEach((variant, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = variant;
        variantsSelector.appendChild(option);
      });
      (document.querySelector('.variants-container') as HTMLElement).style.display = 'table-row';
    }
  }

  console.log(modelsJson, 'modelsJson');

  const modelsFolder = 'Models';

  modelsJson.forEach((entry) => {
    if (entry.variants !== undefined && entry.name !== undefined) {
      const variants = [];

      Object.keys(entry.variants).forEach((variant: string) => {
        const fileName = entry.variants[variant];
        variants[variant] = `${modelsFolder}/${entry.name}/${variant}/${fileName}`;
      });

      modelsDictionary[entry.name] = variants;
    }
  });

  const modelsNames = Object.keys(modelsDictionary);
  modelsNames.forEach((modelName) => {
    const option = document.createElement('option');
    option.value = modelName;
    option.textContent = modelName;
    if (userParms.model === modelName) {
      option.selected = true;
    }
    modelSelector.appendChild(option);
  });

  selectedModel = userParms.model || modelsNames[0];
  const variants = Object.keys(modelsDictionary[selectedModel]).sort();

  selectedFlavor = userParms.flavor || variants[0];
  variants.forEach((variant) => {
    const option = document.createElement('option');
    option.value = variant;
    option.textContent = variant;
    if (variant === selectedFlavor) {
      option.selected = true;
    }
    flavorSelector.appendChild(option);
  });

  const baseUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main';
  // const baseUrl = '${window.location.origin}/data/pbr/GLTFImporter';
  const url = `${baseUrl}/${modelsDictionary[selectedModel][selectedFlavor]}`;

  if (selectedFlavor === 'glTF-Draco') {
    const dracoUrl = 'https://unpkg.com/draco3dgltf@1.3.6/draco_decoder_gltf_nodejs.js';
    vtkResourceLoader
      .loadScript(dracoUrl)
      .then(() => {
        // Set decoder function to the vtk reader
        // eslint-disable-next-line no-undef
        reader.setDracoDecoder(DracoDecoderModule);
        reader
          .setUrl(url, { binary: true, sceneId: selectedScene })
          .then(reader.onReady(ready));
      });
  } else {
    reader
      .setUrl(url, { binary: true, sceneId: selectedScene })
      .then(reader.onReady(ready));
  }

  // Get the value of the radio button named 'renderer' and set the view API accordingly
  document.querySelectorAll("input[name='viewAPI']").forEach((input: HTMLInputElement) => {
    if (input.value === viewAPI) {
      input.checked = true;
    }
    input.addEventListener('change', (evt) => {
      window.location = `?model=${selectedModel}&viewAPI=${evt.target.value}`;
    });
  });

  modelSelector.onchange = (evt: Event) => {
    if (!evt || !evt.target) return;
    window.location = `?model=${(<HTMLInputElement>evt.target).value}&viewAPI=${viewAPI}`;
  };

  flavorSelector.onchange = (evt) => {
    if (!evt || !evt.target) return;
    window.location = `?model=${selectedModel}&flavor=${evt.target.value}&scene=${selectedScene}&viewAPI=${viewAPI}`;
  };

  scenesSelector.onchange = (evt) => {
    if (!evt || !evt.target) return;
    window.location = `?model=${selectedModel}&flavor=${selectedFlavor}&scene=${evt.target.value}&viewAPI=${viewAPI}`;
  };

  camerasSelector.onchange = (evt) => {
    reader.setCamera(evt.target.value);
    renderWindow.render();
  };

  variantsSelector.onchange = async (evt) => {
    await reader.switchToVariant(Number(evt.target.value));
    renderWindow.render();
  };

  useTextureBackgroundChange.addEventListener('input', (e) => {
    const useTexturedBackground = Boolean(e.target.checked);
    renderer.setUseEnvironmentTextureAsBackground(useTexturedBackground);
    renderWindow.render();
  });

  angleChange.addEventListener('input', (e) => {
    const angle = Number(e.target.value);
    renderer.getActiveCamera().setViewAngle(angle);
    renderWindow.render();
  });

  eSpecularChange.addEventListener('input', (e) => {
    const specular = Number(e.target.value);
    renderer.setEnvironmentTextureSpecularStrength(specular);
    renderWindow.render();
  });

  eDiffuseChange.addEventListener('input', (e) => {
    const diffuse = Number(e.target.value);
    renderer.setEnvironmentTextureDiffuseStrength(diffuse);
    renderWindow.render();
  });

  rootContainer.appendChild(loading);
}

onMounted(() => {
  init();
});

</script>
<style scoped>
.loader-svg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  stroke: #bbb;
}

.loader-svg.bg {
  stroke-width: 4px;
  stroke: #333;
}

.animate {
  stroke-dasharray: 242.6;
  animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;
}

@keyframes fill-animation {
  0% {
    stroke-dasharray: 40 242.6;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 141.3;
    stroke-dashoffset: 141.3;
  }

  100% {
    stroke-dasharray: 40 242.6;
    stroke-dashoffset: 282.6;
  }
}
</style>
