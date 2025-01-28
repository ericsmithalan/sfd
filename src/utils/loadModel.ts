import { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { IObjectMaterial, IOutliner } from "../interface";
import { IModel } from "../interface/IModel";
import { Edges, ObjectUserData, Viewport } from "../lib";
import { getObjectDimensions } from "./getObjectDimensions";
import { getTextureFromBlenderMaterial } from "./getTextureFromBlenderMaterial";

const loader: GLTFLoader = new GLTFLoader();

export const loadModel = (
    outliner: IOutliner,
    viewport: Viewport,
    isMobile: boolean = false,
): Promise<IModel> => {
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
                        object.castShadow = true;
                        object.receiveShadow = true;

                        if (object.material) {
                            const matType = getTextureFromBlenderMaterial(object.material);

                            if (matType) {
                                const mat = materials.get(matType.formattedName);

                                if (!mat) {
                                    materials.set(matType.formattedName, {
                                        type: matType.type,
                                        objects: [object.id],
                                        texture: matType.texture,
                                        material: null,
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

                        if (!isMobile) {
                            modelChildrenOutliner.push(outlinerUD);
                        }

                        edges.add(object);
                    } else {
                        object.layers.disableAll();
                    }
                });

                outliner.children = modelChildrenOutliner;

                const size = getObjectDimensions(viewport, model, true);

                outliner.stats = [
                    {
                        name: "parts",
                        value: String(modelChildrenOutliner.length),
                    },
                    {
                        name: "Width",
                        value: String(size?.x || 0),
                        unit: "in",
                    },
                    {
                        name: "Length",
                        unit: "in",
                        value: String(size?.z || 0),
                    },
                    {
                        name: "Height",
                        value: String(size?.y || 0),
                        unit: "in",
                    },
                ];

                model.userData = new ObjectUserData(outliner, { selectable: true }, null, null);
                edges.edgeGroup.updateMatrixWorld();
                model.updateMatrixWorld();
                resolve({
                    object: model,
                    outliner: outliner,
                    edges: edges,
                    materials: materials,
                    animations: gltf.animations?.length > 0 ? gltf.animations : null,
                });
            });
        }
    });
};
