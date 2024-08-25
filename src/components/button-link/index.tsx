import classNames from "classnames";
import { IconName } from "../../types";
import { FontIcon } from "../font-icon";
import Link from "next/link";

interface ButtonLinkProps {
    icon?: IconName;
    href: string;
    children?: React.ReactNode;
    className?: string;
    variant?: "border" | "fill";
    title?: string;
}

export const ButtonLink = ({
    className,
    children,
    href,
    icon,
    variant,
    title,
}: ButtonLinkProps) => {
    return (
        <Link
            title={title}
            href={href}
            className={classNames(
                "inline-flex flex-nowrap flex-row text-nowrap rounded-sm gap-2 items-center",
                !variant && "pl-0 pr-0",
                variant == "border" &&
                    "outline outline-1 pl-5 pr-5 outline-sfdPrimary3 pt-2 pb-2 ",
                variant == "fill" && "bg-sfdPrimary3 pl-5 pr-5 pt-2 pb-2 ",
                className
            )}
        >
            {icon && <FontIcon className="text-sfdPrimary3" icon={icon} />}
            {children}
        </Link>
    );
};
