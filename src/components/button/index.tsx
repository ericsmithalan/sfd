import clsx from "clsx";
import { FC, MouseEvent, ReactNode } from "react";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type ButtonProps = {
    id?: string;
    text?: string;
    title?: string;
    children?: ReactNode;
    icon?: IconName;
    disabled?: boolean;
    iconFill?: boolean;
    active?: boolean;
    variant?: "toolbar" | "image" | "panel" | "title" | "outliner" | "back" | "close";
    className?: string;
    onClick?: (e: MouseEvent) => void;
};

export const Button: FC<ButtonProps> = ({
    children,
    id,
    title,
    icon,
    text,
    active = false,
    disabled,
    iconFill,
    variant = "default",
    className,
    onClick,
}) => {
    return (
        <button
            title={title}
            id={id}
            className={clsx(
                "button",
                `btn-${variant}`,
                disabled && "btn-disabled",
                active && "active",
                className,
            )}
            onClick={onClick}
        >
            {icon && <Icon name={icon} fill={iconFill || active} />}
            {text && <div className="text">{text}</div>}

            {children}
        </button>
    );
};
