import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ITexture } from "../../interface/ITexture";
import { TextureMenu } from "./menu";
import "./style.scss";
import { TextureButton } from "./texture-button";

type TexturePickerProps = {
    label?: string;
    items: Array<ITexture>;
    text?: string;
    texture?: ITexture | null;
    onItemClick?: (value: ITexture, e: MouseEvent) => void;
};

export const TexturePicker: FC<TexturePickerProps> = ({
    items,
    label,
    texture,
    text,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ITexture | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelected(texture || null);
    }, [texture]);

    return (
        <>
            <TextureButton
                ref={buttonRef}
                active={open}
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
                                onItemClick(value, e);
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
