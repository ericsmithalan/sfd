import { EventDispatcher } from "three";
//8

import { IOutliner, IScreenSize } from "../interface";
import { IModel } from "../interface/IModel";
import { disposeObject, fitCameraToObject } from "../utils";
import { loadModel } from "../utils/loadModel";
import { Selection } from "./Selection";
import { World } from "./World";

export interface IViewportEvent {
    loading: { type: string; value: boolean };
    modelChanged: { type: string; model: IModel | null };
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    readonly world: World;
    readonly canvas: HTMLCanvasElement;
    readonly selection: Selection | null;

    private _model: IModel | null = null;
    private _edges: boolean = true;
    private geometries = 0;
    private textures = 0;
    private isMobile: boolean = false;

    size: IScreenSize = {
        width: 0,
        height: 0,
        aspect: 0,
    };

    constructor(canvas: HTMLCanvasElement, isMobile: boolean) {
        super();

        this.canvas = canvas;
        this.setSize();

        this.world = new World(canvas, isMobile, this.size);
        this.selection = isMobile
            ? null
            : new Selection(
                  this.canvas,
                  this.world.scene,
                  this.world.camera,
                  this.world.renderer,
                  this.world.orbitControls,
              );

        this.world.renderer.setAnimationLoop(() => this.animate());

        this.registerEvents();
        this.init();
    }

    async init() {
        await this.world.loadEnvironment();
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

    set model(value: IModel | null) {
        if (this._model) {
            disposeObject(this._model.object);
            disposeObject(this._model.edges);
        }

        if (value) {
            this.world.scene.add(value.object);
            this.world.scene.add(value.edges);
            value.edges.visible = this.edges;
        }

        this._model = value;
        this.dispatchEvent({ type: "modelChanged", model: value });
    }

    async loadModel(outliner: IOutliner) {
        this.dispatchEvent({ type: "loading", value: true });

        const model = await loadModel(outliner, this, this.isMobile);

        if (model.object) {
            fitCameraToObject(this.world.camera, this.world.orbitControls, [model.object], 2);
        }

        this.model = model;
        this.dispatchEvent({ type: "loading", value: false });
    }

    private animate = () => {
        const { renderer, scene, camera, orbitControls } = this.world;

        if (renderer.info.memory.geometries !== this.geometries) {
            this.geometries = renderer.info.memory.geometries;
            // console.log("geometries", this.renderer.info.memory.geometries);
        }
        if (renderer.info.memory.textures !== this.textures) {
            this.textures = renderer.info.memory.textures;
            // console.log("textures", this.renderer.info.memory.geometries);
        }

        renderer.setViewport(0, 0, this.size.width, this.size.height);

        renderer.render(scene, camera);
        this.selection?.animate();

        if (this.world.gizmo) {
            this.world.gizmo.render();
        }

        orbitControls.update();
        renderer.clearDepth();
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

        this.world.camera.aspect = this.size.aspect;
        this.world.camera.updateProjectionMatrix();

        this.world.renderer.setSize(this.size.width, this.size.height);
        this.selection?.resize();

        if (this.world.gizmo) {
            this.world.gizmo.update();
        }
    };

    private registerEvents() {
        window.addEventListener("resize", () => this.resize());
    }

    private unregisterEvents() {
        window.removeEventListener("resize", () => this.resize());
    }

    dispose() {
        this.unregisterEvents();

        if (this.model) {
            disposeObject(this.model.object);
            disposeObject(this.model.edges);
        }

        this.selection?.dispose();
        this.world.dispose();
    }
}
