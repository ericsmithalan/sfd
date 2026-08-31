import clsx from "clsx";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IOutliner } from "../../interface";
import { IconName } from "../../types";
import { Button } from "../button";
import { BorderHighlight } from "../panel/BorderHighlight";
import "./style.scss";

type PanelDropdownProps = {
    className?: string;
    children?: ReactNode;
    active?: boolean;
    text?: string;
    title?: string;
    textIcon?: IconName;
    icon?: IconName;
    selected?: IOutliner;
    isMobile: boolean;
    onClick?: (e: MouseEvent) => void;
};

export const PanelDropdown = ({
    text,
    active,
    onClick,
    className,
    title,
    children,
    icon,
    selected,
    textIcon,
    isMobile,
}: PanelDropdownProps) => {
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const portalRef = useRef(null);

    useEffect(() => {
        const handleDocClick = () => {
            if (open) {
                setOpen(false);
            }
        };

        if (portalRef && portalRef.current) {
            document.addEventListener("click", handleDocClick);
        }

        return () => {
            document.removeEventListener("click", handleDocClick);
        };
    });

    return (
        <>
            <div
                ref={btnRef}
                className={clsx("panel-dropdown", isMobile && "mobile", className)}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="layout">
                    <div
                        className="layout-title"
                        onClick={() => {
                            setOpen(!open);
                            console.log(!open);
                        }}
                    >
                        <Button
                            className="title"
                            title={`${title}`}
                            variant="title"
                            active={active}
                            icon={icon}
                            text={`${title}:`}
                        />
                        {selected && (
                            <Button
                                title={selected?.name}
                                className="selected"
                                variant="title"
                                active={active}
                                icon={textIcon}
                                text={selected?.name}
                            />
                        )}
                    </div>
                    <Button
                        title={open ? "Close" : "Open"}
                        className="dropdown-toggle"
                        variant="title"
                        active={active}
                        icon={open ? "arrow-up-s" : "arrow-down-s"}
                        onClick={() => {
                            setOpen(!open);
                        }}
                    />
                </div>

                <div className="inner-border"></div>
                <BorderHighlight />
                {open &&
                    btnRef.current &&
                    createPortal(
                        <div
                            ref={portalRef}
                            className={clsx("panel", "dropdown", isMobile && "mobile")}
                        >
                            <div className="dropdown-items">{children}</div>
                            <div className="inner-border"></div>
                            <BorderHighlight />
                        </div>,
                        document.body,
                    )}
            </div>
        </>
    );
};
