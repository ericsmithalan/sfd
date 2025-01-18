import clsx from "clsx";
import { FC, ReactNode } from "react";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type PanelProps = {
    className?: string;
    children?: ReactNode;
    title?: string;
    icon?: IconName;
};

export const Panel: FC<PanelProps> = ({ className, children, title, icon }) => {
    return (
        <div className={clsx("panel")}>
            {title && (
                <div className="title">
                    {icon && <Icon name={icon} fill={true} />}
                    {title}
                </div>
            )}
            <div className={clsx("content", className)}>{children}</div>
        </div>
    );
};
