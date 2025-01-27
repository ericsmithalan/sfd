import { AnimationMixer, Clock, EventDispatcher, LoopOnce, Object3D } from "three";
import { IOutliner } from "../interface";
import { IModel } from "../interface/IModel";
import { AnimationState } from "../types";
import { disposeObject, fitCameraToObject } from "../utils";
import { loadModel } from "../utils/loadModel";
import { Selection } from "./Selection";
import { IWorldEvent, World } from "./World";

export interface IViewportEvent {
    loading: { type: string; value: boolean };
    modelChanged: { type: string; model: IModel | null };
    modelAnimated: {
        type: string;
        mixer: AnimationMixer;
        running: boolean;
        state: AnimationState;
    };
    animate: { type: string; time: number };
}

export class Viewport extends EventDispatcher<IViewportEvent> {
    private readonly isMobile: boolean = false;
    mixer: AnimationMixer | null = null;

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
            this.disposeModelAnimations();
            disposeObject(this._model.object);
            this._model.edges.dispose();
        }

        if (value) {
            this.world.scene.add(value.object);
            this.world.scene.add(value.edges.edgeGroup);
            value.edges.edgeGroup.visible = this.edges;

            if (value.animations) {
                this.setupModelAnimations(value.object);
            } else {
                if (this.mixer) {
                    this.mixer.stopAllAction();
                    this.mixer = null;
                }
            }
        }

        this._model = value;
        this.dispatchEvent({ type: "modelChanged", model: value });
    }

    toggleAnimation() {
        if (!this.animating && this.mixer) {
            if (this.mixer && this.model && this.model.animations) {
                let state: AnimationState = "closed";

                this.model.animations.forEach((clip) => {
                    if (this.mixer) {
                        const action = this.mixer.clipAction(clip);

                        /// not sure why this works??
                        if (action.isRunning()) {
                            state = "opened";
                            action.paused = false;
                            action.loop = LoopOnce;
                            action.timeScale = -action.timeScale;
                            action.clampWhenFinished = true;
                        }

                        /// need isRunning above ???
                        if (action.paused) {
                            action.paused = false;
                            action.loop = LoopOnce;
                            action.timeScale = -action.timeScale;
                            action.clampWhenFinished = true;

                            action.play();
                        } else {
                            action.paused = false;
                            action.loop = LoopOnce;
                            action.clampWhenFinished = true;

                            action.play();
                        }
                    }
                });

                this.dispatchEvent({
                    type: "modelAnimated",
                    mixer: this.mixer,
                    running: true,
                    state: state,
                });

                this.animating = true;
            }
        }
    }

    private handleModelAnimationComplete(e: any) {
        this.animating = false;
        if (this.mixer) {
            this.dispatchEvent({
                type: "modelAnimated",
                mixer: this.mixer,
                running: false,
                state: e.direction === 1 ? "opened" : "closed",
            });
        }
    }

    private setupModelAnimations(model: Object3D) {
        this.animating = false;
        this.mixer = new AnimationMixer(model);
        this.mixer.addEventListener("loop", (e) => this.handleModelAnimationComplete(e));
        this.mixer.addEventListener("finished", (e) => this.handleModelAnimationComplete(e));
    }

    private disposeModelAnimations() {
        this.animating = false;
        if (this.mixer) {
            this.mixer.removeEventListener("loop", (e) => this.handleModelAnimationComplete(e));
            this.mixer.removeEventListener("finished", (e) => this.handleModelAnimationComplete(e));
        }

        this.mixer = null;
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

    async init() {
        this.world.renderer.setAnimationLoop(() => this.animate());
        this.world.addEventListener("resize", this.resize);

        await this.world.loadEnvironment();
    }

    private resize(e: IWorldEvent["resize"]) {
        this.selection?.resize();
    }

    private animate = () => {
        const { renderer, scene, camera, orbitControls, size, gizmo } = this.world;

        renderer.setViewport(0, 0, size.width, size.height);
        renderer.render(scene, camera);

        if (this.mixer && this.animating && this.model?.edges) {
            this.mixer.update(this.clock.getDelta());
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
