import clsx from "clsx";
import { createRef, FC, ReactNode, RefObject, useEffect, useState } from "react";
import { IOutliner } from "../../interface";
import { IconName } from "../../types";
import { Button } from "../button";
import { NavLink } from "../nav-link";
import { BorderHighlight } from "./BorderHighlight";
import "./style.scss";

type PanelProps = {
    className?: string;
    children?: ReactNode;
    title?: string;
    icon?: IconName;
    opened?: boolean;
    contentCss?: string;
    ref?: RefObject<HTMLDivElement | null>;
    selected?: IOutliner | null;
};

export const Panel: FC<PanelProps> = ({
    className,
    children,
    title,
    contentCss,
    icon,
    opened = true,
    ref,
    selected,
}) => {
    const [open, setOpen] = useState(true);
    const panelRef = ref || createRef();

    useEffect(() => {
        if (selected) {
            setOpen(false);
        } else {
            setOpen(opened);
        }
    }, [opened, selected]);

    return (
        <div
            ref={panelRef}
            className={clsx("panel", open ? "panel-open" : "panel-closed", className)}
        >
            {title && (
                <Button
                    iconFill={true}
                    className="panel-title"
                    variant="panel"
                    icon={icon}
                    text={title}
                    onClick={() => {
                        setOpen(!open);
                    }}
                />
            )}

            {!open && selected && (
                <NavLink
                    variant="outliner"
                    href={``}
                    icon="armchair"
                    active={true}
                    className="selected"
                    text={selected.name}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                />
            )}
            {open && <div className={clsx("panel-content", contentCss)}>{children}</div>}
            {!open && (
                <Button
                    onClick={() => {
                        setOpen(!open);
                    }}
                    variant="back"
                    text={open ? "show less" : "show all"}
                    className="btn-expand"
                    icon={open ? "arrow-up-s" : "arrow-down-s"}
                />
            )}
            <div className="inner-border"></div>
            <BorderHighlight />
        </div>
    );
};
