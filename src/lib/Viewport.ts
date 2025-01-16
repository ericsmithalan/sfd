import { Config } from "./Config";

import {
    AmbientLight,
    CameraHelper,
    EventDispatcher,
    HemisphereLight,
    HemisphereLightHelper,
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";
import { ViewportGizmo } from "three-viewport-gizmo";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFFile } from "./GLTFFile";
import { ObjectUserData } from "./ObjectUserData";
import { Selection } from "./Selection";
import { Grid } from "./Grid";

export interface IViewportEvent {
    resize: { type: string; size: IScreenSize };
    loading: { type: string; isLoading: boolean };
    updated: { type: string; object: Object3D };
}

export interface IScreenSize {
    width: number;
    height: number;
    aspect: number;
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    private readonly gizmo: ViewportGizmo;

    readonly selection: Selection;
    readonly container: HTMLElement;
    readonly renderer: WebGLRenderer;
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly orbitControls: OrbitControls;
    readonly canvas: HTMLCanvasElement;
    readonly gltfFile: GLTFFile;

    size: IScreenSize = {
        width: 0,
        height: 0,
        aspect: 0,
    };

    constructor(
        canvas: HTMLCanvasElement,
        container: HTMLElement | null = null
    ) {
        super();

        this.canvas = canvas;
        this.container = container || canvas;

        this.setSize();

        this.scene = new Scene();
        this.scene.name = Config.scene.name;
        this.scene.background = Config.scene.backgroundColor;
        this.scene.userData = new ObjectUserData({
            selectable: false,
        });

        this.camera = new PerspectiveCamera(
            Config.camera.fov,
            this.size.aspect,
            Config.camera.near,
            Config.camera.far
        );
        this.camera.name = Config.camera.name;
        this.camera.up = Config.camera.up;
        this.camera.zoom = Config.camera.zoom;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(
            Config.camera.defaultPosition.x,
            Config.camera.defaultPosition.y,
            Config.camera.defaultPosition.z
        );
        this.camera.userData = new ObjectUserData({
            selectable: false,
        });

        this.gltfFile = new GLTFFile(this.scene, this.camera, this.container);

        this.renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: Config.renderer.antialias,
            alpha: Config.renderer.alpha,
        });
        this.renderer.shadowMap.enabled = Config.renderer.shadowMap;
        this.renderer.toneMapping = Config.renderer.toneMapping;
        this.renderer.toneMappingExposure = Config.renderer.toneMappingExposure;
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.shadowMap.type = Config.renderer.shadowMapType;
        this.renderer.setSize(this.size.width, this.size.height);

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = true;
        this.orbitControls.minDistance = 0.1;
        this.orbitControls.maxDistance = 500;
        this.orbitControls.maxPolarAngle = Math.PI / 1.5;
        this.orbitControls.update();

        this.selection = new Selection(
            this.container,
            this.scene,
            this.camera,
            this.orbitControls
        );

        this.gizmo = new ViewportGizmo(this.camera, this.renderer, {
            placement: "bottom-right",
        });
        this.gizmo.scale.set(0.7, 0.7, 0.7);
        this.gizmo.attachControls(this.orbitControls);

        this.renderer.setAnimationLoop(() => this.animate());

        this.registerEvents();

        this.initialize();
    }

    add(...object: Object3D[]) {
        this.scene.add(...object);
    }

    remove(...object: Object3D[]) {
        this.scene.remove(...object);
    }

    clear() {
        if (this.selection.object) {
            this.selection.object = null;
        }
    }

    private async initialize() {
        const gridHelper = new Grid();

        const hemiLight = new HemisphereLight(0xffffff, 1);
        hemiLight.name = "Hemi Light";
        hemiLight.userData = new ObjectUserData({
            selectable: false,
        });

        const ambientLight = new AmbientLight(0xffffff, 1);
        ambientLight.name = "Ambiant Light";
        ambientLight.userData = new ObjectUserData({
            selectable: false,
        });

        this.add(hemiLight, ambientLight, this.camera, gridHelper);
    }

    private animate = () => {
        this.renderer.setViewport(0, 0, this.size.width, this.size.height);

        this.renderer.render(this.scene, this.camera);

        this.gizmo.render();
        this.selection.animate();
        this.orbitControls.update();
    };

    private setSize() {
        let width: number = 0;
        let height: number = 0;

        if (this.container && this.container.tagName !== "CANVAS") {
            const bounds = this.container.getBoundingClientRect();
            width = bounds.width;
            height = bounds.height;
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        this.size.aspect = width / height;
        this.size.width = width;
        this.size.height = height;
    }

    private resize = () => {
        this.setSize();

        this.camera.aspect = this.size.aspect;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.size.width, this.size.height);
        this.gizmo.update();
        this.dispatchEvent({ type: "resize", size: this.size });

        this.selection.resize();
    };

    private registerEvents() {
        window.addEventListener("resize", () => this.resize());
    }

    private unregisterEvents() {
        window.removeEventListener("resize", () => this.resize());
    }

    dispose() {
        this.unregisterEvents();

        this.orbitControls.dispose();
        this.renderer.dispose();
        this.selection.dispose();

        // this.orbitControls.dispose();
    }
}
