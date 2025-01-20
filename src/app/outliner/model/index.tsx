import { Params, useOutletContext } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumb } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelOutliner = () => {
    const { params, outliner } = useOutletContext<{
        params: Params<string>;

        outliner: IOutlinerContext;
    }>();
    const crumbs = useBreadcrumbs();

    console.log(crumbs);

    return (
        <div className="outliner-model">
            <Breadcrumb crumbs={crumbs} />
            Model Outliner
        </div>
    );
};
