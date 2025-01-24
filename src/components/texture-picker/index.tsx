import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";
import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { TextureMenu } from "./menu";
import "./style.scss";
import { TextureButton } from "./texture-button";

type TexturePickerProps = {
    className?: string;
    isMobile?: boolean;
    label?: string;
    material: IObjectMaterial;
    textures: Array<ITexture>;
    onItemClick?: (material: IObjectMaterial, e: MouseEvent) => void;
};

export const TexturePicker: FC<TexturePickerProps> = ({
    className,
    textures,
    label,
    isMobile = false,
    material,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ITexture | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelected(material.texture || null);
    }, [material.texture]);

    const getLabel = () => {
        if (label === "hardware") {
            return "metal";
        }
        if (label === "primary") {
            return "color 1";
        }
        if (label === "contrast") {
            return "color 2";
        }
    };

    return (
        <>
            {selected && (
                <TextureButton
                    ref={buttonRef}
                    isMobile={isMobile}
                    active={open}
                    text={getLabel()}
                    className={clsx("menu-button", className)}
                    image={selected.thumbnail}
                    onClick={(e: MouseEvent) => {
                        setOpen(!open);
                    }}
                />
            )}
            {open &&
                createPortal(
                    <TextureMenu
                        isMobile={isMobile}
                        open={open}
                        selected={selected}
                        items={textures}
                        onItemClick={(value, e) => {
                            if (onItemClick) {
                                material.texture = value;
                                onItemClick(material, e);
                            }
                            setSelected(value);
                            setOpen(!open);
                        }}
                        onHide={() => {
                            setOpen(false);
                        }}
                        targetRef={buttonRef}
                    />,
                    document.body,
                )}
        </>
    );
};
