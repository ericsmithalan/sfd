import classNames from "classnames";
import { IconName } from "../../../types";
import { FontIcon } from "../font-icon";

interface ButtonLinkProps {
    icon?: IconName;
    children?: React.ReactNode;
    className?: string;
}

export const ButtonLink = ({ className, children, icon }: ButtonLinkProps) => {
    return (
        <a
            href="#"
            className={classNames(
                "inline-flex flex-row flex-initial rounded-sm pt-2 pb-2 pl-5 pr-5 outline outline-1 outline-sfdPrimary1 gap-2",
                className
            )}
        >
            {icon && <FontIcon icon={icon} />}
            {children}
        </a>
    );
};
