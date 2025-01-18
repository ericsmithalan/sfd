import clsx from "clsx";
import { FC, MouseEvent, ReactNode } from "react";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type ButtonProps = {
    text?: string;
    children?: ReactNode;
    icon?: IconName;
    active?: boolean;
    variant?: "toolbar" | "image" | "default";
    onClick?: (e: MouseEvent) => void;
};

export const Button: FC<ButtonProps> = ({
    children,
    icon,
    text,
    active = false,
    variant = "default",
    onClick,
}) => {
    return (
        <button
            tabIndex={0}
            className={clsx("button", variant)}
            onClick={onClick}
        >
            {text && <div className="text">{text}</div>}
            {icon && <Icon name={icon} fill={active} />}
            {children}
        </button>
    );
};
