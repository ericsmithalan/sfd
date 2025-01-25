import {
    ACESFilmicToneMapping,
    Color,
    Fog,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PMREMGenerator,
    Scene,
    SRGBColorSpace,
    UVMapping,
    WebGLRenderer,
} from "three";
import { ViewportGizmo } from "three-viewport-gizmo";
import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
//8
import hdr from "../assets/env/1a.hdr";

import { IScreenSize } from "../interface";
import { disposeObject } from "../utils";
import { Floor } from "./Floor";
import { Grid } from "./Grid";
import { Lights } from "./Lights";

export class World {
    readonly gizmo: ViewportGizmo | null;
    readonly renderer: WebGLRenderer;
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly orbitControls: OrbitControls;
    readonly lights: Lights;
    readonly grid: Grid;
    readonly floor: Floor;

    constructor(canvas: HTMLCanvasElement, isMobile: boolean, size: IScreenSize) {
        this.scene = new Scene();
        this.scene.name = "Scene";
        this.scene.background = new Color("#222222");
        this.scene.fog = new Fog(new Color("#222222"), 1, 50);

        this.camera = new PerspectiveCamera(40, size.aspect, 1, 50);
        this.camera.name = "Camera";
        // this.camera.up = new Vector3(0, 0, 1);
        // this.camera.rotateX(Math.PI / 2);
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(15, 10, 9);
        this.camera.updateProjectionMatrix();

        this.renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });

        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(size.width, size.height);
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.outputColorSpace = SRGBColorSpace;
        this.renderer.autoClear = false;

        this.orbitControls = new OrbitControls(this.camera, canvas);
        this.orbitControls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = true;
        this.orbitControls.minDistance = 0.1;
        this.orbitControls.maxDistance = 3500;

        this.orbitControls.maxPolarAngle = Math.PI / 1.5;
        this.orbitControls.update();

        this.gizmo = isMobile
            ? null
            : new ViewportGizmo(this.camera, this.renderer, {
                  placement: "bottom-right",
              });

        if (this.gizmo) {
            this.gizmo.scale.set(0.7, 0.7, 0.7);
            this.gizmo.attachControls(this.orbitControls);
        }

        this.lights = new Lights();
        this.floor = new Floor();
        this.grid = new Grid();

        this.scene.add(this.lights.dirLight, this.floor, this.grid);
    }

    async loadEnvironment() {
        // this.lights.visible(false);
        const pmremGenerator = new PMREMGenerator(this.renderer);

        const hdriLoader = new RGBELoader();
        const texture = await hdriLoader.loadAsync(hdr);

        texture.mapping = UVMapping;
        texture.colorSpace = SRGBColorSpace;

        const env = pmremGenerator.fromEquirectangular(texture).texture;
        this.scene.environment = env;

        env.dispose();
        texture.dispose();
        pmremGenerator.dispose();
    }

    dispose() {
        this.orbitControls.dispose();
        this.grid.dispose();
        this.floor.dispose();
        this.renderer.dispose();

        if (this.gizmo) {
            this.gizmo.dispose();
        }

        this.lights.dispose();

        disposeObject(this.scene);
    }
}
