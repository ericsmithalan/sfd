import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { projectOutlinerData } from "../../../data/outliner";
import { IOutlinerProject, IViewContext } from "../../../interface";
import "./style.scss";

export const ProjectView = () => {
    const [project, setProject] = useState<IOutlinerProject>();
    const context = useOutletContext<IViewContext>();

    useEffect(() => {
        if (context.params) {
            if (context.params.projectId) {
                const project = projectOutlinerData.find(
                    (item) => item.id === context.params.projectId,
                );

                if (project) {
                    setProject(project);
                }
            }
        }
    }, [context.params]);

    return (
        <div className="project">
            <Outlet context={{ ...context, projectOutliner: project }} />
        </div>
    );
};
