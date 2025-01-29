import { Box3, Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { homeScene } from "../data/homeScene";
import { fitCameraToObject, loadHomeModel } from "../utils";
import { Edges } from "./Edges";
import { ObjectUserData } from "./ObjectUserData";
import { ISelectionEvent, Selection } from "./Selection";

export interface IHomeModel {
    id: number;
    edges: Edges;
    object: Object3D;
}

export class HomeScene {
    private scene: Scene;
    private selection: Selection;
    private enabled: boolean = false;
    private models: Array<IHomeModel> = [];
    private initialized: boolean = false;
    constructor(scene: Scene, selection: Selection) {
        this.scene = scene;
        this.selection = selection;
    }

    selectionChange(e: ISelectionEvent["change"]) {
        console.log("selection", e);
        const obj = e.object;

        if (obj) {
            if (obj.userData instanceof ObjectUserData) {
                console.log(obj.userData);
            }
        }
    }

    async init() {
        if (!this.initialized) {
            let prevPosition = new Vector3();
            this.selection.addEventListener("change", (e) => this.selectionChange(e));

            for (const item of homeScene) {
                const obj = await loadHomeModel(item);

                const box3 = new Box3();
                box3.setFromObject(obj.object);

                obj.object.position.z = prevPosition.z * 2;
                obj.edges.edgeGroup.position.z = prevPosition.z * 2;

                prevPosition = box3.getSize(new Vector3());

                this.models.push({
                    id: obj.object.id,
                    object: obj.object,
                    edges: obj.edges,
                });
            }
        }
    }

    async show(camera: PerspectiveCamera, orbitControls: OrbitControls) {
        await this.init();

        if (!this.enabled) {
            const models: Array<Object3D> = [];
            this.models.forEach((model, i) => {
                this.scene.add(model.edges.edgeGroup, model.object);
                models.push(model.object);
            });

            fitCameraToObject(camera, orbitControls, models, 1);

            this.enabled = true;
        }
    }

    hide() {
        if (this.enabled) {
            this.enabled = false;
            this.models.forEach((item) => {
                this.scene.remove(item.edges.edgeGroup, item.object);
            });
            this.clear();
        }
    }

    clear() {
        this.selection.removeEventListener("change", (e) => this.selectionChange(e));
    }

    dispose() {}
}
