import { MouseEvent } from "react";

import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { IconName } from "../../types";
import { Icon } from "../icon";
import { NavLink } from "../nav-link";
import "./style.scss";

type OutlinerTitleProps = {
    title?: string;
    subTitle?: string;
    crumbs?: BreadcrumbData[];
    iconName?: IconName;
    onBack?: (e: MouseEvent) => void;
};

export const OutlinerTitle = ({
    title,
    iconName,
    crumbs,
    subTitle,
    onBack,
}: OutlinerTitleProps) => {
    return (
        <div className="outliner-title">
            {/* {crumbs && <Breadcrumb crumbs={crumbs} />} */}
            <div className="title-content">
                <NavLink title="Home" isNav={false} href="/" icon="home-4" variant="back" />
                <NavLink
                    title="Back"
                    isNav={false}
                    href="../"
                    icon="arrow-left-long"
                    variant="back"
                />
                <div className="header">
                    {iconName && <Icon name={iconName} fill={true} />}
                    {title && <div className="outliner-title-text">{title}</div>}
                </div>
            </div>
            {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>
    );
};
