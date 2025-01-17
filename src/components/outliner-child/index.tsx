import clsx from "clsx";
import { memo, MouseEvent, ReactNode, useState } from "react";
import { IconName } from "../../types";
import { Button } from "../button";
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
    onToolClick?: (tool: "visible", visible: boolean, e: MouseEvent) => void;
};

export const OutlinerChild = memo((props: OutlinerChildProps) => {
    const [objectVisible, setObjectVisible] = useState(true);

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
                        {props.level && props.level > 2 && (
                            <div className="tools">
                                <Button
                                    variant="toolbar"
                                    icon={objectVisible ? "visible" : "hidden"}
                                    onClick={(e) => {
                                        if (props.onToolClick) {
                                            props.onToolClick(
                                                "visible",
                                                !objectVisible,
                                                e,
                                            );
                                            setObjectVisible(!objectVisible);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {props.open === true && props.children && (
                        <div className={clsx(`children level-${props.level}`)}>
                            <div
                                className={clsx(
                                    `scroller level-${props.level}`,
                                )}
                            >
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
