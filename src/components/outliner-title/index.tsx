import { MouseEvent } from "react";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { IconName } from "../../types";
import { Breadcrumb } from "../breadcrumb";
import { Button } from "../button";
import { Icon } from "../icon";
import "./style.scss";

type OutlinerTitleProps = {
    title?: string;

    crumbs?: BreadcrumbData[];
    iconName?: IconName;
    onBack?: (e: MouseEvent) => void;
};

export const OutlinerTitle = ({ title, iconName, crumbs, onBack }: OutlinerTitleProps) => {
    return (
        <div className="outliner-title">
            {crumbs && <Breadcrumb crumbs={crumbs} />}
            <div className="title-content">
                <Button
                    onClick={(e) => {
                        if (onBack) {
                            onBack(e);
                        }
                    }}
                    icon="arrow-left-long"
                    variant="back"
                ></Button>
                {iconName && <Icon name={iconName} />}
                {title && <div className="outliner-title-text">{title}</div>}
            </div>
        </div>
    );
};
