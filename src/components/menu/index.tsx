import clsx from "clsx";
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { IMenuItem } from "../../interface";
import { getElementCoordinates, getPopupPosition, getWindowCoordinates } from "../../utils";
import { ImageButton } from "../image-button";
import "./style.scss";

type MenuProps = {
    items: Array<IMenuItem>;
    selected: IMenuItem | null;
    targetRef: RefObject<any>;
    open?: boolean;
    onItemClick?: (value: IMenuItem, e: MouseEvent) => void;
    onItemMouseOver?: (value: IMenuItem, e: MouseEvent) => void;
    onItemMouseOut?: (value: IMenuItem, e: MouseEvent) => void;
    onHide?: () => void;
};

export const Menu = ({
    items = [],
    targetRef,
    onItemClick,
    onItemMouseOver,
    onItemMouseOut,
    onHide,
    open,
    selected,
}: MenuProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (targetRef?.current && menuRef.current) {
            const targetCoords = getElementCoordinates(targetRef.current);
            const menuCoords = getElementCoordinates(menuRef.current);
            const containerCoords = getWindowCoordinates();

            if (targetCoords && menuCoords && containerCoords) {
                const pos = getPopupPosition(targetCoords, menuCoords, containerCoords, "bottom");
                setPosition({ x: pos.x, y: pos.y, width: targetCoords.width });
            }
        }
    }, [targetRef]);

    return (
        <>
            <div
                ref={menuRef}
                className={clsx("menu")}
                style={{ left: position?.x, top: position?.y, width: position.width }}
            >
                {items.map((item, i) => (
                    <ImageButton
                        key={i}
                        active={item.id === selected?.id}
                        image={item.image}
                        text={item.name}
                        data-id={item.id}
                        onMouseOver={(e) => {
                            if (onItemMouseOver) {
                                onItemMouseOver(item, e);
                            }
                        }}
                        onMouseOut={(e) => {
                            if (onItemMouseOut) {
                                onItemMouseOut(item, e);
                            }
                        }}
                        onClick={(e) => {
                            if (item.onClick) {
                                item.onClick(item, e);
                            }

                            if (onItemClick) {
                                onItemClick(item, e);
                            }
                        }}
                    />
                ))}
            </div>
            <div
                className="menu-wrapper"
                onClick={() => {
                    if (onHide) {
                        onHide();
                    }
                }}
            />
        </>
    );
};
