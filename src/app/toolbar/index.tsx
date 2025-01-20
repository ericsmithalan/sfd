import { FC, useEffect, useState } from "react";
import { Mesh } from "three";
import { Button, Panel, TexturePicker } from "../../components";
import { defaultTexture, woodTextures } from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import { createSingleWoodMaterials, getObjectsById } from "../../utils";
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
            console.log(model.materials);

            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [model]);

    const handleTextureClick = async (texture: ITexture, material: IObjectMaterial) => {
        if (model && model.materials) {
            const materials = await createSingleWoodMaterials(texture);
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
        console.log(texture);
    };

    return visible ? (
        <Panel className="app-toolbar-panel" contentCss="app-toolbar">
            <Button
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
                    return (
                        <TexturePicker
                            key={i}
                            material={value}
                            onItemClick={(texture, material, e) =>
                                handleTextureClick(texture, material)
                            }
                            texture={defaultTexture}
                            items={woodTextures}
                        />
                    );
                })}
        </Panel>
    ) : null;
};
