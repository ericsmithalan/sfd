import { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { IHomeSceneModel } from "../interface";
import { Edges, ObjectUserData } from "../lib";

const loader: GLTFLoader = new GLTFLoader();

export interface ISimpleModel {
    edges: Edges;
    object: Object3D;
}

export const loadHomeModel = (obj: IHomeSceneModel): Promise<ISimpleModel> => {
    return new Promise((resolve) => {
        loader.load(obj.url, (gltf) => {
            const model = gltf.scene;
            const edges = new Edges();

            model.castShadow = true;
            model.receiveShadow = true;

            model.traverse((object: Object3D) => {
                if (object instanceof Mesh) {
                    object.castShadow = true;
                    object.receiveShadow = true;

                    object.userData = new ObjectUserData(
                        null,
                        { selectable: true },
                        null,
                        null,
                        obj,
                    );

                    edges.add(object);
                } else {
                    object.layers.disableAll();
                }
            });

            model.userData = new ObjectUserData(null, { selectable: true }, null, null, obj);

            resolve({
                object: model,
                edges: edges,
            });
        });
    });
};
