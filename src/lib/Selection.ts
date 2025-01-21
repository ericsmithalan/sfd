import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import { SelectMode } from "../types";
import { BorderEffect, ITransformEvent, ObjectUserData, Transform } from "./";

export interface ISelectionEvent {
    change: {
        type: string;
        object: Object3D | null;
    };
    mode: { type: string; mode: SelectMode };
}

export class Selection extends EventDispatcher<ISelectionEvent> {
    private readonly mouse = new Vector2();
    private readonly container: HTMLElement;
    private readonly camera: Camera;
    private readonly raycaster: Raycaster;
    private readonly scene: Scene;
    private readonly transform: Transform;
    private readonly orbitControls: OrbitControls;
    readonly borderEffect: BorderEffect;

    private _object: Object3D | null = null;
    private _mode: SelectMode = "select";

    enabled: boolean = true;

    constructor(
        container: HTMLElement,
        scene: Scene,
        camera: Camera,
        renderer: WebGLRenderer,
        orbitControls: OrbitControls,
    ) {
        super();

        this.camera = camera;
        this.raycaster = new Raycaster();
        this.container = container;
        this.scene = scene;
        this.orbitControls = orbitControls;

        this.transform = new Transform(camera, scene, container);

        this.raycaster.setFromCamera(this.mouse, this.camera);

        this.registerEvents();
        this.borderEffect = new BorderEffect(scene, renderer, camera);
    }

    get mode() {
        return this._mode;
    }

    set mode(value: SelectMode) {
        if (value !== this._mode) {
            this._mode = value;

            if (value === "edit") {
                this.borderEffect.enabled = false;
            } else {
                this.borderEffect.enabled = true;
            }

            this.dispatchEvent({ type: "mode", mode: value });
        }
    }

    get object() {
        return this._object;
    }

    set object(value: Object3D | null) {
        if (value !== this.object) {
            this._object = value;

            if (value !== null) {
                this.borderEffect.objects = [value];
            } else {
                this.borderEffect.objects = [];
            }

            this.dispatchEvent({
                type: "change",
                object: value,
            });
        }
    }

    dblclick(e: MouseEvent) {
        console.log("doubleclick");
        if (this.enabled) {
            this.setMouse(e);

            const objects = this.intersects(this.mouse.x, this.mouse.y);
            let obj = null;

            if (objects && objects[0]) {
                obj = objects[0].object;
            }

            if (obj) {
                this.mode = "edit";
                this.transform.show(obj);
            } else {
                this.mode = "select";
                this.transform.hide();
            }
        }
    }

    resize() {
        this.borderEffect.resize();
    }

    clear() {
        if (this.object) {
            this.object = null;
        }
    }
    animate = () => {
        // if UI hides object
        if (this.object && !this.object.visible) {
            this.object = null;
        }

        this.borderEffect.animate();
        this.raycaster.setFromCamera(this.mouse, this.camera);
    };

    private setMouse = (e: MouseEvent) => {
        const rect = this.container.getBoundingClientRect();
        const x = (e.clientX / rect.width) * 2 - 1;
        const y = -(e.clientY / rect.height) * 2 + 1;

        this.mouse.x = x;
        this.mouse.y = y;
    };

    private mouseDwn(e: MouseEvent) {
        this.setMouse(e);
        if (this.enabled) {
            // if in edit mode just remove tranforms
            if (this.mode === "edit") {
                this.mode = "select";
            }

            const objects = this.intersects(this.mouse.x, this.mouse.y);
            if (objects) {
                this.object = objects[0]?.object || null;
            } else {
                this.object = null;
            }
        }
    }

    private mouseUp(e: MouseEvent) {
        this.setMouse(e);
    }

    private intersects = (x: number, y: number) => {
        this.mouse.set(x, y);

        const sceneChildren: Array<Object3D> = [];

        this.scene.traverseVisible((child) => {
            if (child.userData instanceof ObjectUserData) {
                if (child.userData?.viewportInfo?.selectable === true) {
                    sceneChildren.push(child);
                }
            }
        });

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const objects = this.raycaster.intersectObjects(sceneChildren as Object3D[], true);

        return objects;
    };

    private transformMouseUp(e: ITransformEvent["mouseUp"]) {
        this.enabled = true;
        this.orbitControls.enabled = true;

        /// expample of texture  update
    }

    private transformMouseDown(e: ITransformEvent["mouseDown"]) {
        this.enabled = false;
        this.orbitControls.enabled = false;
    }

    private registerEvents() {
        this.transform.addEventListener("mouseDown", (e) => this.transformMouseDown(e));
        this.transform.addEventListener("mouseUp", (e) => this.transformMouseUp(e));
        this.container.addEventListener("dblclick", (e: MouseEvent) => this.dblclick(e));
        this.container.addEventListener("mousedown", (e: MouseEvent) => this.mouseDwn(e));
        this.container.addEventListener("mouseup", (e: MouseEvent) => this.mouseUp(e));
    }

    private unRegisterEvents() {
        this.transform.removeEventListener("mouseDown", (e) => this.transformMouseDown(e));
        this.transform.removeEventListener("mouseUp", (e) => this.transformMouseUp(e));
        this.container.removeEventListener("dblclick", (e: MouseEvent) => this.dblclick(e));
        this.container.removeEventListener("mousedown", (e: MouseEvent) => this.mouseDwn(e));
        this.container.removeEventListener("mouseup", (e: MouseEvent) => this.mouseUp(e));
    }

    dispose() {
        this.unRegisterEvents();
        this.borderEffect.dispose();
    }
}
