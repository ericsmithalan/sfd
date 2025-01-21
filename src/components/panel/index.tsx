import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import { IconName } from "../../types";
import { Button } from "../button";
import "./style.scss";

type PanelProps = {
    className?: string;
    children?: ReactNode;
    title?: string;
    icon?: IconName;
    contentCss?: string;
};

export const Panel: FC<PanelProps> = ({ className, children, title, contentCss, icon }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className={clsx("panel", open && "panel-open", className)}>
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
        </div>
    );
};
