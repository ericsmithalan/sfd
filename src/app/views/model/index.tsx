import { useEffect, useState } from "react";
import {
    Outlet,
    Params,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import { Object3D } from "three";
import { Panel } from "../../../components";
import { getModel } from "../../../data";
import { IOutlinerModel, IOutlinerProject } from "../../../interface";
import { ISelectionEvent, Viewport } from "../../../lib";
import "./style.scss";

export const ModelView = () => {
    const context = useOutletContext<{
        project: IOutlinerProject;
        viewport: Viewport;
        params: Params<string>;
    }>();
    const [object, setObject] = useState<Object3D | null>(null);
    const [model, setModel] = useState<IOutlinerModel | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const laodModel = async (modelOutliner: IOutlinerModel) => {
            if (modelOutliner.id !== model?.id) {
                const loadedModel = await context.viewport.modelFile.load(
                    modelOutliner,
                );

                if (loadedModel) {
                    setModel(loadedModel.userData.outliner);
                }
            }
        };

        if (context.params && context.params.modelId && context.project) {
            const modelOutlner = getModel(
                context.project,
                context.params.modelId,
            );

            if (modelOutlner) {
                laodModel(modelOutlner);
            }
        }
    }, [context.params.modelId, context.viewport]);

    useEffect(() => {
        const objectChange = (e: ISelectionEvent["selectionChange"]) => {
            const objectId = context.params.objectId;

            if (objectId && e.object && Number(objectId) !== e.object.id) {
                navigate(`./${e.object.id}`);
                setObject(e.object);
            } else {
                if (!objectId) {
                    if (e.object) {
                        navigate(`${e.object.id}`);
                    }
                }

                if (!e.object) {
                    if (objectId) {
                        navigate(".");
                    }
                }
            }
        };

        if (context.viewport) {
            context.viewport.selection.addEventListener(
                "selectionChange",
                objectChange,
            );
        }

        return () => {
            if (context.viewport) {
                context.viewport.selection.removeEventListener(
                    "selectionChange",
                    objectChange,
                );
            }
        };
    }, [context.viewport, context.params.objectId]);

    return (
        <>
            <Panel className="model-view" title={model?.name} icon="stack">
                Model Panel
            </Panel>
            <Outlet
                context={{
                    viewport: context.viewport,
                    object: object,
                    params: context.params,
                }}
            />
        </>
    );
};
