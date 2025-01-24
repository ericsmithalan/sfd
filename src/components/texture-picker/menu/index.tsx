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
    selected,
}: TextureMenuProps) => {
    const [position, setPosition] = useState<{ x: number; y: number; width: number }>({
        x: 0,
        y: 0,
        width: 200,
    });
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (targetRef?.current && menuRef.current) {
            const targetCoords = getElementCoordinates(targetRef.current);
            const menuCoords = getElementCoordinates(menuRef.current);

            if (targetCoords && menuCoords) {
                if (isMobile) {
                    setPosition({
                        x: targetCoords.x - 10,
                        y: targetCoords.top - menuCoords.bottom,
                        width: 200,
                    });
                } else {
                    setPosition({
                        x: targetCoords.x - 10,
                        y: targetCoords.top - menuCoords.bottom,
                        width: 200,
                    });
                }
            }
        }
    }, [targetRef, menuRef, isMobile]);

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
