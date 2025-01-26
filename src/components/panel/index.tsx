import clsx from "clsx";
import { createRef, FC, ReactNode, RefObject, useEffect, useState } from "react";
import { IconName } from "../../types";
import { Button } from "../button";
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
};

export const Panel: FC<PanelProps> = ({
    className,
    children,
    title,
    contentCss,
    icon,
    opened = true,
    ref,
}) => {
    const [open, setOpen] = useState(true);
    const panelRef = ref || createRef();
    useEffect(() => {
        setOpen(opened);
    }, [opened]);

    return (
        <div ref={panelRef} className={clsx("panel", open && "panel-open", className)}>
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
            {open && <div className={clsx("panel-content", contentCss)}>{children}</div>}
            <div className="inner-border"></div>
            <BorderHighlight />
        </div>
    );
};
