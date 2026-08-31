import clsx from "clsx";
import { createRef, FC, ReactNode, RefObject } from "react";
import { IOutliner } from "../../interface";
import { IconName } from "../../types";
import { Icon } from "../icon";
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
    const panelRef = ref || createRef();

    return (
        <div ref={panelRef} className={clsx("panel", className)}>
            <div className="panel-title">
                {icon && <Icon fill className="icn-dropdown" name={icon} />}
                <div>{title}</div>
            </div>

            <div className={clsx("panel-content", contentCss)}>{children}</div>

            <div className="inner-border"></div>
            <BorderHighlight />
        </div>
    );
};
