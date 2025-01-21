import { Mesh, MeshStandardMaterial, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { IObjectMaterial, IOutliner } from "../interface";
import { IModel } from "../interface/IModel";
import { Edges, ObjectUserData } from "../lib";

const loader: GLTFLoader = new GLTFLoader();

const isValidMaterial = (material: MeshStandardMaterial) => {
    const wood = material.name?.indexOf("wood") !== -1;
    const primary = material.name?.indexOf("primary") !== -1;
    const contrast = material.name?.indexOf("contrast") !== -1;

    if (wood || primary || contrast) {
        return true;
    }

    return false;
};

export const loadModel = (outliner: IOutliner): Promise<IModel> => {
    return new Promise((resolve) => {
        const modelChildrenOutliner: Array<IOutliner> = [];

        if (outliner.modelUrl) {
            loader.load(outliner.modelUrl, (gltf) => {
                const model = gltf.scene;
                const edges = new Edges();
                const materials: Map<string, IObjectMaterial> = new Map();

                model.castShadow = true;
                model.receiveShadow = true;

                model.traverse((object: Object3D) => {
                    if (object instanceof Mesh) {
                        // object.computeBoundingBox();
                        object.geometry.computeBoundingSphere();
                        object.castShadow = true;
                        object.receiveShadow = true;

                        if (object.material) {
                            if (isValidMaterial(object.material)) {
                                const mat = materials.get(object.material.name);
                                if (!mat) {
                                    materials.set(object.material.name, {
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

                        object.userData = new ObjectUserData(outlinerUD, { selectable: true });
                        modelChildrenOutliner.push(outlinerUD);

                        edges.add(object);
                    } else {
                        object.layers.disableAll();
                    }
                });

                outliner.children = modelChildrenOutliner;

                model.userData = new ObjectUserData(outliner, { selectable: true });

                if (model.up.y === 1) {
                    model.up.set(0, 0, 1);
                    model.rotateX(Math.PI / 2);

                    edges.edgeGroup.up.set(0, 0, 1);
                    edges.edgeGroup.rotateX(Math.PI / 2);
                }

                resolve({
                    object: model,
                    outliner: outliner,
                    edges: edges.edgeGroup,
                    materials: materials,
                });
            });
        }
    });
};
