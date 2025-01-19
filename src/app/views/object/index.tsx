import { useOutletContext } from "react-router-dom";
import { Panel } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import "./style.scss";

export const ObjectView = () => {
    const { outliner, viewport } = useOutletContext<{
        viewport: Viewport;
        outliner: IOutlinerContext;
    }>();

    return (
        <Panel className="object-view" title={outliner.object?.name} icon="box">
            object view
        </Panel>
    );
};
