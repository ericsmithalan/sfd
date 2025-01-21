import { Outlet, useOutletContext } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink, OutlinerTitle } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ProjectOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();
    const crumbs = useBreadcrumbs();

    return (
        <div className="outliner-project">
            <OutlinerTitle
                crumbs={crumbs}
                title={outliner.project?.name}
                subTitle="Models"
                iconName="sofa"
            />
            {outliner.project?.children?.map((item, i) => {
                return (
                    <NavLink
                        variant="outliner"
                        key={i}
                        href={String(item.id)}
                        icon="blender"
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
