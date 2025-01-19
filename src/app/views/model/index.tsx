import { useOutletContext } from "react-router-dom";
import { Button, Panel } from "../../../components";
import { IOutlinerContext } from "../../../context";
import "./style.scss";

export const ModelView = () => {
    const { outliner } = useOutletContext<{
        outliner: IOutlinerContext;
    }>();

    return (
        <>
            <Panel contentCss="model-view" title={outliner.model?.name} icon="stack">
                <Button
                    onClick={(e) => {
                        outliner.viewport.showEdges = !outliner.viewport?.showEdges;
                    }}
                >
                    Show Edges
                </Button>
            </Panel>
        </>
    );
};
