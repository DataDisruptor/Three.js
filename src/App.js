import model from "./models/CesiumMan.glb";
import "./App.css";
import { useEffect } from "react";
import * as THREE from "three";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  Mesh,
  BoxGeometry,
  Material,
  MeshBasicMaterial,
  TextureLoader,
  DirectionalLight,
  MeshLambertMaterial,
  SphereGeometry,
  TorusGeometry,
  MeshPhongMaterial,
  Object3D,
  Color,
  AnimationMixer,
  Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { backAndForth } from "./components/utills";

function App() {
  //camera setup
  const camera = new PerspectiveCamera(
    50,
    window.innerHeight / window.innerHeight,
    1,
    2000
  );
  camera.position.set(25, 25, 25);
  camera.lookAt(0, 0, 0);

  //renderer setup
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //lighting setup + light target (can be any Object3D)
  const mainLight = new DirectionalLight(0xffffff, 1);
  const target = new Object3D();
  mainLight.position.y += 10;
  target.position.x -= 20;
  mainLight.target = target;

  //scene setup
  const scene = new Scene();
  scene.background = new Color(0x00acff);
  //------add a grid helper
  scene.add(new GridHelper(32, 32, 0x888888, 0x444444));
  //------create a new reference to a texture
  const texture_01 = new TextureLoader().load(
    "https://dl.polyhaven.org/file/ph-assets/Textures/png/4k/weathered_planks/weathered_planks_diff_4k.png"
  );

  //------instantiate new objects
  const cube = new Mesh(
    new BoxGeometry(2, 2, 2),
    new MeshLambertMaterial({ map: texture_01 }) //MeshBasicMaterial is non PBR
  );
  const torus = new Mesh(
    new TorusGeometry(0.3, 0.1, 16, 32),
    new MeshPhongMaterial({ map: texture_01 })
  );
  //------add instantiated objects to scene
  scene.add(cube);
  scene.add(torus);
  scene.add(mainLight);
  scene.add(target);

  /*****************************************************************************************/

  //handle resizing of window
  function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("window resized!");
  }
  window.addEventListener("resize", resizeWindow);

  //camera control
  const control = new OrbitControls(camera, renderer.domElement);

  //import 3d model + animation
  let animMixer;
  let animClip;
  const modelLoader = new GLTFLoader();
  modelLoader.loadAsync(model).then((gltf) => {
    animMixer = new AnimationMixer(gltf.scene);
    animClip = animMixer.clipAction(gltf.animations[0]);
    animClip.play();
    scene.add(gltf.scene);
  });

  /*****************************************************************************************/

  const clock = new Clock();

  //main render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    const deltaTime = clock.getDelta();
    animMixer.update(deltaTime);

    cube.rotation.x += 0.01;
    torus.rotation.y -= 0.01;
    //cube.position.x += 0.005;
    backAndForth(cube);
    torus.position.x -= 0.005;
  }

  useEffect(() => {
    if (renderer.domElement) {
      //attaching the render window to the root div - however, this can be any other container as well
      document.getElementById("root").appendChild(renderer.domElement);
      animate();
    }
  }, [renderer]);

  return (
    <div>
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa HELLO Lorem ipsum
    </div>
  );
}

export default App;
