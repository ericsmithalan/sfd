import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { IOutlinerModel, IViewContext } from "../../../interface";
import "./style.scss";

export const ModelView = () => {
    const [model, setModel] = useState<IOutlinerModel>();
    const context = useOutletContext<IViewContext>();

    useEffect(() => {
        if (context.params) {
            if (context.params.modelId) {
                const model = context.projectOutliner?.models.find(
                    (item) => item.id === context.params.modelId,
                );

                if (model) {
                    setModel(model);
                }
            }
        }
    }, [context.projectOutliner, context.params]);

    return (
        <div className="model-view">
            <Outlet context={{ ...context, modelOutliner: model }} />
        </div>
    );
};
