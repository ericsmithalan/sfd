import { Config } from "@/Config";
import { IModelOutliner, IObjectOutliner, IRootOutliner } from "@/interface";
import { ISelectionEvent, ObjectUserData, Viewport } from "@/lib";
import { getObject } from "@/utils";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface IOutlinerContext {
    rootOutliner: Array<IRootOutliner>;
    model: IModelOutliner | null;
    project: IRootOutliner | null;
    setProject: (project: IRootOutliner | null) => void;
    setModel: (model: IModelOutliner | null) => Promise<void>;
    object: IObjectOutliner | null;
}

export const OutlinerContext = createContext<IOutlinerContext>(
    {} as IOutlinerContext
);

type OutlinerProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export const OutlinerProvider = ({
    children,
    viewport,
}: OutlinerProviderProps) => {
    const [rootOutline] = useState<Array<IRootOutliner>>(Config.rootOutliner);
    const [project, setProject] = useState<IRootOutliner | null>(null);
    const [model, setModel] = useState<IModelOutliner | null>(null);
    const [object, setObject] = useState<IObjectOutliner | null>(null);
    const params = useParams();
    const navigate = useNavigate();

    const handleSetModel = async (model: IModelOutliner | null) => {
        if (model) {
            const modelObj = await viewport.modelFile.load(model);
            if (
                modelObj.userData &&
                modelObj.userData instanceof ObjectUserData
            ) {
                setModel(modelObj.userData.outliner);
            }
        } else {
            viewport.clear();
        }
    };

    useEffect(() => {
        const load = async () => {
            if (params && params.projectId) {
                const project = Config.rootOutliner.find(
                    (item) => item.id === params.projectId
                );

                if (project) {
                    setProject(project);

                    if (params.modelId) {
                        const model = project.models.find(
                            (item) => item.id === params.modelId
                        );

                        if (model) {
                            await handleSetModel(model);

                            if (params.objectId) {
                                const obj = getObject(
                                    viewport,
                                    Number(params.id),
                                    true
                                );

                                if (obj) {
                                    if (
                                        obj.userData instanceof ObjectUserData
                                    ) {
                                        setObject(obj.userData.outliner);
                                    }
                                }
                            }
                        }
                    } else {
                        setModel(null);
                        setObject(null);
                    }
                } else {
                    setProject(null);
                    setModel(null);
                    setObject(null);
                }
            }
        };

        viewport.clear();
        load();
    }, [params]);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            if (e.object) {
                if (e.object.userData instanceof ObjectUserData) {
                    setObject(e.object.userData.outliner);

                    if (project && model) {
                        navigate(`/${project.id}/${model.id}/${e.object.id}`);
                    }
                }
            } else {
                setObject(null);
            }
        };

        if (viewport) {
            viewport.selection.addEventListener(
                "selectionChange",
                selectionChange
            );
        }

        return () => {
            viewport.selection.removeEventListener(
                "selectionChange",
                selectionChange
            );
        };
    }, [viewport]);

    return (
        <OutlinerContext.Provider
            value={{
                rootOutliner: rootOutline,
                setModel: handleSetModel,
                project: project,
                setProject: setProject,
                model: model,
                object: object,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
