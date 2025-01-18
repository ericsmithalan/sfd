import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Panel } from "../../../components";
import { getModel } from "../../../data";
import { IOutlinerModel, IOutlinerProject } from "../../../interface";
import { Viewport } from "../../../lib";
import "./style.scss";

export const ModelView = () => {
    const context = useOutletContext<{
        project: IOutlinerProject;
        viewport: Viewport;
    }>();
    const [model, setModel] = useState<IOutlinerModel | null>(null);
    const params = useParams();

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

        if (params && params.modelId && context.project) {
            const modelOutlner = getModel(context.project, params.modelId);

            if (modelOutlner) {
                laodModel(modelOutlner);
            }
        }
    }, [params, context.viewport]);
    return (
        <>
            <Outlet context={context} />
            <Panel className="model-view" title={model?.name} icon="stack">
                Model Panel
            </Panel>
        </>
    );
};
