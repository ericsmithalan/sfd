import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IMenuItem } from "../../interface";
import { Icon } from "../icon";
import { ImageButton } from "../image-button";
import { Menu } from "../menu";
import "./style.scss";

type MenuButtonProps = {
    items: Array<IMenuItem>;
    text?: string;
    selected?: IMenuItem | null;
    onItemClick?: (value: IMenuItem, e: MouseEvent) => void;
    onItemMouseOver?: (value: IMenuItem, e: MouseEvent) => void;
    onItemMouseOut?: (value: IMenuItem, e: MouseEvent) => void;
};

export const MenuButton: FC<MenuButtonProps> = ({
    items,
    selected,
    text,
    onItemClick,
    onItemMouseOver,
    onItemMouseOut,
}) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<IMenuItem | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(selected || null);
    }, [selected]);

    return (
        <>
            <ImageButton
                ref={buttonRef}
                active={open}
                text={selectedValue?.name || text}
                className="menu-button"
                image={selected?.image}
                onClick={(e: MouseEvent) => {
                    setOpen(!open);
                }}
            >
                <Icon name="arrow-down" />
            </ImageButton>
            {open &&
                createPortal(
                    <Menu
                        open={open}
                        selected={selectedValue}
                        items={items}
                        onItemMouseOut={onItemMouseOut}
                        onItemMouseOver={onItemMouseOver}
                        onItemClick={(value, e) => {
                            if (onItemClick) {
                                onItemClick(value, e);
                            }
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
