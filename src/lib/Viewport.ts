import {
    Color,
    EventDispatcher,
    Fog,
    NeutralToneMapping,
    Object3D,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PMREMGenerator,
    Scene,
    SRGBColorSpace,
    Vector3,
    WebGLRenderer,
} from "three";
import { ViewportGizmo } from "three-viewport-gizmo";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { IScreenSize } from "../interface";
import { Floor } from "./Floor";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Model } from "./Model";

export interface IViewportEvent {
    modelChanged: { type: string; model: Model | null };
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    private readonly gizmo: ViewportGizmo;
    readonly renderer: WebGLRenderer;
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly orbitControls: OrbitControls;
    readonly canvas: HTMLCanvasElement;

    readonly lights: Lights;
    readonly grid: Grid;
    readonly floor: Floor;

    private _model: Model | null = null;

    size: IScreenSize = {
        width: 0,
        height: 0,
        aspect: 0,
    };

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;

        this.setSize();

        this.scene = new Scene();
        this.scene.name = "Scene";
        this.scene.background = new Color("#222222");
        this.scene.fog = new Fog(new Color("#222222"), 1, 100);

        this.camera = new PerspectiveCamera(40, this.size.aspect, 1, 50);
        this.camera.name = "Camera";
        this.camera.up = new Vector3(0, 0, 1);
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(5, 2, 4);

        this.renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });

        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = NeutralToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.size.width, this.size.height);
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.outputColorSpace = SRGBColorSpace;
        this.renderer.autoClear = false;

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = true;
        this.orbitControls.minDistance = 0.1;
        this.orbitControls.maxDistance = 3500;

        this.orbitControls.maxPolarAngle = Math.PI / 1.5;

        this.orbitControls.update();

        this.gizmo = new ViewportGizmo(this.camera, this.renderer, {
            placement: "bottom-right",
        });

        this.gizmo.scale.set(0.7, 0.7, 0.7);
        this.gizmo.attachControls(this.orbitControls);

        this.lights = new Lights();

        this.floor = new Floor();

        this.grid = new Grid();

        const environment = new RoomEnvironment();
        const pmremGenerator = new PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(environment).texture;
        environment.dispose();
        pmremGenerator.dispose();

        this.add(
            // this.lights.ambientLight,
            this.lights.dirLight,
            this.floor,
            this.grid,
        );

        this.renderer.setAnimationLoop(() => this.animate());

        this.registerEvents();
    }

    get model() {
        return this._model;
    }

    set model(value: Model | null) {
        this._model = value;
    }

    add(...object: Object3D[]) {
        this.scene.add(...object);
    }

    remove(...object: Object3D[]) {
        this.scene.remove(...object);
    }

    private animate = () => {
        this.renderer.setViewport(0, 0, this.size.width, this.size.height);
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);

        this.gizmo.render();
        this.orbitControls.update();
    };

    private setSize() {
        let width: number = 0;
        let height: number = 0;

        width = window.innerWidth;
        height = window.innerHeight;

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
    }
}
