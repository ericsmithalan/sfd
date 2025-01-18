import { EventDispatcher, Mesh, Object3D } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IOutlinerModel, IOutlinerObject } from "../interface";
import { ObjectUserData } from "./ObjectUserData";

export interface SFDCurrentFile {
    url: string;
    obj: Object3D;
}

export interface IModelEvent {
    loaded: { type: string; model: Object3D | null };
    load: { type: string; model: Object3D | null };
    changed: {
        type: string;
        model: Object3D | null;
        prevModel: Object3D | null;
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

    gtlf: GLTF | null = null;
    private modelOutliner: IOutlinerModel | null = null;

    constructor() {
        super();
        this.loader = new GLTFLoader();
    }

    get model() {
        return this._model;
    }

    set model(model: Object3D | null) {
        const prevModel = this._model;
        this._model = model;

        this.dispatchEvent({
            type: "changed",
            model: model,
            prevModel: prevModel,
        });
    }

    private getCache(outlinerId: string) {
        return this.cache.get(outlinerId);
    }

    private setCache(
        outlinerId: string,
        obj: Object3D,
        outliner: IOutlinerModel,
    ) {
        const cached = this.cache.get(outlinerId);
        if (!cached) {
            this.cache.set(outlinerId, { model: obj, outliner: outliner });
        }
    }

    load = (obj: IOutlinerModel): Promise<Object3D> => {
        return new Promise((resolve) => {
            const cached = this.getCache(obj.id);

            if (cached) {
                this.model = cached.model;

                this.modelOutliner = cached.outliner;

                resolve(cached.model);

                return;
            }

            this.dispatchEvent({ type: "load", model: this.model });

            const objects: Array<IOutlinerObject> = [];

            this.loader.load(obj.url, (gltf) => {
                this.gtlf = null;
                this.gtlf = gltf;
                const model = gltf.scene;
                model.castShadow = true;
                model.receiveShadow = true;

                model.traverse((object: Object3D) => {
                    if (object instanceof Mesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;

                        const outlinerUD: IOutlinerObject = {
                            id: object.id,
                            name: object.name,
                        };

                        object.userData = new ObjectUserData<IOutlinerObject>({
                            selectable: true,
                            outliner: outlinerUD,
                        });

                        objects.push(outlinerUD);
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

                model.userData = new ObjectUserData<IOutlinerModel>({
                    selectable: true,
                    outliner: this.modelOutliner,
                });

                if (model.up.y === 1) {
                    model.up.set(0, 0, 1);
                    model.rotateX(Math.PI / 2);
                }

                this.model = model;
                this.setCache(obj.id, model, this.modelOutliner);
                this.dispatchEvent({ type: "loaded", model: this.model });

                resolve(this.model);
            });
        });
    };
}
