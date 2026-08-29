import { useEffect, useState } from "react";
import { Object3D } from "three";
import { Panel, Scroller } from "../../../components";
import { OutlinerButton } from "../../../components/outliner-button";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import { ISelectionEvent } from "../../../lib/Selection";
import { getObject, setObjectVisibility } from "../../../utils";
import "./style.scss";

type Props = {
    viewport: Viewport;
    loading: boolean;
    isMobile: boolean;
    outliner: IOutlinerContext;
};

export const PartsPanel = ({ viewport, loading, isMobile, outliner }: Props) => {
    const [obj, setObj] = useState<Object3D | null>(null);
    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            setObj(e.object);
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
                scrollTo={outliner.model.id ? `obj_${obj?.id}` : undefined}
            >
                {outliner.model?.children?.map((item, i) => {
                    return (
                        <OutlinerButton
                            icon="blender"
                            id={`obj_${item.id}`}
                            key={i}
                            active={obj?.id === item.id}
                            text={item.name}
                            onVisible={(visible, e) => {
                                setObjectVisibility(viewport, item.id, visible);
                            }}
                            onClick={(e) => {
                                const mod = getObject(viewport, item.id, true);
                                setObj(mod);
                            }}
                        />
                    );
                })}
            </Scroller>
        </Panel>
    ) : null;
};
