import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Config } from "../../Config";
import { IProjectOutliner } from "../../lib";
import "./style.scss";

export const ProjectView = () => {
    const [project, setProject] = useState<IProjectOutliner>();
    const params = useParams();

    useEffect(() => {
        if (params) {
            if (params.projectId) {
                const project = Config.rootOutliner.find(
                    (item) => item.id === params.projectId
                );

                if (project) {
                    setProject(project);
                }
            }
        }
    }, [params]);
    return (
        <div className="project">
            <Outlet context={project} />
        </div>
    );
};
