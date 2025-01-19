import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components";
import { getModel, getProject, projectOutlinerData } from "../data";
import {
    IOutlinerModel,
    IOutlinerObject,
    IOutlinerProject,
} from "../interface";
import { ISelectionEvent, Viewport } from "../lib";
import { getObject } from "../utils";

export interface IOutlinerContext {
    viewport: Viewport | null;
    root: Array<IOutlinerProject>;
    project: IOutlinerProject | null;
    model: IOutlinerModel | null;
    object: IOutlinerObject | null;
    setModel: (value: IOutlinerModel | null) => void;
    setProject: (value: IOutlinerProject | null) => void;
    setObject: (value: IOutlinerObject | null) => void;
}

export const OutlinerContext = createContext<IOutlinerContext>(
    {} as IOutlinerContext,
);

type OutlinerProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export const OutlinerProvider = ({
    children,
    viewport,
}: OutlinerProviderProps) => {
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

        if (params.projectId && project?.id !== params.projectId) {
            p = getProject(params.projectId);
            setProject(p);
        }

        if (params.modelId && model?.id !== params.modelId && p) {
            m = getModel(p, params.modelId);
            handleSetModel(m);
        } else {
            if (!params.modelId) {
                setModel(null);
            }
        }

        if (params.objectId && object?.id !== Number(params.objectId) && m) {
            const obj = getObject(viewport, Number(params.id), true);
            setObject(obj?.userData.outliner);
        }
    }, [params.projectId, params.modelId, params.objectId]);

    useEffect(() => {
        if (object) {
            if (object.id !== Number(params.objectId))
                navigate(`/${project?.id}/${model?.id}/${object.id}`);
        } else {
            if (params.objectId) {
                navigate(`/${project?.id}/${model?.id}`);
            }
        }
    }, [object, params.objectId]);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            setObject(e.object?.userData.outliner || null);
        };

        if (viewport) {
            viewport.selection.addEventListener(
                "selectionChange",
                selectionChange,
            );
        }
        return () => {
            if (viewport) {
                console.log("outliner dispose");
                viewport.selection.removeEventListener(
                    "selectionChange",
                    selectionChange,
                );
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
                setModel: handleSetModel,
                viewport: viewport,
            }}
        >
            {loading && <Loading message="loading" />}
            {children}
        </OutlinerContext.Provider>
    );
};
