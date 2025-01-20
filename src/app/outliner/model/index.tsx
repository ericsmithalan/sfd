import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumb } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelOutliner = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    const params = useParams();

    useEffect(() => {
        if (params.modelId) {
            if (outliner.project) {
                const model = outliner.project.models?.find(
                    (item) => item.id === Number(params.modelId),
                );

                outliner.setModel(model || null);
            }
        }
    }, [outliner, outliner.project, params]);

    const crumbs = useBreadcrumbs();

    return (
        <div className="outliner-model">
            <Breadcrumb crumbs={crumbs} />
            Model Outliner
        </div>
    );
};
