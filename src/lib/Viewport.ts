import { Config } from "../Config";

import { EventDispatcher, Fog, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ViewportGizmo } from "three-viewport-gizmo";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { fitCameraToObject } from "../utils";
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
        this.scene.name = Config.scene.name;
        this.scene.background = Config.scene.backgroundColor;
        this.scene.fog = new Fog(0x000000, 1, 200);
        this.scene.userData = new ObjectUserData({
            selectable: false,
        });

        this.camera = new PerspectiveCamera(
            Config.camera.fov,
            this.size.aspect,
            Config.camera.near,
            Config.camera.far,
        );
        this.camera.name = Config.camera.name;
        this.camera.up = Config.camera.up;
        this.camera.zoom = Config.camera.zoom;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(
            Config.camera.defaultPosition.x,
            Config.camera.defaultPosition.y,
            Config.camera.defaultPosition.z,
        );
        this.camera.userData = new ObjectUserData({
            selectable: false,
        });

        this.modelFile = new Model();

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

        this.selection = new Selection(this.container, this.scene, this.camera, this.orbitControls);

        this.gizmo = new ViewportGizmo(this.camera, this.renderer, {
            placement: "bottom-right",
        });
        this.gizmo.scale.set(0.7, 0.7, 0.7);
        this.gizmo.attachControls(this.orbitControls);

        this.lights = new Lights();
        this.floor = new Floor();
        this.grid = new Grid();

        this.add(
            this.lights.ambient,
            this.lights.directional,
            this.lights.hemi,
            this.floor,
            this.grid,
        );

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
            this.selection.clear();
            this.clear();
        }

        if (e.model) {
            const model = e.model;
            if (model.up.y === 1) {
                model.rotateX(Math.PI / 2);
            }

            const updated = fitCameraToObject(model, this.scene, this.camera, this.orbitControls);
            this.lights.directional.lookAt(updated.position);
            this.add(updated);
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
