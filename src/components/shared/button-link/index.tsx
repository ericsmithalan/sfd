import classNames from "classnames";
import { IconName } from "../../../types";
import { FontIcon } from "../font-icon";
import { Flex } from "../flex";

interface ButtonLinkProps {
    icon?: IconName;
    href?: string;
    children?: React.ReactNode;
    className?: string;
}

export const ButtonLink = ({
    className,
    children,
    href,
    icon,
}: ButtonLinkProps) => {
    return (
        <a
            href={href}
            className={classNames(
                "rounded-sm pt-2 pb-2 pl-5 pr-5 outline outline-1 outline-sfdPrimary1 gap-2",
                className
            )}
        >
            {icon && <FontIcon icon={icon} />}
            {children}
        </a>
    );
};
