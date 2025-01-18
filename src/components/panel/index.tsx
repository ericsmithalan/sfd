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
};

export const Panel: FC<PanelProps> = ({ className, children, title, icon }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className={clsx("panel", open && "open")}>
            {title && (
                <Button
                    iconFill={true}
                    className="title"
                    variant="panel"
                    icon={icon}
                    text={title}
                    onClick={() => {
                        setOpen(!open);
                    }}
                />
            )}
            {open && (
                <div className={clsx("content", className)}>{children}</div>
            )}
        </div>
    );
};
