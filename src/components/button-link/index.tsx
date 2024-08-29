import classNames from "classnames";
import Link from "next/link";

import { Icon, IconNames, IconSize } from "../icon";

interface ButtonLinkProps {
    icon?: IconNames;
    href: string;
    children?: React.ReactNode;
    className?: string;
    iconClassName?: string;
    variant?: "border" | "fill";
    title: string;
    iconSize?: IconSize;
    onClick?: (e: React.MouseEvent) => void;
}

export const ButtonLink = ({
    className,
    children,
    href,
    icon,
    variant,
    iconClassName,
    iconSize,
    title,
    onClick,
}: ButtonLinkProps) => {
    return (
        <Link
            title={title}
            href={href}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            className={classNames(
                "inline-flex flex-nowrap flex-row text-nowrap rounded-sm gap-2 items-center",
                variant == "border" &&
                    "outline outline-1 pl-5 pr-5 outline-sfdPrimary3 pt-2 pb-2 ",
                variant == "fill" && "bg-sfdPrimary3 pl-5 pr-5 pt-2 pb-2 ",
                className
            )}
        >
            {icon && <Icon title={title} iconSize={iconSize} icon={icon} />}
            {children}
        </Link>
    );
};
