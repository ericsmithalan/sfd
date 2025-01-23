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
    onLoading?: (loading: boolean) => void;
};

type SelectedTextureState = Map<string, IObjectMaterial>;

export const Toolbar: FC<ToolbarProps> = ({ viewport, onLoading }) => {
    const [visible, setVisible] = useState(false);
    const [edges, setEdges] = useState(false);
    const [resolution, setResolution] = useState<TextureResolution>("2k");
    const [selected, setSelected] = useState<SelectedTextureState>(new Map());
    const { model } = useModel();

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
                    const objs = getObjectsById(viewport, matObj.objects, (obj) => {
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
                    });

                    materials.dispose();
                    // if (onLoading) {
                    //     onLoading(false);
                    // }
                });
        };

        if (selected.size > 0) {
            // if (onLoading) {
            //     onLoading(true);
            // }

            loadMaterials(selected);
        }
    }, [selected, resolution, viewport]);

    const getTexture = (
        type: TextureType,
        index: number,
    ): { selected: ITexture | null; textures: Array<ITexture> } => {
        switch (type) {
            case "fabric":
                if (index > DATA.fabricTextures.length) {
                    index = DATA.fabricTextures.length;
                }
                return {
                    selected: DATA.fabricTextures[index],
                    textures: DATA.fabricTextures,
                };
            case "wood":
                if (index > DATA.woodTextures.length) {
                    index = DATA.woodTextures.length;
                }
                return {
                    selected: DATA.woodTextures[index],
                    textures: DATA.woodTextures,
                };
            case "hardware":
                if (index > DATA.metalTextures.length) {
                    index = DATA.metalTextures.length;
                }
                return {
                    selected: DATA.metalTextures[index],
                    textures: DATA.metalTextures,
                };
            case "metal":
                if (index > DATA.metalTextures.length) {
                    index = DATA.metalTextures.length;
                }
                return {
                    selected: DATA.metalTextures[index],
                    textures: DATA.metalTextures,
                };
        }
    };

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
        <Panel className={clsx("app-toolbar-panel", !visible && "hidden")} contentCss="app-toolbar">
            {model?.materials
                .entries()
                .toArray()
                .map(([key, value], i) => {
                    const textr = getTexture(value.type, i);

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

            {/* <Button
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
            /> */}
        </Panel>
    );
};
