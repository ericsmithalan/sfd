import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Mesh } from "three";
import { Button, Panel, TexturePicker } from "../../components";
import { DATA } from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import { TextureResolution, TextureType } from "../../types";
import { createTextureMaterials, getObjectsById } from "../../utils";
import "./style.scss";

type ToolbarProps = {
    viewport: Viewport;
};

type SelectedTextureState = Map<string, IObjectMaterial>;

export const Toolbar: FC<ToolbarProps> = ({ viewport }) => {
    const [visible, setVisible] = useState(false);
    const [edges, setEdges] = useState(false);
    const [resolution, setResolution] = useState<TextureResolution>("1k");
    const [selected, setSelected] = useState<SelectedTextureState>(new Map());
    const { model, setLoading } = useModel();

    useEffect(() => {
        setEdges(viewport.edges);
    }, [viewport]);

    useEffect(() => {
        if (model?.materials) {
            const map: SelectedTextureState = new Map();
            model?.materials
                .entries()
                .toArray()
                .map(([key, value], i) => {
                    map.set(key, value);
                });

            setSelected(map);
        } else {
            setSelected(new Map());
        }

        if (model) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [model]);

    const getTexture = (
        type: TextureType,
    ): { selected: ITexture | null; textures: Array<ITexture> } => {
        switch (type) {
            case "fabric":
                return {
                    selected: DATA.defaultFabricTexture,
                    textures: DATA.fabricTextures,
                };
            case "wood":
                return {
                    selected: DATA.defaultWoodTexture,
                    textures: DATA.woodTextures,
                };
            case "hardware":
                return {
                    selected: DATA.defaultMetalTexture,
                    textures: DATA.metalTextures,
                };
            case "metal":
                return {
                    selected: DATA.defaultMetalTexture,
                    textures: DATA.metalTextures,
                };
        }
    };

    useEffect(() => {
        //TODO: only load the one that changed
        const loadMaterials = async (sel: SelectedTextureState) => {
            selected
                .entries()
                .toArray()
                .map(async ([key, matObj], i) => {
                    if (matObj.material) {
                        matObj.material.dispose();
                    }

                    const materials = await createTextureMaterials(
                        matObj.texture,
                        viewport.environment,
                        resolution,
                    );

                    matObj.material = materials;
                    const objs = getObjectsById(viewport, matObj.objects);

                    for (const obj of objs) {
                        if (obj instanceof Mesh) {
                            obj.material.dispose();

                            if (obj.userData instanceof ObjectUserData) {
                                obj.userData.textureInfo = {
                                    textureId: Number(matObj.texture.id),
                                    unwrapped: false,
                                };
                            }

                            obj.castShadow = true;
                            obj.receiveShadow = true;
                            obj.material = materials;
                        }
                    }

                    materials.dispose();
                    setLoading(false);
                });
        };

        if (selected.size > 0) {
            setLoading(true);
            loadMaterials(selected);
        }
    }, [selected, resolution]);

    const handleTextureClick = async (key: string, materialObj: IObjectMaterial) => {
        const map: SelectedTextureState = new Map();
        map.set(key, materialObj);

        const sel = selected.get(key);

        if (sel) {
            sel.material?.dispose();
            selected.delete(key);
        }

        // @ts-ignore
        setSelected(new Map([...selected, ...map]));
    };

    return (
        <>
            <Panel
                className={clsx("app-toolbar-panel", !visible && "hidden")}
                contentCss="app-toolbar"
            >
                {model?.materials
                    .entries()
                    .toArray()
                    .map(([key, value], i) => {
                        const textr = getTexture(value.type);

                        return (
                            <TexturePicker
                                key={i}
                                label={key}
                                material={value}
                                onItemClick={(material, e) => {
                                    handleTextureClick(key, material);
                                }}
                                textures={textr.textures}
                            />
                        );
                    })}

                <Button
                    title="Toggle Edges"
                    variant="toolbar"
                    icon="shape-2"
                    active={edges}
                    onClick={(e) => {
                        viewport.edges = !edges;
                        setEdges(!edges);
                    }}
                />

                <Button
                    title="Toggle Edges"
                    variant="toolbar"
                    icon="4k"
                    active={resolution !== "1k"}
                    onClick={(e) => {
                        if (resolution === "2k") {
                            setResolution("1k");
                        } else {
                            setResolution("2k");
                        }
                    }}
                />
            </Panel>
        </>
    );
};
