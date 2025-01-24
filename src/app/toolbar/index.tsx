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
    children?: React.ReactNode;
    viewport: Viewport;
    onLoading?: (loading: boolean) => void;
};

type SelectedTextureState = Map<string, IObjectMaterial>;

export const Toolbar: FC<ToolbarProps> = ({ viewport, children }) => {
    const [visible, setVisible] = useState(false);
    const [edges, setEdges] = useState(false);
    const [resolution, setResolution] = useState<TextureResolution>("2k");
    const [selected, setSelected] = useState<SelectedTextureState>(new Map());
    const { model, isMobile } = useModel();

    useEffect(() => {
        setEdges(viewport.edges);
    }, [viewport]);

    useEffect(() => {
        if (model?.materials) {
            setSelected(model.materials);
        } else {
            setSelected(new Map());
        }

        if (model) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [model]);

    const loadMaterials = async (materialObj: IObjectMaterial) => {
        console.log(materialObj);

        if (materialObj.material) {
            materialObj.material.dispose();
        }

        const materials = await createTextureMaterials(
            materialObj.texture,
            viewport.environment,
            resolution,
        );

        materialObj.material = materials;
        const objs = getObjectsById(viewport, materialObj.objects, (obj) => {
            if (obj instanceof Mesh) {
                obj.material.dispose();
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
        materials.dispose();
    };

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
        const sel = selected.get(key);

        if (sel) {
            sel.material?.dispose();
        }

        await loadMaterials(materialObj);

        selected.set(key, materialObj);
        // @ts-ignore
        setSelected(new Map([...selected]));
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
                icon="shape-2"
                text={edges ? "Edges" : "Edges"}
                active={edges}
                onClick={(e) => {
                    viewport.edges = !edges;
                    setEdges(!edges);
                }}
            />

            {children}
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
