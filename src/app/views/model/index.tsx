import { Outlet, useOutletContext } from "react-router-dom";
import { Panel } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import "./style.scss";

export const ModelView = () => {
    const { outliner, viewport } = useOutletContext<{
        outliner: IOutlinerContext;
        viewport: Viewport;
    }>();

    return (
        <>
            <Panel
                className="model-view"
                title={outliner.model?.name}
                icon="stack"
            >
                Model Panel
            </Panel>
            <Outlet
                context={{
                    viewport: viewport,
                    outliner: outliner,
                }}
            />
        </>
    );
};
