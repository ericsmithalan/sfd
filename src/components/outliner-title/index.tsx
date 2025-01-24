import { MouseEvent } from "react";

import clsx from "clsx";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { IconName } from "../../types";
import { Icon } from "../icon";
import { NavLink } from "../nav-link";
import "./style.scss";

type OutlinerTitleProps = {
    className?: string;
    title?: string;
    subTitle?: string;
    crumbs?: BreadcrumbData[];
    iconName?: IconName;
    onBack?: (e: MouseEvent) => void;
};

export const OutlinerTitle = ({
    className,
    title,
    iconName,
    crumbs,
    subTitle,
    onBack,
}: OutlinerTitleProps) => {
    return (
        <div className={clsx("outliner-title", className)}>
            <div className="title-content">
                <NavLink title="Home" isNav={false} href="/" icon="home-4" variant="back" />
                <NavLink
                    title="Back"
                    isNav={false}
                    href="../"
                    icon="arrow-left-long"
                    variant="back"
                />
                <div title={title} className="header">
                    {iconName && <Icon name={iconName} fill={true} />}
                    {title && <div className="outliner-title-text">{title}</div>}
                </div>
            </div>
            {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>
    );
};
