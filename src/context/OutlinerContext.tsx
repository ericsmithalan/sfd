import { createContext, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, projectOutlinerData } from "../data";
import {
    IOutlinerModel,
    IOutlinerObject,
    IOutlinerProject,
} from "../interface";
import { IModelEvent, ISelectionEvent, Viewport } from "../lib";

export interface IOutlinerContext {
    viewport: Viewport | null;
    root: Array<IOutlinerProject>;
    project: IOutlinerProject | null;
    model: IOutlinerModel | null;
    object: IOutlinerObject | null;
    setProject: (value: IOutlinerProject | null) => void;
    setObject: (value: IOutlinerObject | null) => void;
}

export const OutlinerContext = createContext<IOutlinerContext>(
    {} as IOutlinerContext,
);

type OutlinerProviderProps = {
    children?: ReactNode;
    viewport: Viewport | null;
};

export const OutlinerProvider = ({
    children,
    viewport,
}: OutlinerProviderProps) => {
    const [root] = useState<Array<IOutlinerProject>>(projectOutlinerData);
    const [project, setProject] = useState<IOutlinerProject | null>(null);
    const [model, setModel] = useState<IOutlinerModel | null>(null);
    const [object, setObject] = useState<IOutlinerObject | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params) {
            if (params.projectId) {
                const project = getProject(params.projectId);
                setProject(project);
            }
        }
    }, [params.projectId]);

    useEffect(() => {
        const modelChanged = (e: IModelEvent["changed"]) => {
            setModel(e.outliner);
        };

        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            if (e.object) {
                setObject(e.object.userData.outliner);
            } else {
                setObject(null);
            }
        };
        if (viewport) {
            viewport.modelFile.addEventListener("changed", modelChanged);
            viewport.selection.addEventListener(
                "selectionChange",
                selectionChange,
            );
        }
        return () => {
            if (viewport) {
                viewport.modelFile.removeEventListener("changed", modelChanged);
            }
        };
    }, [viewport]);

    return (
        <OutlinerContext.Provider
            value={{
                root: root,
                project: project,
                model: model,
                object: object,
                setProject: setProject,
                setObject: setObject,
                viewport: viewport,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
