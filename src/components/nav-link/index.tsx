import { FC, ReactNode } from "react";

import clsx from "clsx";
import { Link } from "react-router-dom";
import "./style.scss";

type NavLinkProps = {
    href: string;
    children?: ReactNode;
    active?: boolean;
    variant?: "link" | "outliner";
};

export const NavLink: FC<NavLinkProps> = ({
    href,
    active,
    children,
    variant = "link",
}) => {
    return (
        <Link className={clsx("link", active && "active", variant)} to={href}>
            {children}
        </Link>
    );
};
