import { Outlet, useOutletContext } from "react-router-dom";
import { Panel } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelView = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    return (
        <>
            <Panel contentCss="model-view" title={outliner.model?.name} icon="stack">
                Model Panel
            </Panel>
            <Outlet
                context={{
                    outliner: outliner,
                }}
            />
        </>
    );
};
