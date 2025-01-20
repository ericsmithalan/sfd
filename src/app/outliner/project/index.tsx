import { useEffect } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumb, NavLink } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { rootOutliner } from "../../../data";
import "./style.scss";

export const ProjectOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    const params = useParams();
    const crumbs = useBreadcrumbs();

    useEffect(() => {
        console.log(crumbs);
        if (params.projectId) {
            const project = rootOutliner.find((item) => item.id === Number(params.projectId));
            outliner.setProject(project || null);
        }
    }, [outliner, params.projectId, crumbs]);

    return (
        <div className="outliner-project">
            <Breadcrumb crumbs={crumbs} />
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
