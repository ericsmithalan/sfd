import { FC, MouseEvent } from "react";

import clsx from "clsx";
import { Link, NavLink as NavLink2 } from "react-router-dom";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type NavLinkProps = {
    href: string;
    title?: string;
    active?: boolean;
    text?: string;
    variant?: "link" | "outliner" | "back";
    icon?: IconName;
    isNav?: boolean;
    resolve?: "path" | "route";
    wrap?: boolean;
    onClick?: (e: MouseEvent) => void;
};

export const NavLink: FC<NavLinkProps> = ({
    href,
    title,
    active,
    onClick,
    text,
    resolve = "path",
    isNav = true,
    variant = "link",
    wrap = true,
    icon,
}) => {
    return isNav ? (
        <NavLink2
            title={title}
            relative={resolve}
            onClick={onClick}
            className={clsx("link", active && "active", `lnk-${variant}`)}
            to={href}
        >
            {icon && <Icon name={icon} fill={active} />}
            {text && <div className={clsx("link-content", !wrap && "no-wrap")}>{text}</div>}
        </NavLink2>
    ) : (
        <Link
            title={title}
            relative={resolve}
            onClick={onClick}
            className={clsx("link", active && "active", `lnk-${variant}`)}
            to={href}
        >
            {icon && <Icon name={icon} fill={active} />}
            {text && <div className={clsx("link-content", !wrap && "no-wrap")}>{text}</div>}
        </Link>
    );
};
