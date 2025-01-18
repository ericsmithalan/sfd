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
        if (params && params.modelId && context) {
            const modelOutlner = getModel(context.project, params.modelId);

            if (modelOutlner) {
                setModel(modelOutlner);
            }
        }
    }, [params, context]);
    return (
        <>
            <Panel className="model-view" title={model?.name} icon="stack">
                Model Panel
            </Panel>
            <Outlet context={{ viewport: context.viewport }} />
        </>
    );
};
