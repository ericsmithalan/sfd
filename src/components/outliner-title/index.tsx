import { MouseEvent } from "react";

import clsx from "clsx";
import { IconName } from "../../types";
import { LogoIcon } from "../logo/LogoIcon";
import { NavLink } from "../nav-link";
import "./style.scss";

type OutlinerTitleProps = {
    className?: string;
    isMobile?: boolean;
    title?: string;
    subTitle?: string;
    noIcon?: boolean;
    iconName?: IconName;
    onBack?: (e: MouseEvent) => void;
};

export const OutlinerTitle = ({
    className,
    isMobile,
    title,
    noIcon,
    iconName,
    subTitle,
    onBack,
}: OutlinerTitleProps) => {
    return (
        <div className={clsx("outliner-title", noIcon && "no-icon", className)}>
            {title && (
                <div className={clsx("title-content", !title && "no-title")}>
                    {isMobile ? (
                        <NavLink title="Home" className="logo-icon-link" isNav={false} href="/">
                            <LogoIcon height={30} />
                        </NavLink>
                    ) : (
                        !noIcon && (
                            <NavLink
                                title="Home"
                                isNav={false}
                                href="../../"
                                icon="arrow-go-back"
                            />
                        )
                    )}
                    {title && (
                        <div title={title} className="header">
                            <div className="outliner-title-text">{title}</div>
                        </div>
                    )}
                </div>
            )}
            {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>
    );
};
