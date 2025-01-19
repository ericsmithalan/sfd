import clsx from "clsx";
import { FC } from "react";
import { IconName } from "../../types";
import "./style.scss";

type IconProps = {
    name: IconName;
    className?: string;
    fill?: boolean;
    active?: boolean;
};

export const Icon: FC<IconProps> = ({ name, fill = false, active = false, className }) => {
    return (
        <div className={clsx("icon", className)}>
            <i
                className={clsx(
                    "ri-icon",
                    name && `ri-${name}-${fill || active ? "fill" : "line"}`,
                )}
            />
        </div>
    );
};
