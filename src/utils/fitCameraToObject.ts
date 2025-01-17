import { Box3, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const DEG90 = Math.PI * 0.5;
const DEG180 = Math.PI;

export const fitCameraToObject = function (
    object: Object3D,
    scene: Scene,
    camera: PerspectiveCamera,
    controls: OrbitControls,
    offset: number = 1.25,
) {
    const boundingBox = new Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);

    const center = boundingBox.getCenter(new Vector3());

    const size = boundingBox.getSize(new Vector3());

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 2) * Math.tan(fov * 2)); //Applied fifonik correction

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    // <--- NEW CODE
    //Method 1 to get object's world position
    scene.updateMatrixWorld(); //Update world positions
    var objectWorldPosition = new Vector3();
    objectWorldPosition.setFromMatrixPosition(object.matrixWorld);

    //Method 2 to get object's world position
    //objectWorldPosition = object.getWorldPosition();

    const directionVector = camera.position.sub(objectWorldPosition); //Get vector from camera to object
    const unitDirectionVector = directionVector.normalize(); // Convert to unit vector
    const pos = unitDirectionVector.multiplyScalar(cameraZ);
    camera.position.set(pos.x, pos.y, pos.z); //Multiply unit vector times cameraZ distance
    camera.lookAt(objectWorldPosition); //Look at object
    // --->

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.rotation.z += Math.PI / 2;
    camera.updateProjectionMatrix();

    if (controls) {
        // set camera to rotate around center of loaded object
        controls.target = center;

        // prevent camera from zooming out far enough to create far plane cutoff
        controls.maxDistance = cameraToFarEdge * 2;

        controls.saveState();
    } else {
        camera.lookAt(center);
    }

    return object;
};
