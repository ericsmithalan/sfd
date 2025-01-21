import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { IObjectMaterial } from "../../interface";
import { ITexture } from "../../interface/ITexture";
import { TextureMenu } from "./menu";
import "./style.scss";
import { TextureButton } from "./texture-button";

type TexturePickerProps = {
    label?: string;
    material: IObjectMaterial;
    items: Array<ITexture>;
    text?: string;
    texture?: ITexture | null;
    onItemClick?: (value: ITexture, material: IObjectMaterial, e: MouseEvent) => void;
};

export const TexturePicker: FC<TexturePickerProps> = ({
    items,
    label,
    texture,
    material,
    text,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ITexture | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelected(texture || null);
        console.log(texture, items);
    }, [texture]);

    return (
        <>
            <TextureButton
                ref={buttonRef}
                active={open}
                text={label}
                className="menu-button"
                image={selected?.thumbnail}
                onClick={(e: MouseEvent) => {
                    setOpen(!open);
                }}
            />
            {open &&
                createPortal(
                    <TextureMenu
                        open={open}
                        selected={selected}
                        items={items}
                        onItemClick={(value, e) => {
                            if (onItemClick) {
                                onItemClick(value, material, e);
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
