import { FC, MouseEvent, RefObject, useEffect, useRef, useState } from "react";
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
    panelRef?: RefObject<HTMLDivElement | null>;
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
    panelRef,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ITexture | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelected(material.texture || null);
    }, [material.texture]);

    return (
        <>
            {selected && (
                <TextureButton
                    ref={buttonRef}
                    isMobile={isMobile}
                    active={open}
                    text={label}
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
                        panelRef={panelRef}
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
