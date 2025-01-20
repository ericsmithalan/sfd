import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import { Icon } from "../icon";
import "./style.scss";

type BreadcrumbProps = {
    crumbs: BreadcrumbData[];
};

export const Breadcrumb = ({ crumbs }: BreadcrumbProps) => {
    return (
        <div className="breadcrumbs">
            {crumbs.map(({ match, breadcrumb }, i) => (
                <Fragment key={i}>
                    <div className="crumb">
                        {breadcrumb ? (
                            <Link to={match.pathname}>{breadcrumb}</Link>
                        ) : (
                            <div className="selected">{breadcrumb}</div>
                        )}
                    </div>

                    {i < crumbs.length - 1 && <Icon name="arrow-drop-right" />}
                </Fragment>
            ))}
        </div>
    );
};
