import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { rootOutliner } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
    viewport: Viewport;
    root: Array<IOutliner>;
    project: IOutliner | null;
    model: IOutliner | null;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerContextProps) => {
    const [root] = useState<Array<IOutliner>>(rootOutliner);
    const [project, setProject] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params.projectId) {
            const project = rootOutliner.find((item) => item.id === Number(params.projectId));
            setProject(project || null);
        }

        if (project && !params.projectId) {
            setProject(null);
        }
    }, [params.projectId, project]);

    useEffect(() => {
        const loadModel = async (obj: IOutliner) => {
            await viewport.loadModel(obj);
        };

        if (params.modelId && project) {
            const model = project.models?.find((item) => item.id === Number(params.modelId));

            setModel(model || null);
            if (model) {
                loadModel(model);
            }
        }

        if (model && !params.modelId) {
            setModel(null);
            viewport.model = null;
        }
    }, [model, params.modelId, project, viewport]);

    return (
        <OutlinerContext.Provider
            value={{
                viewport: viewport,
                root: root,
                project: project,
                model: model,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
