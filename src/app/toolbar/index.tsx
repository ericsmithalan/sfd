import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import { Mesh } from "three";
import { Button, Panel, TexturePicker } from "../../components";
import { DATA } from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { ObjectUserData, Viewport } from "../../lib";
import { TextureResolution, TextureType } from "../../types";
import { createTextureMaterials, disposeMaterial, getObjectsById } from "../../utils";
import "./style.scss";

type ToolbarProps = {
    children?: React.ReactNode;
    viewport: Viewport;
    onLoading?: (loading: boolean) => void;
};

type SelectedTextureState = Map<string, IObjectMaterial>;

export const Toolbar: FC<ToolbarProps> = ({ viewport, children, onLoading }) => {
    const [visible, setVisible] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resolution] = useState<TextureResolution>("2k");
    const [selected, setSelected] = useState<SelectedTextureState>(new Map());
    const { model, isMobile } = useModel();

    useEffect(() => {
        setShowEdges(viewport.edges);
    }, [viewport]);

    const loadMaterials = useCallback(
        async (materialObj: IObjectMaterial) => {
            if (materialObj.material) {
                disposeMaterial(materialObj.material);
            }

            const materials = await createTextureMaterials(
                materialObj.texture,
                viewport.world.scene.environment,
                resolution,
            );

            materialObj.material = materials;

            getObjectsById(viewport, materialObj.objects, (obj) => {
                if (obj instanceof Mesh) {
                    disposeMaterial(obj.material);

                    if (obj.userData instanceof ObjectUserData) {
                        obj.userData.textureInfo = {
                            textureId: Number(materialObj.texture.id),
                            unwrapped: false,
                        };
                    }
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                    obj.material = materials;
                }
            });

            disposeMaterial(materials);
        },
        [resolution, viewport],
    );

    useEffect(() => {
        if (model?.materials) {
            Array.from(model.materials.entries()).map(([key, value], i) => loadMaterials(value));

            setSelected(model.materials);
        } else {
            setSelected(new Map());
        }

        if (model) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [model, loadMaterials]);

    const getTextures = (type: TextureType): Array<ITexture> => {
        switch (type) {
            case "fabric":
                return DATA.fabricTextures;
            case "wood":
                return DATA.woodTextures;
            case "hardware":
                return DATA.metalTextures;
            case "metal":
                return DATA.metalTextures;
        }
    };

    const handleTextureClick = async (key: string, materialObj: IObjectMaterial) => {
        if (onLoading) {
            onLoading(true);
        }

        // console.log(key, materialObj);

        const sel = selected.get(key);

        if (sel) {
            disposeMaterial(sel.material);
        }

        selected.set(key, materialObj);

        await loadMaterials(materialObj);

        // @ts-ignore
        setSelected(new Map([...selected]));

        if (onLoading) {
            onLoading(false);
        }
    };

    return (
        <Panel
            className={clsx("app-toolbar-panel", !visible && "hidden", isMobile && "mobile")}
            contentCss="app-toolbar"
        >
            {model?.materials &&
                Array.from(model.materials.entries()).map(([key, value], i) => (
                    <TexturePicker
                        isMobile={isMobile}
                        className={clsx(isMobile && "mobile")}
                        key={i}
                        label={key}
                        material={value}
                        onItemClick={(material, e) => {
                            handleTextureClick(key, material);
                        }}
                        textures={getTextures(value.type)}
                    />
                ))}

            <Button
                title="Toggle Edges"
                variant="toolbar"
                icon="artboard-2"
                text={showEdges ? "Edges" : "Edges"}
                active={showEdges}
                onClick={(e) => {
                    viewport.edges = !showEdges;
                    setShowEdges(!showEdges);
                }}
            />

            {children}
        </Panel>
    );
};
