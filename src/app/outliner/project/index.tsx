import { Outlet, useOutletContext } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumb, NavLink } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ProjectOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    const crumbs = useBreadcrumbs();

    return (
        <div className="outliner-project">
            <Breadcrumb crumbs={crumbs} />
            <div className="title">{outliner.project?.name}</div>
            {outliner.project?.models?.map((item, i) => {
                return (
                    <NavLink
                        variant="outliner"
                        key={i}
                        href={String(item.id)}
                        icon="folder"
                        text={item.name}
                    />
                );
            })}
            <Outlet
                context={{
                    outliner: outliner,
                }}
            />
        </div>
    );
};
