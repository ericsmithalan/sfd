import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
    viewport: Viewport;
    categories: Array<IOutliner>;
    category: IOutliner | null;
    project: IOutliner | null;
    model: IOutliner | null;
    isMobile: boolean;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
    isMobile: boolean;
};

export const OutlinerProvider = ({ children, viewport, isMobile }: OutlinerContextProps) => {
    const [categories] = useState<Array<IOutliner>>(DATA.rootOutliner);
    const [category, setCategory] = useState<IOutliner | null>(null);
    const [project, setProject] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params.categoryId) {
            const item = categories.find((item) => item.id === Number(params.categoryId));
            setCategory(item || null);
        }
        if (category && !params.categoryId) {
            setCategory(null);
        }
    }, [categories, category, params.categoryId]);

    useEffect(() => {
        if (category && params.projectId) {
            const project = category.children?.find((item) => item.id === Number(params.projectId));
            setProject(project || null);
        }

        if (project && !params.projectId) {
            setProject(null);
        }
    }, [params.projectId, project, category]);

    useEffect(() => {
        const loadModel = async (obj: IOutliner) => {
            await viewport.loadModel(obj);
        };

        if (params.modelId && project) {
            const model = project.children?.find((item) => item.id === Number(params.modelId));

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
                categories: categories,
                project: project,
                model: model,
                isMobile: isMobile,
                category: category,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
