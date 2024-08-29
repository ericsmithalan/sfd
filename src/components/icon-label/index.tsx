import classNames from "classnames";

import { Icon, IconNames, IconSize } from "../icon";
import { Flex } from "../flex";

interface IconLabelProps {
    icon?: IconNames;
    children?: React.ReactNode;
    className?: string;
    iconClassName?: string;
    title: string;
    iconSize?: IconSize;
}

export const IconLabel = ({
    className,
    children,
    icon,
    iconClassName,
    iconSize,
    title,
}: IconLabelProps) => {
    return (
        <Flex
            as="div"
            className={classNames(
                "inline-flex flex-nowrap flex-row text-nowrap rounded-sm gap-2 items-center",
                className
            )}
        >
            {icon && (
                <Icon
                    title={title}
                    iconSize={iconSize}
                    icon={icon}
                    className={iconClassName}
                />
            )}
            {children}
        </Flex>
    );
};
