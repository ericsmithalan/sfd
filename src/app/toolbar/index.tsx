import clsx from "clsx";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { Button, Loading, Panel, TexturePicker } from "../../components";
import { DATA } from "../../data";
import { useModel } from "../../hooks";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { IViewportEvent, ObjectUserData, Viewport } from "../../lib";
import { AnimationState, TextureResolution, TextureType } from "../../types";
import { createTextureMaterials, disposeMaterial, getObjectsById } from "../../utils";
import "./style.scss";

type ToolbarProps = {
    children?: React.ReactNode;
    viewport: Viewport;
    isMobile: boolean;
};

type SelectedState = Map<string, IObjectMaterial>;

type Animation = {
    state: AnimationState;
    animating: boolean;
};

export const Toolbar: FC<ToolbarProps> = ({ viewport, children, isMobile }) => {
    const [showEdges, setShowEdges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState<Animation | null>(null);
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
                        };
                    }

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
            setAnimate({
                state: e.state,
                animating: e.running,
            });
            console.log("done", e.state);
        };

        if (model) {
            if (model.materials) {
                setSelected(model.materials);
            }

            if (model.animations) {
                viewport.addEventListener("modelAnimated", (e) => handleModelAnimationComplete(e));
                setAnimate({
                    state: "closed",
                    animating: false,
                });
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
        // @ts-ignore
        setSelected(new Map([...selected]));

        await loadMaterials(materialObj);
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

            {/* {animate !== null && (
                <Button
                    title={animate.state === "closed" ? "Open" : "Close"}
                    variant="toolbar"
                    icon={animate.state === "closed" ? "door-closed" : "door-open"}
                    text={animate.state === "closed" ? "Open" : "Close"}
                    active={animate.animating || animate.state === "opened"}
                    disabled={animate.animating}
                    onClick={(e) => {
                        viewport.toggleAnimation();
                    }}
                />
            )} */}

            <Button
                title={"explode"}
                variant="toolbar"
                icon={"stack"}
                text={"Explode"}
                active={false}
                disabled={false}
                onClick={(e) => {
                    viewport.toggleExplode();
                }}
            />

            {children}
        </Panel>
    );
};
