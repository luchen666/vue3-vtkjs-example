<template>
  <div id='mainId'></div>
</template>

<script lang='ts' setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera: any, scene: any, renderer: any;

console.time('three');
// PLY file
const addMesh = (modelUrl: string, textureUrl: string, color = 0x009cff) => {
  return new Promise((resolve) => {
    // 读取纹理
    let material = null;
    // if(textureUrl) {
      // const texture = new THREE.TextureLoader().load(textureUrl);
      // texture.colorSpace = THREE.SRGBColorSpace;
      // material = new THREE.MeshPhongMaterial({ map: texture });
    // } else {
    material = new THREE.MeshPhongMaterial({ vertexColors: true });
    // }
    material.side = THREE.DoubleSide;

    // 读取模型
    new PLYLoader().load(modelUrl, (geometry: any) => {
      geometry.computeVertexNormals();
      console.log(geometry, 'geometry ply');
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.multiplyScalar(0.01);
      resolve(mesh)
    });
  });
}

async function init() {
  const mainDom = document.querySelector("#mainId") as HTMLElement;
  const { width, height } = mainDom.getBoundingClientRect();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  mainDom.appendChild(renderer.domElement);


  // 设置相机
  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 15);
  camera.position.set(1, 0, 1);

  // 设置场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  const baseUrl = "/data/ply_png/ply5";

  // 读取和添加模型1
  const mesh1 = await addMesh(`${baseUrl}/upperJaw.ply`, `${baseUrl}/upperJaw.png`);
  scene.add(mesh1);

  // 读取和添加模型2
  const mesh2 = await addMesh(`${baseUrl}/lowerJaw.ply`, `${baseUrl}/lowerJaw.png`);
  scene.add(mesh2);

  // 环境光
  const light = new THREE.AmbientLight(0xFFFFFF, 3);
  scene.add(light);

  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // // 设置右键旋转,中键拖拽（平移）
  // controls.mouseButtons = {
  //   RIGHT: THREE.MOUSE.ROTATE,
  //   MIDDLE: THREE.MOUSE.PAN
  // };
  controls.update();

  // 渲染
  animate();
  console.timeEnd('three');
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

onMounted(() => {
  init();
})

onUnmounted(() => { })

</script>

<style scoped lang='less'>
#mainId {
  height: 100%;
}
</style>