import clsx from "clsx";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IOutliner } from "../../interface";
import { IconName } from "../../types";
import { Button } from "../button";
import { Icon } from "../icon";
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
            <Button
                ref={btnRef}
                icon="apps"
                iconFill={true}
                variant="panel"
                className={clsx("panel-dropdown", isMobile && "mobile", className)}
                onClick={(e) => {
                    setOpen(!open);
                    e.stopPropagation();
                }}
            >
                <div className="title" title={`${title}`}>
                    {`${title}:`}
                </div>

                {selected && (
                    <div title={selected?.name} className="selected">
                        {selected.name}
                    </div>
                )}

                <Icon fill={true} className="icn-dropdown" name={open ? "menu" : "menu"} />

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
                        </div>,
                        document.body,
                    )}
            </Button>
        </>
    );
};
