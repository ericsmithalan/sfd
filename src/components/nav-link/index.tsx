import { FC, ReactNode } from "react";

import { IconName } from "@/types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Icon } from "../icon";
import "./style.scss";

type NavLinkProps = {
    href: string;
    children?: ReactNode;
    active?: boolean;
    variant?: "link" | "outliner";
    icon?: IconName;
};

export const NavLink: FC<NavLinkProps> = ({
    href,
    active,
    children,
    variant = "link",
    icon,
}) => {
    return (
        <Link className={clsx("link", active && "active", variant)} to={href}>
            {icon && <Icon name={icon} fill={active} />}
            {children}
        </Link>
    );
};
