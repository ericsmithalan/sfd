import { createContext, ReactNode, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components";
import { getModel, getProject, projectOutlinerData } from "../data";
import { IOutlinerModel, IOutlinerObject, IOutlinerProject } from "../interface";
import { ISelectionEvent, Viewport } from "../lib";
import { getObject } from "../utils";

export interface IOutlinerContext {
    viewport: Viewport;
    root: Array<IOutlinerProject>;
    project: IOutlinerProject | null;
    model: IOutlinerModel | null;
    object: IOutlinerObject | null;
    params: Params<string>;
    navigate: NavigateFunction;
    setModel: (value: IOutlinerModel | null) => void;
    setProject: (value: IOutlinerProject | null) => void;
    setObject: (value: IOutlinerObject | null) => void;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerProviderProps) => {
    const [root] = useState<Array<IOutlinerProject>>(projectOutlinerData);
    const [project, setProject] = useState<IOutlinerProject | null>(null);
    const [model, setModel] = useState<IOutlinerModel | null>(null);
    const [object, setObject] = useState<IOutlinerObject | null>(null);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const handleSetModel = async (outliner: IOutlinerModel | null) => {
        if (viewport && outliner && outliner.id !== model?.id) {
            setLoading(true);
            const m = await viewport?.modelFile.load(outliner);
            setModel(m?.userData.outliner || null);
            setLoading(false);
        }
    };

    useEffect(() => {
        let p: IOutlinerProject | null = null;
        let m: IOutlinerModel | null = null;
        const { projectId, modelId, objectId } = params;

        if (projectId && project?.id !== projectId) {
            p = getProject(projectId);
            setProject(p);
        }

        if (modelId && model?.id !== modelId && p) {
            m = getModel(p, modelId);
            handleSetModel(m);
        } else {
            if (!modelId) {
                setModel(null);
                viewport.modelFile.model = null;
            }
        }

        if (objectId && object?.id !== Number(objectId) && m) {
            const obj = getObject(viewport, Number(params.id), true);
            setObject(obj?.userData.outliner);
        } else {
            if (!objectId) {
                if (object) {
                    viewport.selection.object = null;
                }

                setObject(null);
            }
        }
    }, [params.projectId, params.modelId, params.objectId]);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            setObject(e.object?.userData.outliner || null);
        };

        if (viewport) {
            viewport.selection.addEventListener("selectionChange", selectionChange);
        }
        return () => {
            if (viewport) {
                console.log("outliner dispose");
                viewport.selection.removeEventListener("selectionChange", selectionChange);
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
                params: params,
                navigate: navigate,
                setProject: setProject,
                setObject: setObject,
                setModel: handleSetModel,
                viewport: viewport,
            }}
        >
            {loading && <Loading message="loading model..." />}
            {children}
        </OutlinerContext.Provider>
    );
};
