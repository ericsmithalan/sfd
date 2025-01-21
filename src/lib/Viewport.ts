import {
    Color,
    EventDispatcher,
    Fog,
    NeutralToneMapping,
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
import { IOutliner, IScreenSize } from "../interface";
import { IModel } from "../interface/IModel";
import { loadModel } from "../utils/loadModel";
import { Floor } from "./Floor";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Selection } from "./Selection";

export interface IViewportEvent {
    loading: { type: string; value: boolean };
    modelChanged: { type: string; model: IModel | null };
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    private readonly gizmo: ViewportGizmo;
    readonly renderer: WebGLRenderer;
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly orbitControls: OrbitControls;
    readonly canvas: HTMLCanvasElement;
    readonly selection: Selection;

    readonly lights: Lights;
    readonly grid: Grid;
    readonly floor: Floor;

    private _model: IModel | null = null;
    private _edges: boolean = true;

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

        this.selection = new Selection(
            this.canvas,
            this.scene,
            this.camera,
            this.renderer,
            this.orbitControls,
        );
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

        this.scene.add(
            // this.lights.ambientLight,
            this.lights.dirLight,
            this.floor,
            this.grid,
        );

        this.renderer.setAnimationLoop(() => this.animate());

        this.registerEvents();
    }

    get edges() {
        return this._edges;
    }

    set edges(value: boolean) {
        if (this.model) {
            this.model.edges.visible = value;
            this._edges = value;
        }
    }

    get model() {
        return this._model;
    }

    private clearModel() {
        if (this._model) {
            if (this._model.object.parent) {
                this.scene.remove(this._model.object);
            }
            if (this._model.edges.parent) {
                this.scene.remove(this._model.edges);
            }
        }
    }

    private addModel(model: IModel | null) {
        this.clearModel();

        if (model) {
            this.scene.add(model.object);
            this.scene.add(model.edges);
            model.edges.visible = this.edges;
        }
    }

    set model(value: IModel | null) {
        this.addModel(value);
        this._model = value;
        this.dispatchEvent({ type: "modelChanged", model: value });
    }

    async loadModel(outliner: IOutliner) {
        this.dispatchEvent({ type: "loading", value: true });
        const model = await loadModel(outliner, this);
        this.model = model;
        this.dispatchEvent({ type: "loading", value: false });
    }

    private animate = () => {
        this.renderer.setViewport(0, 0, this.size.width, this.size.height);
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);
        this.selection.animate();
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
        this.selection.resize();
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
        this.selection.dispose();
    }
}
