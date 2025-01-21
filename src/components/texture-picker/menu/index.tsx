import clsx from "clsx";
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { getElementCoordinates, getPopupPosition, getWindowCoordinates } from "../../../utils";

import { ITexture } from "../../../interface/ITexture";
import { Scroller } from "../../scroller";
import { TextureButton } from "../texture-button";
import "./style.scss";

type TextureMenuProps = {
    items: Array<ITexture>;
    selected: ITexture | null;
    targetRef: RefObject<any>;
    open?: boolean;
    onItemClick?: (value: ITexture, e: MouseEvent) => void;
    onHide?: () => void;
};

export const TextureMenu = ({
    items = [],
    targetRef,
    onItemClick,
    onHide,
    open,
    selected,
}: TextureMenuProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (targetRef?.current && menuRef.current) {
            const targetCoords = getElementCoordinates(targetRef.current);
            const menuCoords = getElementCoordinates(menuRef.current);
            const containerCoords = getWindowCoordinates();

            if (targetCoords && menuCoords && containerCoords) {
                const pos = getPopupPosition(targetCoords, menuCoords, containerCoords, "bottom");
                setPosition({ x: pos.x - 100, y: pos.y, width: targetCoords.width + 200 });
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
                <Scroller>
                    {items.map((item, i) => (
                        <TextureButton
                            key={i}
                            active={item.id === selected?.id}
                            image={item.thumbnail}
                            text={item.name}
                            data-id={item.id}
                            onClick={(e) => {
                                if (onItemClick) {
                                    onItemClick(item, e);
                                }
                            }}
                        />
                    ))}
                </Scroller>
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
