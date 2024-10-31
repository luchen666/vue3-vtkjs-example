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


let renderer: vtkRenderer;
let renderWindow: vtkRenderWindow;
const reader = vtkPLYReader.newInstance();
const mapper = vtkMapper.newInstance();
const actor = vtkActor.newInstance();

actor.setMapper(mapper);
mapper.setInputConnection(reader.getOutputPort());


const containerRef = ref();

function init() {
  const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
    container: containerRef.value,
  });
  renderer = fullScreenRenderer.getRenderer();
  renderWindow = fullScreenRenderer.getRenderWindow();
  renderer.addActor(actor);
  renderer.resetCamera();
  renderWindow.render();
}

function handlePlyFile(file: Blob) {
  const fileReader = new FileReader();
  fileReader.onload = function onLoad() {
    if (!(fileReader.result instanceof ArrayBuffer)) return;
    reader.parseAsArrayBuffer(fileReader.result);
    renderer.resetCamera();
    renderWindow.render();
  };
  fileReader.readAsArrayBuffer(file);
}

const handleImgFile = (url: string) => {
  const image = new Image();
  image.src = url;
  const texture = vtkTexture.newInstance();
  texture.setInterpolate(true);
  texture.setEdgeClamp(true);
  texture.setImage(image);
  actor.addTexture(texture);
  renderer.resetCamera();
  renderWindow.render();
}


let myContainer: HTMLElement;
let fileContainer: HTMLElement;

const handleFile = (event: InputEvent) => {
  event.preventDefault();
  const dataTransfer = event.dataTransfer;
  const files = (event.target as HTMLInputElement).files || dataTransfer?.files;
  if (!files) return;
  if (files.length === 1) {
    myContainer.removeChild(fileContainer);
    handlePlyFile(files[0]);
  } else if (files.length > 1) {
    myContainer.removeChild(fileContainer);
    Array.from(files).forEach((file) => {
      const name = file.name.toLowerCase();
      if (name.endsWith('.ply')) {
        handlePlyFile(file);
      }
      if (
        name.endsWith('.png') ||
        name.endsWith('.jpg') ||
        name.endsWith('.jpeg')
      ) {
        actor.removeAllTextures();
        var reader = new FileReader()
        reader.onload = function () {
          if (typeof reader.result !== "string") return;
          handleImgFile(reader.result);
        }
        reader.readAsDataURL(file)
      }
    });
  }
}

/** 添加 input */
const addInput = () => {
  myContainer = document.querySelector('#readerDom') as HTMLElement;
  fileContainer = document.createElement('div');
  fileContainer.innerHTML =
    '<div>Select a ply file or a ply file with its texture file.<br/><input type="file" class="file" multiple/></div>';
  myContainer.appendChild(fileContainer);

  const fileInput = fileContainer.querySelector('input') as HTMLInputElement;
  fileInput.addEventListener('change', handleFile);
}

onMounted(() => {
  addInput();
  init();
});

// ----------------------------------------------------------------------------
// Use the reader to download a file
// ----------------------------------------------------------------------------

reader.setUrl(`/data/ply_png/2023-08-01_041-UpperJaw.ply`, { binary: true }).then(() => {
  const property = actor.getProperty();
  property.setColor(1, 1, 1);
  property.setAmbient(0.8);
  property.setDiffuse(0.03);
  property.setSpecular(0.15);
  property.setSpecularPower(600);

  const url = "/data/ply_png/2023-08-01_041-UpperJaw.ply.png";
  handleImgFile(url);
});
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
