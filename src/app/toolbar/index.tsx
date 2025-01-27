import clsx from "clsx";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { Button, Loading, Panel, TexturePicker } from "../../components";
import { DATA } from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { IViewportEvent, ObjectUserData, Viewport } from "../../lib";
import { TextureResolution, TextureType } from "../../types";
import { createTextureMaterials, disposeMaterial, getObjectsById } from "../../utils";
import "./style.scss";

type ToolbarProps = {
    children?: React.ReactNode;
    viewport: Viewport;
    isMobile: boolean;
};

type SelectedState = Map<string, IObjectMaterial>;

export const Toolbar: FC<ToolbarProps> = ({ viewport, children, isMobile }) => {
    const [showEdges, setShowEdges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState<boolean | null>(null);
    const [resolution] = useState<TextureResolution>("2k");
    const [selected, setSelected] = useState<SelectedState>(new Map());
    const { model } = useModel();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowEdges(viewport.edges);
    }, [viewport]);

    const loadMaterials = useCallback(
        async (materialObj: IObjectMaterial) => {
            setLoading(true);

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
            setLoading(false);
        },
        [resolution, viewport],
    );

    useEffect(() => {
        const handleModelAnimationComplete = (e: IViewportEvent["modelAnimated"]) => {
            setAnimate(e.running);
            console.log("done", e);
        };

        if (model) {
            if (model.materials) {
                setSelected(model.materials);
            }

            if (model.animations) {
                viewport.addEventListener("modelAnimated", (e) => handleModelAnimationComplete(e));
                setAnimate(false);
            } else {
                setAnimate(null);
            }
        } else {
            setAnimate(null);
            setSelected(new Map());
        }

        return () => {
            viewport.removeEventListener("modelAnimated", (e) => handleModelAnimationComplete(e));
        };
    }, [model, viewport]);

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
            disposeMaterial(sel.material);
        }

        selected.set(key, materialObj);

        await loadMaterials(materialObj);

        // @ts-ignore
        setSelected(new Map([...selected]));
    };

    return (
        <Panel
            ref={panelRef}
            className={clsx("app-toolbar-panel", !model && "hidden", isMobile && "mobile")}
            contentCss="app-toolbar"
        >
            {loading && <Loading message="loading" />}
            {model?.materials &&
                Array.from(model.materials.entries()).map(([key, value], i) => (
                    <TexturePicker
                        panelRef={panelRef}
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

            {animate !== null && (
                <Button
                    title="Animate"
                    variant="toolbar"
                    icon="play"
                    text={"Play"}
                    active={animate}
                    disabled={animate}
                    onClick={(e) => {
                        viewport.toggleAnimation();
                    }}
                />
            )}

            {children}
        </Panel>
    );
};
