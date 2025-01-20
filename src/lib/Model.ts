import { EventDispatcher, Group, Mesh, Object3D } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IObjectMaterial, IOutlinerModel, IOutlinerObject } from "../interface";
import { Edges } from "./Edges";
import { ObjectUserData } from "./ObjectUserData";

export interface SFDCurrentFile {
    url: string;
    obj: Object3D;
}

export interface IModelEvent {
    loaded: { type: string; model: Object3D | null };
    load: { type: string; model: Object3D | null; outliner: IOutlinerModel };
    materialChanged: { type: string; materials: Map<string, IObjectMaterial> };
    changed: {
        type: string;
        model: Object3D | null;
        outliner: IOutlinerModel | null;
        edges: Group | null;
    };
}

type Cache = {
    model: Object3D;
    outliner: IOutlinerModel;
};

export class Model extends EventDispatcher<IModelEvent> {
    private readonly loader: GLTFLoader;
    private _model: Object3D | null = null;
    private cache: Map<string, Cache> = new Map();

    materials: Map<string, IObjectMaterial> = new Map();

    gtlf: GLTF | null = null;
    private modelOutliner: IOutlinerModel | null = null;

    edges: Group | null = null;

    constructor() {
        super();
        this.loader = new GLTFLoader();
    }

    get model() {
        return this._model;
    }

    set model(model: Object3D | null) {
        if (this._model && this._model.parent) {
            this._model.parent.remove(this._model);
        }

        if (model === null) {
            if (this.edges && this.edges.parent) {
                this.edges.parent.remove(this.edges);
            }
        }

        this._model = model;

        this.dispatchEvent({
            type: "changed",
            model: model,
            outliner: this.modelOutliner,
            edges: this.edges,
        });
    }

    private getCache(outlinerId: string) {
        return this.cache.get(outlinerId);
    }

    private setCache(outlinerId: string, obj: Object3D, outliner: IOutlinerModel) {
        const cached = this.cache.get(outlinerId);
        if (!cached) {
            this.cache.set(outlinerId, { model: obj, outliner: outliner });
        }
    }

    load = (obj: IOutlinerModel): Promise<Object3D> => {
        return new Promise((resolve) => {
            const cached = this.getCache(obj.id);
            this.materials.clear();

            if (cached) {
                this.modelOutliner = cached.outliner;
                this.model = cached.model;

                resolve(cached.model);

                return;
            }

            this.dispatchEvent({
                type: "load",
                model: this.model,
                outliner: obj,
            });

            const objects: Array<IOutlinerObject> = [];

            this.loader.load(obj.url, (gltf) => {
                this.gtlf = null;
                this.gtlf = gltf;
                const model = gltf.scene;
                model.castShadow = true;
                model.receiveShadow = true;
                const edges = new Edges();

                model.traverse((object: Object3D) => {
                    if (object instanceof Mesh) {
                        // object.computeBoundingBox();
                        object.geometry.computeBoundingSphere();
                        object.castShadow = true;
                        object.receiveShadow = true;

                        if (object.material) {
                            if (object.material.name?.indexOf("wood") !== -1) {
                                const mat = this.materials.get(object.material.name);
                                if (!mat) {
                                    this.materials.set(object.material.name, {
                                        objects: [object.id],
                                        material: object.material,
                                    });
                                } else {
                                    mat.objects.push(object.id);
                                }
                            }
                        }

                        const outlinerUD: IOutlinerObject = {
                            id: object.id,
                            name: object.name,
                        };

                        object.userData = new ObjectUserData<IOutlinerObject>(true, outlinerUD);

                        objects.push(outlinerUD);

                        edges.add(object);
                    } else {
                        object.layers.disableAll();
                    }
                });

                this.modelOutliner = {
                    name: obj.name,
                    id: obj.id,
                    url: obj.url,
                    children: objects,
                };

                model.userData = new ObjectUserData<IOutlinerModel>(true, this.modelOutliner);

                if (model.up.y === 1) {
                    model.up.set(0, 0, 1);
                    model.rotateX(Math.PI / 2);

                    edges.edgeGroup.up.set(0, 0, 1);
                    edges.edgeGroup.rotateX(Math.PI / 2);
                }

                this.setCache(obj.id, model, this.modelOutliner);

                if (this.edges && this.edges.parent) {
                    this.edges.parent.remove(this.edges);
                }

                this.edges = edges.edgeGroup;

                this.model = model;
                this.dispatchEvent({ type: "materialChanged", materials: this.materials });
                this.dispatchEvent({ type: "loaded", model: this.model });
                console.log(this.materials);
                resolve(this.model);
            });
        });
    };

    dispose() {}
}
