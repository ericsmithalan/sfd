import clsx from "clsx";
import { memo, MouseEvent, ReactNode } from "react";
import { IconName } from "../../types";
import { NavLink } from "../nav-link";
import "./style.scss";

type OutlinerChildProps = {
    children?: ReactNode;
    level: 1 | 2 | 3;
    active?: boolean;
    name: string;
    href: string;
    icon: IconName;
    open?: boolean;
    onClick?: (e: MouseEvent) => void;
};

export const OutlinerChild = memo((props: OutlinerChildProps) => {
    return (
        <div className={clsx("outliner-child", `level-${props.level}`)}>
            <div className={clsx(`outline level-${props.level}`)}>
                <div className={clsx(`v-line level-${props.level}`)}>
                    <div className="content">
                        <div className="h-line"></div>

                        <NavLink
                            wrap={false}
                            onClick={props.onClick}
                            variant="outliner"
                            icon={props.icon}
                            active={props.active || false}
                            href={props.href}
                        >
                            {props.name}
                        </NavLink>
                    </div>

                    {props.open === true && props.children && (
                        <div className={clsx(`children level-${props.level}`)}>
                            <div className={clsx(`scroller level-${props.level}`)}>
                                {props.children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

OutlinerChild.displayName = "OutlinerChild";
