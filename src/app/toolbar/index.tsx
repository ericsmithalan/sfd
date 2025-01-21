import { FC, useEffect, useState } from "react";
import { Mesh } from "three";
import { Button, Panel, TexturePicker } from "../../components";
import {
    defaultFabricTexture,
    defaultMetalexture,
    defaultWoodTexture,
    fabricTextures,
    metalTextures,
    woodTextures,
} from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import { TextureType } from "../../types";
import { createTextureMaterials, getObjectsById } from "../../utils";
import "./style.scss";

type ToolbarProps = {
    viewport: Viewport;
};

export const Toolbar: FC<ToolbarProps> = ({ viewport }) => {
    const [visible, setVisible] = useState(false);
    const [edges, setEdges] = useState(false);
    const { model } = useModel();

    useEffect(() => {
        setEdges(viewport.edges);
    }, [viewport]);

    useEffect(() => {
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
                    selected: defaultFabricTexture,
                    textures: fabricTextures,
                };
            case "wood":
                return {
                    selected: defaultWoodTexture,
                    textures: woodTextures,
                };
            case "hardware":
                return {
                    selected: defaultMetalexture,
                    textures: metalTextures,
                };
            case "metal":
                return {
                    selected: defaultMetalexture,
                    textures: metalTextures,
                };
        }
    };

    const handleTextureClick = async (texture: ITexture, material: IObjectMaterial) => {
        if (model && model.materials) {
            const materials = await createTextureMaterials(texture);
            const objs = getObjectsById(viewport, material.objects);

            for (const obj of objs) {
                if (obj instanceof Mesh) {
                    if (obj.userData instanceof ObjectUserData) {
                        obj.userData.textureInfo = { textureId: texture.id, unwrapped: false };
                    }

                    obj.castShadow = true;
                    obj.receiveShadow = true;
                    obj.material = materials;
                }
            }
        }
    };

    return visible ? (
        <Panel className="app-toolbar-panel" contentCss="app-toolbar">
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
                            onItemClick={(texture, material, e) =>
                                handleTextureClick(texture, material)
                            }
                            texture={textr.selected}
                            items={textr.textures}
                        />
                    );
                })}
        </Panel>
    ) : null;
};
