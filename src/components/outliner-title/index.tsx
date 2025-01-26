import { MouseEvent } from "react";

import clsx from "clsx";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { IconName } from "../../types";
import { LogoIcon } from "../logo/LogoIcon";
import { NavLink } from "../nav-link";
import "./style.scss";

type OutlinerTitleProps = {
    className?: string;
    isMobile?: boolean;
    title?: string;
    subTitle?: string;
    crumbs?: BreadcrumbData[];
    iconName?: IconName;
    onBack?: (e: MouseEvent) => void;
};

export const OutlinerTitle = ({
    className,
    isMobile,
    title,
    iconName,
    subTitle,
    onBack,
}: OutlinerTitleProps) => {
    return (
        <div className={clsx("outliner-title", className)}>
            <div className="title-content">
                {isMobile ? (
                    <NavLink title="Home" className="logo-icon-link" isNav={false} href="/">
                        <LogoIcon height={30} />
                    </NavLink>
                ) : (
                    <NavLink title="Home" isNav={false} href="/" icon="arrow-go-back" />
                )}
                <div title={title} className="header">
                    {/* {iconName && <Icon name={iconName} fill={true} />} */}
                    {title && <div className="outliner-title-text">{title}</div>}
                </div>
            </div>
            {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>
    );
};
