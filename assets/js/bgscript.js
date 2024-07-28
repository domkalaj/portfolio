//Note that the codeS means coding symbol but for short

// Initialize the scene
const galaxyScene = new THREE.Scene();

// Set up the camera
const perspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
perspectiveCamera.position.z = 50;

// Set up the renderer
const galaxyRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
  alpha: true,
});
galaxyRenderer.setSize(window.innerWidth, window.innerHeight);

// Create the codeS field
const codeSGeometry = new THREE.BufferGeometry();
const codeSCount = 500;
const codeSPositions = new Float32Array(codeSCount * 3);

for (let i = 0; i < codeSCount * 3; i++) {
  codeSPositions[i] = (Math.random() - 0.5) * 200;
}

codeSGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(codeSPositions, 3)
);

// Load the texture for the codeS
const textureLoader = new THREE.TextureLoader();
const codeSTexture = textureLoader.load("/images/svg/icon-codingSymbol.svg");

const codeSMaterial = new THREE.PointsMaterial({
  size: 3,
  map: codeSTexture,
  transparent: true,
  color: 0xffffff,
});

const codeSField = new THREE.Points(codeSGeometry, codeSMaterial);
galaxyScene.add(codeSField);

// Mouse movement effect
let cursorX = 0;
let cursorY = 0;
let rotationX = 0;
let rotationY = 0;

document.addEventListener("mousemove", (event) => {
  cursorX = (event.clientX / window.innerWidth - 0.5) * 2;
  cursorY = (event.clientY / window.innerHeight - 0.5) * 2;

  rotationY = (cursorX * Math.PI) / 2;
  rotationX = (-cursorY * Math.PI) / 2;
});

// Animation loop
function renderScene() {
  requestAnimationFrame(renderScene);

  codeSField.rotation.y += (rotationY - codeSField.rotation.y) * 0.05;
  codeSField.rotation.x += (rotationX - codeSField.rotation.x) * 0.05;

  galaxyRenderer.render(galaxyScene, perspectiveCamera);
}

renderScene();

// Adjust the renderer size on window resize
window.addEventListener("resize", () => {
  perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
  perspectiveCamera.updateProjectionMatrix();
  galaxyRenderer.setSize(window.innerWidth, window.innerHeight);
});
