import { Camera, EventDispatcher, Object3D, Raycaster, Scene, Vector2, WebGLRenderer } from "three";

import { SelectMode } from "../types";
import { ObjectUserData, OutlineEffect } from "./";

export interface ISelectionEvent {
    change: {
        type: string;
        object: Object3D | null;
    };
    mouseover: {
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

    private _selectedObject: Object3D | null = null;
    private _hoverObject: Object3D | null = null;
    private _mode: SelectMode = "select";

    enabled: boolean = true;

    constructor(container: HTMLElement, scene: Scene, camera: Camera, renderer: WebGLRenderer) {
        super();

        this.camera = camera;
        this.raycaster = new Raycaster();
        this.container = container;
        this.scene = scene;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        this.registerEvents();
        this.borderEffect = new OutlineEffect(scene, renderer, camera);
    }

    get hoverObject() {
        return this._hoverObject;
    }

    set hoverObject(value: Object3D | null) {
        if (value !== this.hoverObject && value !== this.selectedObject) {
            this._hoverObject = value;

            if (value !== null) {
                this.borderEffect.hoverObjects = [value];
            } else {
                this.borderEffect.hoverObjects = [];
            }

            this.dispatchEvent({
                type: "mouseover",
                object: value,
            });
        }
    }

    get selectedObject() {
        return this._selectedObject;
    }

    set selectedObject(value: Object3D | null) {
        if (value !== this.selectedObject) {
            this._selectedObject = value;

            if (value !== null) {
                this.borderEffect.selectedObjects = [value];
            } else {
                this.borderEffect.selectedObjects = [];
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
        if (this.selectedObject) {
            this.selectedObject = null;
        }
    }
    animate = () => {
        // if UI hides object
        if (this.selectedObject && !this.selectedObject.visible) {
            this.selectedObject = null;
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

    private mouseMove = (e: MouseEvent) => {
        this.setMouse(e);

        const objects = this.intersects(this.mouse.x, this.mouse.y);

        if (objects) {
            const obj = objects[0]?.object || null;
            this.hoverObject = obj;
        } else {
            this.hoverObject = null;
        }
    };
    private mouseDown = (e: MouseEvent) => {
        this.setMouse(e);
        const self = this;

        const objects = self.intersects(self.mouse.x, self.mouse.y);

        if (objects) {
            self.selectedObject = objects[0]?.object || null;
        } else {
            self.selectedObject = null;
        }
    };

    private mouseEvent(e: MouseEvent) {
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
        this.container.addEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e));
        this.container.addEventListener("mousedown", (e: MouseEvent) => this.mouseDown(e));
        this.container.addEventListener("mouseup", (e: MouseEvent) => this.mouseEvent(e));
    }

    dispose() {
        this.container.removeEventListener("mousemove", (e: MouseEvent) => this.mouseMove(e));
        this.container.removeEventListener("mousedown", (e: MouseEvent) => this.mouseDown(e));
        this.container.removeEventListener("mouseup", (e: MouseEvent) => this.mouseEvent(e));

        // this.borderEffect.dispose();
    }
}
