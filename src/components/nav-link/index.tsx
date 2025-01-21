import { FC, MouseEvent } from "react";

import clsx from "clsx";
import { NavLink as Link } from "react-router-dom";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type NavLinkProps = {
    href: string;
    active?: boolean;
    text?: string;
    variant?: "link" | "outliner";
    icon?: IconName;
    wrap?: boolean;
    onClick?: (e: MouseEvent) => void;
};

export const NavLink: FC<NavLinkProps> = ({
    href,
    active,
    onClick,
    text,
    variant = "link",
    wrap = true,
    icon,
}) => {
    return (
        <Link
            onClick={onClick}
            className={clsx("link", active && "active", `lnk-${variant}`)}
            to={href}
        >
            {icon && <Icon name={icon} fill={active} />}
            {text && <div className={clsx("link-content", !wrap && "no-wrap")}>{text}</div>}
        </Link>
    );
};
