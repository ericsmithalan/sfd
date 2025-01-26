import { FC, MouseEvent, ReactNode } from "react";

import clsx from "clsx";
import Link from "next/link";
import { IconName } from "../../types";
import { Icon } from "../icon";
import "./style.scss";

type NavLinkProps = {
    children?: ReactNode;
    className?: string;
    href: string;
    title?: string;
    active?: boolean;
    text?: string;
    variant?: "link" | "outliner" | "back";
    icon?: IconName;
    wrap?: boolean;
    onClick?: (e: MouseEvent) => void;
};

export const NavLink: FC<NavLinkProps> = ({
    children,
    href,
    className,
    title,
    active,
    onClick,
    text,
    variant = "link",
    wrap = true,
    icon,
}) => {
    return (
        <Link
            title={title}
            onClick={onClick}
            className={clsx("link", active && "active", `lnk-${variant}`, className)}
            href={href}
        >
            {icon && <Icon name={icon} fill={active} />}
            {text && <div className={clsx("link-content", !wrap && "no-wrap")}>{text}</div>}
            {children}
        </Link>
    );
};
