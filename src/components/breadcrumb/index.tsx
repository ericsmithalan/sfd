import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { outlinerNameMapper } from "../../data";
import { Icon } from "../icon";
import "./style.scss";

type BreadcrumbProps = {
    crumbs: BreadcrumbData[];
};

export const Breadcrumb = ({ crumbs }: BreadcrumbProps) => {
    return (
        <div className="breadcrumbs">
            {crumbs.map(({ match, breadcrumb }, i) => {
                const name = outlinerNameMapper[Number(breadcrumb)];

                return (
                    <Fragment key={i}>
                        <div className="crumb">
                            <Link to={match.pathname}>{breadcrumb}</Link>
                        </div>

                        {i < crumbs.length - 1 && <Icon name="arrow-drop-right" />}
                    </Fragment>
                );
            })}
        </div>
    );
};
