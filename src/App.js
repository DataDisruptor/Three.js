import logo from "./logo.svg";
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
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

  //scene setup
  const scene = new Scene();
  //------add object to the scene
  //------add a grid helper
  scene.add(new GridHelper(32, 32, 0x888888, 0x444444));
  //------create a new reference to a texture
  const texture_01 = new TextureLoader().load(
    "https://dl.polyhaven.org/file/ph-assets/Textures/png/4k/weathered_planks/weathered_planks_diff_4k.png"
  );
  //------create a new reference to an object
  const cube = new Mesh(
    new BoxGeometry(10, 10, 10),
    new MeshBasicMaterial({ map: texture_01 })
  );

  //------add the reference to the object to the scene
  scene.add(cube);
  //------can move the object in the scene

  //main render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log(cube.position);
    //cube.position.x += 0.01;
    backAndForth(cube);
  }
  useEffect(() => {
    if (renderer.domElement) {
      //attaching the render window to the root div - however, this can be any other container as well
      document.getElementById("root").appendChild(renderer.domElement);
      animate();
    }
  }, [renderer]);

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

  return (
    <div>
      <img
        src="https://dl.polyhaven.org/file/ph-assets/Textures/png/4k/weathered_planks/weathered_planks_diff_4k.png"
        alt="null"
      />
    </div>
  );
}

export default App;
