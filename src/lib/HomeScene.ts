import { Box3, Object3D, Vector3 } from "three";
import { fitCameraToObject } from "../utils";
import { loadSimpleModel } from "../utils/loadModel";
import { AppCache } from "./AppCache";
import { Edges } from "./Edges";
import { World } from "./World";

type HomeModel = {
    edges: Edges;
    object: Object3D;
};

export interface LowresModel {
    category: string;
    name: string;
    url: string;
}

export class HomeScene {
    private readonly world: World;
    private readonly cache: AppCache<number, HomeModel>;
    private urls: Array<string> = ["/models/lowres/desk-4.glb", "/models/lowres/desk.glb"];
    private visible = false;
    private initalized = false;
    constructor(world: World) {
        this.world = world;
        this.cache = new AppCache();
    }

    async show() {
        if (!this.initalized && !this.visible) {
            const objs = await this.loadModels(this.urls);
            this.world.grid.visible = false;
            this.visible = true;
            this.initalized = true;
        }
    }

    async loadModels(array: Array<string>): Promise<void> {
        let prevVector = new Vector3();
        const models: Array<Object3D> = [];

        if (!this.cache.isEmpty()) {
            this.cache.forEach((key, item) => {
                this.world.scene.add(item.object);
                this.world.scene.add(item.edges.edgeGroup);
                models.push(item.object);
            });
        } else {
            for (const url of array) {
                const model = await loadSimpleModel(url);

                const box3 = new Box3();
                box3.setFromObject(model.object);

                model.object.position.z = prevVector.z;
                model.edges.edgeGroup.position.z = prevVector.z;

                prevVector = box3.getSize(new Vector3());

                this.world.scene.add(model.object);
                this.world.scene.add(model.edges.edgeGroup);

                this.cache.set(model.object.id, {
                    object: model.object,
                    edges: model.edges,
                });

                models.push(model.object);
            }
        }

        fitCameraToObject(this.world.camera, this.world.orbitControls, models, 2);
    }

    hide() {
        if (this.visible) {
            this.cache.forEach((key, item) => {
                this.world.scene.remove(item.object);
                this.world.scene.remove(item.edges.edgeGroup);
            });

            this.world.grid.visible = true;
            this.initalized = false;
            this.visible = false;
        }
    }

    dispose() {}
}
