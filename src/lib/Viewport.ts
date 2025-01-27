import { Clock, EventDispatcher } from "three";
//8

import { IOutliner } from "../interface";
import { IModel } from "../interface/IModel";
import { disposeObject, fitCameraToObject } from "../utils";
import { loadModel } from "../utils/loadModel";
import { Selection } from "./Selection";
import { IWorldEvent, World } from "./World";

export interface IViewportEvent {
    loading: { type: string; value: boolean };
    modelChanged: { type: string; model: IModel | null };
    animate: { type: string; time: number };
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    private readonly isMobile: boolean = false;

    readonly world: World;
    readonly selection: Selection | null;

    private _model: IModel | null = null;
    private _edges: boolean = true;

    clock = new Clock();
    animating: boolean = false;

    constructor(canvas: HTMLCanvasElement, isMobile: boolean) {
        super();

        this.world = new World(canvas, isMobile);
        this.selection = isMobile
            ? null
            : new Selection(canvas, this.world.scene, this.world.camera, this.world.renderer);

        this.world.renderer.setAnimationLoop(() => this.animate());

        this.init();
    }

    get edges() {
        return this._edges;
    }

    set edges(value: boolean) {
        if (this.model) {
            this.model.edges.edgeGroup.visible = value;
            this._edges = value;
        }
    }

    get model() {
        return this._model;
    }

    set model(value: IModel | null) {
        if (this._model) {
            disposeObject(this._model.object);
            this._model.edges.dispose();
        }

        if (value) {
            this.world.scene.add(value.object);
            this.world.scene.add(value.edges.edgeGroup);
            value.edges.edgeGroup.visible = this.edges;
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

    private async init() {
        this.world.addEventListener("resize", this.resize);
        await this.world.loadEnvironment();
        console.log("cool");
    }

    private resize(e: IWorldEvent["resize"]) {
        this.selection?.resize();
    }

    private animate = () => {
        const { renderer, scene, camera, orbitControls, size, gizmo } = this.world;

        renderer.setViewport(0, 0, size.width, size.height);
        renderer.render(scene, camera);

        if (this.animating && this.model?.edges) {
            this.model.edges.update(this.world.scene);
        }

        this.selection?.animate();

        if (gizmo) {
            gizmo.render();
        }

        orbitControls.update();
        renderer.clearDepth();
        this.dispatchEvent({ type: "animate", time: this.clock.getDelta() });
        this.world.logStats();
    };

    dispose() {
        this.world.removeEventListener("resize", this.resize);

        if (this.model) {
            disposeObject(this.model.object);
            this.model.edges.dispose();
        }

        this.selection?.dispose();
        this.world.dispose();
    }
}
