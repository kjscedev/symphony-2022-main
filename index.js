import * as THREE from './modules/three.module.js'
import {GLTFLoader} from './modules/GLTFLoader.js'
import {GUI} from './modules/dat.gui.module.js'
import {OrbitControls} from './modules/OrbitControls.js'
import Stats from './modules/stats.module.js'

const canvas = document.querySelector('.webgl')
const mybody = document.querySelector('.canvas-container')
const scene = new THREE.Scene()


// const gui = new GUI()  //enable this to use dat gui
// const gltfFolder = gui.addFolder("Model")


const loader = new GLTFLoader()
loader.load('land/land.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
    //console.log(root.name)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})


const loader1 = new GLTFLoader()
loader1.load('land/land_left.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})
loader1.castShadow=true

const loader2 = new GLTFLoader()
loader2.load('land/land_center.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})

const loader3 = new GLTFLoader()
loader3.load('land/land_right.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.rotation.y = 1.15
    root.scale.set(0.1,0.1,0.1)
    scene.add(root)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})

// scene.add( new THREE.AxesHelper(500))

const light = new THREE.DirectionalLight(0xffffff,10)
light.position.set(2,2,5)
light.castShadow = true;
scene.add(light)

const light1 = new THREE.DirectionalLight(0xffffff,10)
light1.position.set(-2,-2,5)
light1.castShadow = true;
scene.add(light1)

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,100)
camera.position.set(0,0.5,0.1)
camera.rotation.x = -1.1
scene.add(camera)

const stats = new Stats()
stats.showPanel(0)
mybody.appendChild( stats.dom );

const raycaster = new THREE.Raycaster()
const clickMouse = new THREE.Vector2()
var draggable = new THREE.Object3D()
var data

window.addEventListener( 'resize', onWindowResize );
window.addEventListener('click',event=>{
    clickMouse.x = (event.clientX/window.innerWidth)*2-1;
    clickMouse.y = -(event.clientY/window.innerHeight)*2+1;
    // console.log('in click event')
    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    // console.log(found)
    if(found.length>0 && found[0].object){
        draggable = found[0].object
        data = found[0].object.userData.name
        console.log(data)
    }
    if(data == 'Cube.001'){
        location.replace('./pages/events.html')
    }
})

window.addEventListener('touchstart',event=>{
    clickMouse.x = (event.pageX/window.innerWidth)*2-1;
    clickMouse.y = -(event.pageY/window.innerHeight)*2+1;
    // console.log('in click event')
    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    // console.log(found)
    if(found.length>0 && found[0].object){
        draggable = found[0].object
        data = found[0].object.userData.name
        console.log(data)
    }
    if(data == 'Cube.001'){
        location.replace('./pages/events.html')
    }
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false
controls.enablePan = true
controls.enableRotate = false
controls.enableZoom = false
controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE
}
controls.touches = {
	ONE: THREE.TOUCH.PAN,
	TWO: THREE.TOUCH.ROTATE
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
}) 

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true

function animate(){
    requestAnimationFrame(animate)
    stats.update()
    render()
}

function render(){
    renderer.render(scene, camera)
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate()