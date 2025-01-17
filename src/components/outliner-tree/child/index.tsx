import clsx from "clsx";
import { ReactNode } from "react";
import { IconName } from "../../../types";
import { NavLink } from "../../nav-link";
import "./style.scss";

type OutlinerChildProps = {
    children?: ReactNode;
    level: 1 | 2 | 3;
    active: boolean;
    name: string;
    href: string;
    icon: IconName;
};

export const OutlinerChild = ({
    children,
    active,
    name,
    href,
    icon,
    level,
}: OutlinerChildProps) => {
    return (
        <div className={clsx("outliner-child", `level-${level}`)}>
            <div className={clsx(`outline level-${level}`)}>
                <div className={clsx(`v-line level-${level}`)}>
                    <div className="content">
                        <div className="h-line"></div>

                        <NavLink
                            variant="outliner"
                            icon={icon}
                            active={active}
                            href={href}
                        >
                            {name}
                        </NavLink>
                    </div>

                    {children && (
                        <div className={clsx(`children level-${level}`)}>
                            <div className={clsx(`scroller level-${level}`)}>
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
