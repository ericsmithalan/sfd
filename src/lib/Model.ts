import { EventDispatcher, Mesh, Object3D } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IModelOutliner, IObjectOutliner } from "../lib";
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

export class Model extends EventDispatcher<IModelEvent> {
    private readonly loader: GLTFLoader;
    private _model: Object3D | null = null;

    private loading = false;
    gtlf: GLTF | null = null;

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

    reset() {
        this.gtlf = null;
        this.model = null;
    }

    load = (obj: IModelOutliner): Promise<Object3D> => {
        return new Promise((resolve) => {
            if (!this.loading) {
                this.loading = true;
                this.dispatchEvent({ type: "load", model: this.model });
                const objects: Array<IObjectOutliner> = [];

                this.loader.load(obj.url, (gltf) => {
                    this.gtlf = null;
                    this._model = null;

                    this.gtlf = gltf;
                    const model = gltf.scene;
                    model.castShadow = true;
                    model.receiveShadow = true;

                    console.log("model loaded", model);

                    model.traverse((object: Object3D) => {
                        if (object instanceof Mesh) {
                            object.castShadow = true;
                            object.receiveShadow = true;

                            const outlinerUD: IObjectOutliner = {
                                id: object.id,
                                name: object.name,
                                icon: "box",
                                level: 1,
                            };

                            object.userData = new ObjectUserData<IObjectOutliner>({
                                selectable: true,
                                outliner: outlinerUD,
                            });

                            objects.push(outlinerUD);
                        } else {
                            object.layers.disableAll();
                        }
                    });

                    model.userData = new ObjectUserData<IModelOutliner>({
                        selectable: true,
                        outliner: {
                            name: obj.name,
                            id: obj.id,
                            url: obj.url,
                            children: objects,
                        },
                    });

                    this.model = model;
                    this.dispatchEvent({ type: "loaded", model: this.model });
                    this.loading = false;
                    resolve(this.model);
                });
            }
        });
    };
}
