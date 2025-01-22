import { Mesh, MeshStandardMaterial, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DATA } from "../data";
import { IObjectMaterial, IOutliner } from "../interface";
import { IModel } from "../interface/IModel";
import { ITexture } from "../interface/ITexture";
import { Edges, ObjectUserData, Viewport } from "../lib";
import { TextureType } from "../types";
import { getObjectDimensions } from "./getObjectDimensions";

const loader: GLTFLoader = new GLTFLoader();

const getMaterialType = (material: MeshStandardMaterial): TextureType | null => {
    const wood = material.name?.indexOf("wood") !== -1;
    const primary = material.name?.indexOf("primary") !== -1;
    const contrast = material.name?.indexOf("contrast") !== -1;
    const fabric = material.name?.indexOf("fabric") !== -1;
    const metal = material.name?.indexOf("metal") !== -1;
    const hardware = material.name?.indexOf("hardware") !== -1;

    if (wood || primary || contrast) {
        return "wood";
    }
    if (fabric) {
        return "fabric";
    }
    if (metal || hardware) {
        return "metal";
    }
    return null;
};

const getDefaultTexture = (type: TextureType): ITexture => {
    switch (type) {
        case "fabric":
            return DATA.defaultFabricTexture;
        case "hardware":
            return DATA.defaultMetalTexture;
        case "metal":
            return DATA.defaultMetalTexture;
        case "wood":
            return DATA.defaultWoodTexture;
    }
};

export const loadModel = (outliner: IOutliner, viewport: Viewport): Promise<IModel> => {
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
                            const matType = getMaterialType(object.material);

                            if (matType) {
                                const mat = materials.get(object.material.name);
                                const textr = getDefaultTexture(matType);
                                if (!mat) {
                                    materials.set(object.material.name, {
                                        type: matType,
                                        objects: [object.id],
                                        texture: textr,
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
                        modelChildrenOutliner.push(outlinerUD);

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
