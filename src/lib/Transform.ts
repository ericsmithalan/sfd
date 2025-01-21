import { Camera, EventDispatcher, Object3D, Scene } from "three";
import { TransformControls } from "three/examples/jsm/Addons.js";
import { TransformMode } from "../types";
import { ObjectUserData } from "./ObjectUserData";

export interface ITransformEvent {
    enabled: { type: string; enabled: boolean };
    modeChange: { type: string; mode: TransformMode };
    mouseDown: { type: string; event: MouseEvent; mode: TransformMode };
    mouseUp: { type: string; event: MouseEvent; mode: TransformMode };
}

export class Transform extends EventDispatcher<ITransformEvent> {
    private readonly controls: TransformControls;
    private readonly scene: Scene;
    private readonly camera: Camera;

    private enabled: boolean = false;
    private _mode: TransformMode = "translate";

    readonly helper: Object3D;
    readonly type = "Transfrom";

    constructor(camera: Camera, scene: Scene, domElement?: HTMLElement) {
        super();

        this.scene = scene;
        this.camera = camera;

        this.controls = new TransformControls(camera, domElement);
        this.helper = this.controls.getHelper();

        this.init();
    }

    private init() {
        this.helper.name = "Transform Helper";
        this.helper.userData = new ObjectUserData(null, { selectable: true });

        this.scene.add(this.helper);

        this.registerEvents();
    }

    hide() {
        if (this.controls.object) {
            this.controls.detach();
            this.enabled = false;
        }
    }

    show(obj: Object3D) {
        if (this.enabled) {
            this.controls.detach();
        }

        this.controls.attach(obj);
        this.enabled = true;
    }

    set mode(mode: TransformMode) {
        if (mode !== this._mode) {
            this._mode = mode;
            this.controls.setMode(this.mode);
            this.dispatchEvent({ type: "modeChange", mode: this.mode });
        }
    }

    private mouseDown = (e: any) => {
        this.dispatchEvent({ type: "mouseDown", event: e, mode: this.mode });
        this.enabled = true;
    };

    private mouseUp = (e: any) => {
        this.dispatchEvent({ type: "mouseUp", event: e, mode: this.mode });
        this.enabled = false;
    };

    private modeChanged(e: ITransformEvent["modeChange"]) {
        if (this.mode !== e.mode) {
            this.mode = e.mode;
        }
    }

    private registerEvents() {
        this.controls.addEventListener("mouseDown", (e) => this.mouseDown(e));
        this.controls.addEventListener("mouseUp", (e) => this.mouseUp(e));
        this.addEventListener("modeChange", (e: ITransformEvent["modeChange"]) =>
            this.modeChanged(e),
        );
    }

    private unregisterEvents() {
        this.controls.removeEventListener("mouseDown", (e) => this.mouseDown(e));
        this.controls.removeEventListener("mouseUp", (e) => this.mouseUp(e));
        this.removeEventListener("modeChange", (e: ITransformEvent["modeChange"]) =>
            this.modeChanged(e),
        );
    }

    dispose(): void {
        this.unregisterEvents();
    }
}
