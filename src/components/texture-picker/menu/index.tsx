import clsx from "clsx";
import { MouseEvent, RefObject, useLayoutEffect, useRef, useState } from "react";
import { getElementCoordinates } from "../../../utils";

import { ITexture } from "../../../interface/ITexture";
import { TextureButton } from "../texture-button";
import "./style.scss";

type TextureMenuProps = {
    className?: string;
    items: Array<ITexture>;
    selected: ITexture | null;
    targetRef: RefObject<any>;
    isMobile?: boolean;
    panelRef?: RefObject<HTMLDivElement | null>;
    open?: boolean;
    onItemClick?: (value: ITexture, e: MouseEvent) => void;
    onHide?: () => void;
};

export const TextureMenu = ({
    items = [],
    className,
    targetRef,
    isMobile = false,
    onItemClick,
    onHide,
    open,
    panelRef,
    selected,
}: TextureMenuProps) => {
    const menuWidth = isMobile ? 350 : 450;

    const [position, setPosition] = useState<{ x: number; y: number; width: number }>({
        x: 0,
        y: 0,
        width: menuWidth,
    });
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (targetRef?.current && menuRef.current && panelRef?.current) {
            const targetCoords = getElementCoordinates(targetRef.current);
            const menuCoords = getElementCoordinates(menuRef.current);
            const panelCoords = getElementCoordinates(panelRef.current);

            if (targetCoords && menuCoords && panelCoords) {
                if (isMobile) {
                    setPosition({
                        x: panelCoords.x + panelCoords.width / 2 - menuWidth / 2,
                        y: targetCoords.top - menuCoords.bottom - 5,
                        width: menuWidth,
                    });
                } else {
                    setPosition({
                        x: panelCoords.x + panelCoords.width / 2 - menuWidth / 2,
                        y: targetCoords.top - menuCoords.bottom - 5,
                        width: menuWidth,
                    });
                }
            }
        }
    }, [targetRef, menuRef, panelRef, isMobile]);

    return (
        <>
            <div
                ref={menuRef}
                className={clsx("menu", className)}
                style={{
                    left: position?.x,
                    top: position?.y,
                    width: position.width,
                }}
            >
                <div className="inner-border"></div>
                <div className="menu-content">
                    {items.map((item, i) => {
                        return (
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
                        );
                    })}
                </div>
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
