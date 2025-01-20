import { EventDispatcher, Group, Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IObjectMaterial, IOutliner } from "../interface";
import { Edges } from "./Edges";
import { ObjectUserData } from "./ObjectUserData";

export interface SFDCurrentFile {
    url: string;
    obj: Object3D;
}

export interface IModelEvent {
    model: {
        type: string;
        model: Object3D | null;
        outliner: IOutliner | null;
        edges: Group | null;
        materials: Map<string, IObjectMaterial>;
    };
}

type Cache = {
    model: Object3D;
    outliner: IOutliner;
    edges: Group;
    materials: Map<string, IObjectMaterial>;
};

export class Model extends EventDispatcher<IModelEvent> {
    private readonly loader: GLTFLoader;
    private _model: Object3D | null = null;
    private _edges: Group | null = null;

    private readonly cache: Map<number, Cache> = new Map();

    outliner: IOutliner | null = null;
    materials: Map<string, IObjectMaterial> = new Map();

    constructor() {
        super();
        this.loader = new GLTFLoader();
    }

    get edges(): Group | null {
        return this._edges;
    }

    set edges(value: Group | null) {
        if (this._edges && this._edges.parent) {
            this._edges.parent.remove(this._edges);
        }

        this._edges = value;
    }

    get model() {
        return this._model;
    }

    set model(model: Object3D | null) {
        if (this._model) {
            this._model.parent?.remove(this._model);
        }

        this._model = model;

        this.dispatchEvent({
            type: "model",
            model: model,
            outliner: this.outliner,
            edges: this.edges,
            materials: this.materials,
        });
    }

    private getCache(outlinerId: number) {
        return this.cache.get(outlinerId);
    }

    private setCache(
        outlinerId: number,
        obj: Object3D,
        outliner: IOutliner,
        edges: Group,
        materials: Map<string, IObjectMaterial>,
    ) {
        const cached = this.cache.get(outlinerId);
        if (!cached) {
            this.cache.set(outlinerId, {
                model: obj,
                outliner: outliner,
                edges: edges,
                materials: materials,
            });
        }
    }

    load = (obj: IOutliner): Promise<Object3D> => {
        return new Promise((resolve) => {
            const cached = this.getCache(obj.id);
            if (cached) {
                this.outliner = cached.outliner;
                this.model = cached.model;
                this.edges = cached.edges;
                this.materials = cached.materials;

                resolve(cached.model);

                return;
            }

            this.materials.clear();

            const modelChildrenOutliner: Array<IOutliner> = [];

            if (obj.modelUrl) {
                this.loader.load(obj.modelUrl, (gltf) => {
                    const model = gltf.scene;
                    model.castShadow = true;
                    model.receiveShadow = true;

                    const objectEdges = new Edges();
                    let modelOutliner: IOutliner;
                    const modelMaterials: Map<string, IObjectMaterial> = new Map();

                    model.traverse((object: Object3D) => {
                        if (object instanceof Mesh) {
                            // object.computeBoundingBox();
                            object.geometry.computeBoundingSphere();
                            object.castShadow = true;
                            object.receiveShadow = true;

                            if (object.material) {
                                if (object.material.name?.indexOf("wood") !== -1) {
                                    const mat = modelMaterials.get(object.material.name);
                                    if (!mat) {
                                        modelMaterials.set(object.material.name, {
                                            objects: [object.id],
                                            material: object.material,
                                        });
                                    } else {
                                        mat.objects.push(object.id);
                                    }
                                }
                            }

                            const outlinerUD: IOutliner = {
                                id: object.id,
                                level: 3,
                                name: object.name,
                            };

                            object.userData = new ObjectUserData(outlinerUD);
                            modelChildrenOutliner.push(outlinerUD);

                            objectEdges.add(object);
                        } else {
                            object.layers.disableAll();
                        }
                    });

                    modelOutliner = {
                        level: obj.level,
                        categories: obj.categories,
                        models: obj.models,
                        imageResouce: obj.imageResouce,
                        name: obj.name,
                        id: obj.id,
                        modelUrl: obj.modelUrl,
                        children: modelChildrenOutliner,
                    };

                    model.userData = new ObjectUserData(modelOutliner);

                    if (model.up.y === 1) {
                        model.up.set(0, 0, 1);
                        model.rotateX(Math.PI / 2);

                        objectEdges.edgeGroup.up.set(0, 0, 1);
                        objectEdges.edgeGroup.rotateX(Math.PI / 2);
                    }

                    this.outliner = modelOutliner;
                    this.materials = modelMaterials;

                    this.edges = objectEdges.edgeGroup;

                    //needs to be last (I think);
                    this.model = model;

                    this.setCache(
                        obj.id,
                        model,
                        modelOutliner,
                        objectEdges.edgeGroup,
                        modelMaterials,
                    );

                    resolve(model);
                });
            }
        });
    };

    dispose() {}
}
