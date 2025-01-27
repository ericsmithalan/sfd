import clsx from "clsx";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AnimationClip, AnimationMixer, LoopOnce, Mesh } from "three";
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
};

type SelectedTextureState = Map<string, IObjectMaterial>;

type AnimationState = {
    mixer: AnimationMixer;
    clips: Array<AnimationClip>;
};

export const Toolbar: FC<ToolbarProps> = ({ viewport, children }) => {
    const [visible, setVisible] = useState(false);
    const [showEdges, setShowEdges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animation, setAnimation] = useState<AnimationState | null>(null);
    const [animating, setAnimating] = useState(false);
    const [resolution] = useState<TextureResolution>("2k");
    const [selected, setSelected] = useState<SelectedTextureState>(new Map());
    const { model, isMobile } = useModel();
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
        const isAnimatable = () => {
            if (model && model.animations) {
                return model.animations.length > 0;
            }
            return false;
        };

        if (model?.materials) {
            Array.from(model.materials.entries()).map(([key, value], i) => loadMaterials(value));

            setSelected(model.materials);
        } else {
            setSelected(new Map());
        }

        if (model) {
            if (isAnimatable()) {
                setAnimation({
                    mixer: new AnimationMixer(model.object),
                    clips: model.animations || [],
                });
            } else {
                setAnimation(null);
            }

            setVisible(true);
        } else {
            setAnimation(null);
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
        const sel = selected.get(key);

        if (sel) {
            disposeMaterial(sel.material);
        }

        selected.set(key, materialObj);

        await loadMaterials(materialObj);

        // @ts-ignore
        setSelected(new Map([...selected]));
    };

    useEffect(() => {
        const onAnimate = (e: IViewportEvent["animate"]) => {
            if (animation) {
                animation.mixer.update(e.time);
            }
        };

        if (animation) {
            viewport.addEventListener("animate", (e) => onAnimate(e));
        }

        () => {
            if (animation) {
                viewport.removeEventListener("animate", (e) => onAnimate(e));
            }
        };
    }, [animation, viewport]);

    const handleAnimate = () => {
        if (animation && !animating) {
            console.log("clicked");
            setAnimating(true);

            const handleDone = () => {
                viewport.animating = false;
                setAnimating(false);
                animation.mixer.removeEventListener("loop", handleDone);
                animation.mixer.removeEventListener("finished", handleDone);
            };

            animation.mixer.addEventListener("loop", handleDone);
            animation.mixer.addEventListener("finished", handleDone);

            viewport.animating = true;
            animation.clips.forEach(function (clip) {
                const action = animation.mixer.clipAction(clip);
                if (!action.isRunning()) {
                    if (action.paused) {
                        action.paused = false;
                        action.timeScale = -action.timeScale;
                        action.clampWhenFinished = true;

                        action.play();
                    } else {
                        action.paused = false;
                        action.loop = LoopOnce;
                        action.clampWhenFinished = true;

                        action.play();
                    }
                }
            });
        }
    };

    return (
        <Panel
            ref={panelRef}
            className={clsx("app-toolbar-panel", !visible && "hidden", isMobile && "mobile")}
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
            {animation && (
                <Button
                    title="Animate"
                    variant="toolbar"
                    icon="play"
                    text={"Play"}
                    active={animating}
                    disabled={animating}
                    onClick={(e) => {
                        if (!animating) {
                            handleAnimate();
                        }
                    }}
                />
            )}

            {children}
        </Panel>
    );
};
