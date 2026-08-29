import { useEffect, useState } from "react";
import { Object3D } from "three";
import { Panel, Scroller } from "../../../components";
import { OutlinerButton } from "../../../components/outliner-button";
import { IOutlinerContext } from "../../../context";
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
    const [object, setObject] = useState<Object3D | null>(null);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            setObject(e.object);
        };

        if (viewport && viewport.selection) {
            viewport.selection.addEventListener("change", selectionChange);
        }

        return () => {
            if (viewport && viewport.selection) {
                viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [outliner.model, viewport, object, setObject]);

    return outliner.model ? (
        <Panel title={`${outliner.model.name} Parts`} className="parts-panel" icon="stack">
            <Scroller className="parts-scroller" scrollTo={object ? `obj_${object.id}` : undefined}>
                {outliner.model?.children?.map((item, i) => {
                    return (
                        <OutlinerButton
                            icon="blender"
                            id={`obj_${item.id}`}
                            key={i}
                            active={object?.id === item.id}
                            text={item.name}
                            onVisible={(visible, e) => {
                                setObjectVisibility(viewport, item.id, visible);
                            }}
                            onClick={(e) => {
                                const mod = getObject(viewport, item.id, true);
                                setObject(mod || null);
                            }}
                        />
                    );
                })}
            </Scroller>
        </Panel>
    ) : (
        <div>oops</div>
    );
};
