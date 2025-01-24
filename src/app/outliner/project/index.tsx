import clsx from "clsx";
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
        <div className={clsx("outliner-project", outliner.isMobile && "mobile")}>
            <OutlinerTitle
                isMobile={outliner.isMobile}
                className={clsx(outliner.isMobile && "mobile")}
                crumbs={crumbs}
                title={outliner.project?.name}
                subTitle="Models"
                iconName="sofa"
            />

            <div className="outliner-content">
                {outliner.project?.children?.map((item, i) => {
                    return item.group ? (
                        <div key={i} className="outliner-group">
                            {item.name}
                        </div>
                    ) : (
                        <NavLink
                            variant="outliner"
                            key={i}
                            href={String(item.id)}
                            icon="blender"
                            text={item.name}
                        />
                    );
                })}
            </div>
            <Outlet
                context={{
                    outliner: outliner,
                }}
            />
        </div>
    );
};
