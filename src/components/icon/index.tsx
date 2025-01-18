import clsx from "clsx";
import { FC } from "react";
import { IconName } from "../../types";
import "./style.scss";

type IconProps = {
    name: IconName;
    className?: string;
    fill?: boolean;
};

export const Icon: FC<IconProps> = ({ name, fill = false, className }) => {
    const filled = fill ? "-fill" : "";

    return (
        <div className={className}>
            <i className={clsx(`icon hl-icon-${name}${filled}`)} />
        </div>
    );
};
