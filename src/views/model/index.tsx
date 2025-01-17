import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { IModelOutliner } from "../../lib";
import "./style.scss";

export const ModelView = () => {
    const [modelOutliner, setModelOutliner] = useState<IModelOutliner | null>(null);

    const params = useParams();

    // useEffect(() => {
    //     if (params) {
    //         if (params.modelId) {
    //             const model = context.models.find((item) => item.id === params.modelId);
    //             if (model) {
    //                 setModelOutliner(model);
    //             }
    //         }
    //     }
    // }, [params, context]);
    return (
        <div className="model-view">
            Model view <Outlet />
        </div>
    );
};
