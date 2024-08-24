import classNames from "classnames";
import { IconName } from "../../../types";
import { FontIcon } from "../font-icon";
import Link from "next/link";

interface LinkerProps {
    icon?: IconName;
    href: string;
    children?: React.ReactNode;
    className?: string;
}

export const Linker = ({ className, children, href, icon }: LinkerProps) => {
    return (
        <Link
            href={href}
            className={classNames("inline-flex flex-row gap-4", className)}
        >
            {icon && <FontIcon icon={icon} />}
            {children}
        </Link>
    );
};
