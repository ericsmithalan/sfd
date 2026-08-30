import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from "three";

import { SelectMode } from "../types";
import { ObjectUserData, OutlineEffect } from "./";

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
    readonly borderEffect: OutlineEffect;

    private _object: Object3D | null = null;
    private _mode: SelectMode = "select";
    private timer: any = null;

    dragging = false;
    enabled: boolean = true;

    constructor(container: HTMLElement, scene: Scene, camera: Camera, renderer: WebGLRenderer) {
        super();

        this.camera = camera;
        this.raycaster = new Raycaster();
        this.raycaster.layers.enable(0);
        this.container = container;
        this.scene = scene;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        this.registerEvents();
        this.borderEffect = new OutlineEffect(scene, renderer, camera);
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
        const self = this;
        if (self.enabled) {
            const objects = self.intersects(self.mouse.x, self.mouse.y);

            if (objects) {
                self.object = objects[0]?.object || null;
            } else {
                self.object = null;
            }

            clearTimeout(self.timer);
            self.timer = null;
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

    private registerEvents() {
        this.container.addEventListener("mousedown", (e: MouseEvent) => this.mouseDwn(e));
        this.container.addEventListener("mouseup", (e: MouseEvent) => this.mouseUp(e));
    }

    dispose() {
        this.container.removeEventListener("mousedown", (e: MouseEvent) => this.mouseDwn(e));
        this.container.removeEventListener("mouseup", (e: MouseEvent) => this.mouseUp(e));

        this.borderEffect.dispose();
    }
}
