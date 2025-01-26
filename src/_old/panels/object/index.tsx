import clsx from "clsx";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import { Panel, Stats } from "../../../components";
import { useOutliner } from "../../../hooks";
import { ISelectionEvent } from "../../../lib/Selection";
import { convertToBordFeet, getObjectDimensions } from "../../../utils";
import "./style.scss";

type State = {
    object: Object3D;
    size: Vector3;
};

export const ObjectPanel = () => {
    const [state, setState] = useState<State | null>(null);
    const outliner = useOutliner();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            if (e.object) {
                const objSize = getObjectDimensions(outliner.viewport, e.object);
                if (objSize) {
                    setState({
                        object: e.object,
                        size: objSize,
                    });
                }
            } else {
                setState(null);
            }
        };

        if (outliner.model && outliner.viewport.selection) {
            outliner.viewport.selection.addEventListener("change", selectionChange);
        } else {
            setState(null);
        }

        return () => {
            if (outliner.viewport.selection) {
                outliner.viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [outliner.model, outliner.viewport]);

    return outliner.model && state ? (
        <Panel
            title={state.object.name}
            className={clsx(outliner.isMobile && "mobile")}
            icon="box-1"
            contentCss="object-panel"
            opened={!outliner.isMobile}
        >
            <Stats
                stats={[
                    {
                        name: "Width",
                        value: String(state.size.x),
                        unit: "in",
                    },
                    {
                        name: "Length",
                        value: String(state.size.y),
                        unit: "in",
                    },
                    {
                        name: "Thickness",
                        value: String(state.size.z),
                        unit: "in",
                    },
                    {
                        name: "Board Ft",
                        value: String(convertToBordFeet(state.size)),
                        unit: "bf",
                    },
                ]}
            />
        </Panel>
    ) : null;
};
