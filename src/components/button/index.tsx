import clsx from "clsx";
import { FC, MouseEvent, ReactNode } from "react";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type ButtonProps = {
    text?: string;
    children?: ReactNode;
    icon?: IconName;
    iconFill?: boolean;
    active?: boolean;
    variant?: "toolbar" | "image" | "panel" | "outliner";
    className?: string;
    onClick?: (e: MouseEvent) => void;
};

export const Button: FC<ButtonProps> = ({
    children,
    icon,
    text,
    active = false,
    iconFill,
    variant = "default",
    className,
    onClick,
}) => {
    return (
        <button
            className={clsx("button", `btn-${variant}`, active && "active", className)}
            onClick={onClick}
        >
            {icon && <Icon name={icon} fill={iconFill || active} />}
            {text && <div className="text">{text}</div>}

            {children}
        </button>
    );
};
