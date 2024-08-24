import classNames from "classnames";
import { IconName } from "../../types";

interface FontIconProps {
    icon?: IconName;
    className?: string;
}

export const FontIcon = ({ icon, className }: FontIconProps) => {
    return (
        <i
            className={classNames(
                "icon",
                "ri-icon",
                icon && `ri-${icon}`,
                className
            )}
        />
    );
};
