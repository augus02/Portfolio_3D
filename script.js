import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(-200, 200, 0);
const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
scene.background = new THREE.Color(0xffaaaa);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.15, // strength
    0.5, // radius
    0.3 // threshold
);
const outputPass = new OutputPass();

composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(outputPass);

const light = new THREE.AmbientLight( 0xffffff, 0.5, 0, 0.01 );
light.position.set( 0, 200, 0 );
//const lightHelper = new THREE.AmbientLightHelper( light );
//scene.add( lightHelper );
scene.add( light );

const light3 = new THREE.SpotLight( 0xffffff, 5, 0, Math.PI/6 , 0.25, 0.01);
light3.position.set( 0, 500, 0 );
const debugsphere = new THREE.SphereGeometry( 0.5, 32, 32 );
const debugmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const debugmesh = new THREE.Mesh( debugsphere, debugmaterial );
debugmesh.position.set(0, 30, 0);
//scene.add( debugmesh );

const light3Helper = new THREE.SpotLightHelper( light3 );
//scene.add( light3Helper );
scene.add( light3 );

const CubeGeom = new THREE.BoxGeometry( 5000, 2, 5000 );
const CubeMat = new THREE.MeshPhysicalMaterial( {color: 0xc7c7c7, metalness: 0.25, roughness: 0, reflectivity: 1
} );
const cube = new THREE.Mesh( CubeGeom, CubeMat );
cube.position.set(0, -20, 0);
scene.add( cube );

// objects declaration
let turbo;
let turbo1;
let turbo2;
let turbo3;
let fleche1;
let fleche2;
let originalcolors;
let speed = 0.05;

const loader = new OBJLoader();

const axesHelper = new THREE.AxesHelper( 250 );
//scene.add( axesHelper );

// loader.load(
//   // resource URL
//   'turbo_2.obj',
//   // called when resource is loaded
//   function ( object ) {
//     object.material = new THREE.MeshPhysicalMaterial( {
//       color: 0xECF0F1,
//       envMap: scene.background,
//       envMapIntensity: 1.0,
//       ior: 1.25,
//       iridescence: 0,
//       metalness: 0,
//       roughness: 0.8,
//       opacity: 1,
//       thickness: 5.0,
//       transmission: 0,
//   } );
//   console.log(object);
// });  

let textureLoader = new THREE.TextureLoader();
// load a resource
loader.load(
	// resource URL
	'turbo_2.obj',
	// called when resource is loaded
	function ( object ) {
    object.children[0].material = new THREE.MeshPhysicalMaterial( {
      color: 0x424949,
      envMap: scene.background,
      envMapIntensity: 1.0,
      ior: 1.25,
      iridescence: 0,
      metalness: 1,
      roughness: 0.4,
      aoMapIntensity: 1,
      ambientIntensity: 0.2,
      displacementScale: 2.4,
      normalScale: 1,
      opacity: 1,
      thickness: 5.0,
      transmission: 0,
    } );
    object.children[1].material = new THREE.MeshPhysicalMaterial( {
      // normalMap: textureLoader.load( 'metal_texture.jpg' ),
      color: 0xECF0F1,
      envMap: scene.background,
      envMapIntensity: 1.0,
      ior: 1.25,
      iridescence: 0,
      metalness: 1,
      roughness: 0.4,
      aoMapIntensity: 1,
      ambientIntensity: 0.2,
      normalScale: 1,
      opacity: 1,
      thickness: 5.0,
      transmission: 0,
  } );
  object.children[2].material = new THREE.MeshPhysicalMaterial( {
      color: 0xECF0F1,
      envMap: scene.background,
      envMapIntensity: 1.0,
      ior: 1.25,
      iridescence: 0,
      metalness: 1,
      roughness: 0.4,
      aoMapIntensity: 1,
      ambientIntensity: 0.2,
      displacementScale: 2.4,
      normalScale: 1,
      opacity: 1,
      thickness: 5.0,
      transmission: 0,
} );
    turbo = object;
    object.position.set(0, 0, 0);
    object.name = "turbo";
    object.rotation.x = -Math.PI / 2;
		scene.add( object );
    console.log(object);
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

loader.load(
	// resource URL
	'fleche.obj',
	// called when resource is loaded
	function ( object ) {
    let material = new THREE.MeshPhysicalMaterial( {
      color: 0xECF0F1,
      envMap: scene.background,
      envMapIntensity: 1.0,
      ior: 1.25,
      iridescence: 0,
      metalness: 0,
      roughness: 0.8,
      opacity: 1,
      thickness: 5.0,
      transmission: 0,
  } );
    fleche1 = object.children[0].clone();
    fleche1.material = material.clone();

    fleche2 = object.children[0].clone();
    fleche2.material = material.clone();
    fleche1.position.set(0, 170, 0);
    fleche2.position.set(-43, 7, 50);
    fleche1.rotation.x = Math.PI;
    fleche2.rotation.x = Math.PI/2;
    fleche1.name = "fleche1";
    fleche2.name = "fleche2";
		scene.add( fleche1 );
    scene.add( fleche2 );
    console.log(object);
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function hide3(){
  if(turbo!==undefined && turbo3!==undefined) {
    if(turbo3.position.y < 100) {
      turbo3.position.y = 10000;
    }
    else{
      turbo3.position.y = 0;
    }
  }
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
      case "l":
          light3.visible = !light3.visible;
          break;
      case "h":
          hide3();
          //turbo3.visible = !turbo3.visible;
        break;
      case "s":
        if(speed<0.25){
          speed += 0.05;
        }
        else{
          speed = 0.05;
        }
        break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

const raycaster = new THREE.Raycaster();
let pointerPosition = { x: 0, y: 0 };
window.addEventListener('pointermove', (event) => {
    pointerPosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointerPosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

const casingMessage = document.getElementById("casingMessage");
const impellerMessage = document.getElementById("impellerMessage");

window.addEventListener('mousedown', (event) => {
  switch(event.button) {
    case 0:
      if(turbo!==undefined && turbo1!==undefined && turbo2!==undefined) {
        if(turbo1.material.color.getHex() === 0x00ff00) {
          if(turbo2.material.color.getHex() !== 0x00ff00 && turbo3.material.color.getHex() !== 0x00ff00) {
            camera.position.set(-200, 50, -50);
            turbo2.material.color = new THREE.Color(0xECF0F1);
            turbo3.position.y = 10000;
            impellerMessage.style.visibility = "visible";
            casingMessage.style.visibility = "hidden";
          }
        }
        if(turbo2.material.color.getHex() === 0x00ff00) {
          camera.position.set(-200, 100, 100);
          turbo2.material.color = new THREE.Color(0xEE0000);
          turbo1.material.color = new THREE.Color(0x424949);
          turbo3.material.color = new THREE.Color(0x00ff00);
          turbo3.position.y = 10000;
          casingMessage.style.visibility = "visible";
          impellerMessage.style.visibility = "hidden";
        }
        if(turbo3.material.color.getHex() === 0x00ff00) {
          camera.position.set(-200, 100, 100);
          turbo2.material.color = new THREE.Color(0xEE0000);
          turbo1.material.color = new THREE.Color(0x424949);
          turbo3.material.color = new THREE.Color(0x00ff00);
          turbo3.position.y = 10000;
          casingMessage.style.visibility = "visible";
          impellerMessage.style.visibility = "hidden";
        }
      }
      break;
  }

});

let objects = [turbo1, turbo2, turbo3, fleche1, fleche2];
let oldlength;
let length;

function animate() {
  if(camera.position.y <0)
  {
    camera.position.y = 0;
  }
  objects = [turbo1, turbo2, turbo3, fleche1, fleche2];
  if(fleche1!==undefined && fleche2!==undefined && turbo1!==undefined && turbo2!==undefined && turbo3!==undefined) {
    raycaster.setFromCamera(pointerPosition, camera);
    const intersects = raycaster.intersectObjects(objects);
    length = intersects.length;
    if (length!==undefined && oldlength!==undefined && length!==oldlength && oldlength!==0){
      length=0;
      console.log(length, oldlength);
    }
    if (length > 0 &&  intersects[0].object.name !== "fleche1" && intersects[0].object.name !== "fleche2") {
      if (intersects[0].object.material.color.getHex() !== 0xEE0000) {
        intersects[0].object.material.color = new THREE.Color(0x00ff00);
      } 
    }
    else {
      if(turbo1.material.color.getHex() !== 0x00ff00)
      {
        turbo1.material.color = new THREE.Color(0x424949);
      }
      if(turbo2.material.color.getHex() !== 0xEE0000)
      {
        turbo2.material.color = new THREE.Color(0xECF0F1);
      }
        
        turbo3.material.color = new THREE.Color(0xECF0F1);
        fleche1.material.color = new THREE.Color(0xFFAAAA);
        fleche2.material.color = new THREE.Color(0xFFAAAA);
    }
    oldlength = length;
  }
  
  if(turbo!==undefined && turbo1===undefined && turbo2===undefined) {
    console.log(turbo);
    turbo1 = turbo.children[0];
    turbo2 = turbo.children[1];
    turbo3 = turbo.children[2];
  }
  if(turbo1!==undefined) {
    turbo1.rotation.z += speed;
  }
  if(fleche1!==undefined) {
    if(fleche1.position.y > 110) {
      fleche1.position.y -= speed*5;
    }
    else {
      fleche1.position.y = 170;
    }
  }
  if(fleche2!==undefined) {
    if(fleche2.position.z<110){
      fleche2.position.z += speed*5;
    }
    else {
      fleche2.position.z = 50;
    }
  }
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
    //renderer.render(scene, camera);
  }



animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})
