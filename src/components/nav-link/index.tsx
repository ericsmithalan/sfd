import { FC, ReactNode } from "react";

import "./style.scss";
import { Link } from "react-router-dom";

type NavLinkProps = {
    href: string;
    children?: ReactNode;
};

export const NavLink: FC<NavLinkProps> = ({ href, children }) => {
    return (
        <Link className="link" to={href}>
            {children}
        </Link>
    );
};
