import { useEffect, useState } from "react";
import { Panel, Scroller } from "../../../components";
import { OutlinerButton } from "../../../components/outliner-button";
import { IOutlinerContext } from "../../../context";
import { useModel } from "../../../hooks";
import { Viewport } from "../../../lib";
import { ISelectionEvent } from "../../../lib/Selection";
import { getObject, setObjectVisibility } from "../../../utils";
import "./style.scss";

type ViewerState = {
    visible: boolean;
};

type Props = {
    viewport: Viewport;
    loading: boolean;
    isMobile: boolean;
    outliner: IOutlinerContext;
};

export const PartsPanel = ({ viewport, loading, isMobile, outliner }: Props) => {
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
    });
    const {} = useModel();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            console.log("model", outliner.model);
        };

        if (viewport && viewport.selection) {
            viewport.selection.addEventListener("change", selectionChange);
        }

        return () => {
            if (viewport && viewport.selection) {
                viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [outliner.model, viewport]);

    return outliner.model && !isMobile ? (
        <Panel title={`${outliner.model.name} Parts`} className="parts-panel" icon="stack">
            <Scroller
                className="parts-scroller"
                scrollTo={outliner.model.id ? `obj_${outliner.model.id}` : undefined}
            >
                {outliner.model?.children?.map((item, i) => {
                    return (
                        <OutlinerButton
                            icon="blender"
                            id={`obj_${item.id}`}
                            key={i}
                            active={outliner.model?.id === item.id}
                            text={item.name}
                            onVisible={(visible, e) => {
                                setObjectVisibility(viewport, item.id, visible);
                            }}
                            onClick={(e) => {
                                const mod = getObject(viewport, item.id, true);
                            }}
                        />
                    );
                })}
            </Scroller>
        </Panel>
    ) : null;
};
