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
import { IModelEvent, Model } from "./Model";
import { ObjectUserData } from "./ObjectUserData";
import { Selection } from "./Selection";

export interface IViewportEvent {
    resize: { type: string; size: IScreenSize };
    loading: { type: string; isLoading: boolean };
    updated: { type: string; object: Object3D };
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
    readonly modelFile: Model;
    readonly lights: Lights;
    readonly grid: Grid;
    readonly floor: Floor;

    size: IScreenSize = {
        width: 0,
        height: 0,
        aspect: 0,
    };

    constructor(canvas: HTMLCanvasElement, container: HTMLElement | null = null) {
        super();

        this.canvas = canvas;
        this.container = container || canvas;

        this.setSize();

        this.scene = new Scene();
        this.scene.name = "Scene";
        this.scene.background = new Color("#222222");
        this.scene.fog = new Fog(new Color("#222222"), 1, 100);
        this.scene.userData = new ObjectUserData({
            selectable: false,
        });

        this.camera = new PerspectiveCamera(40, this.size.aspect, 1, 50);
        this.camera.name = "Camera";
        this.camera.up = new Vector3(0, 0, 1);
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(5, 2, 4);
        this.camera.userData = new ObjectUserData({
            selectable: false,
        });

        this.modelFile = new Model();

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

        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = true;
        this.orbitControls.minDistance = 0.1;
        this.orbitControls.maxDistance = 3500;
        this.orbitControls.maxPolarAngle = Math.PI / 1.5;

        this.orbitControls.update();

        this.selection = new Selection(this.container, this.scene, this.camera, this.orbitControls);

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

        this.add(this.lights.dirLight, this.floor, this.grid);

        this.renderer.setAnimationLoop(() => this.animate());

        this.registerEvents();
    }

    add(...object: Object3D[]) {
        this.scene.add(...object);
    }

    remove(...object: Object3D[]) {
        this.scene.remove(...object);
    }

    clear() {
        if (this.modelFile.model) {
            this.selection.clear();
            this.remove(this.modelFile.model);
            this.modelFile.reset();
        }
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

    private modelChanged(e: IModelEvent["changed"]) {
        if (e.prevModel) {
            this.clear();
        }

        if (e.model) {
            const model = e.model;
            if (model.up.y === 1) {
                model.rotateX(Math.PI / 2);
            }

            this.lights.spotLight.position.set(3, 1, 5);
            this.lights.spotLight.rotateY(Math.PI / 3);
            this.lights.spotLight.lookAt(model.position);
            this.add(model);
            model.updateMatrix();
            this.lights.spotLightHelper.update();
            model.visible = true;
        }
    }

    private registerEvents() {
        window.addEventListener("resize", () => this.resize());
        this.modelFile.addEventListener("changed", (e) => this.modelChanged(e));
    }

    private unregisterEvents() {
        window.removeEventListener("resize", () => this.resize());
        this.modelFile.removeEventListener("changed", (e) => this.modelChanged(e));
    }

    dispose() {
        this.unregisterEvents();

        this.orbitControls.dispose();
        this.renderer.dispose();
        this.selection.dispose();
    }
}
