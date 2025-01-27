import clsx from "clsx";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import { Panel, Stats } from "../../../components";
import { useOutliner } from "../../../hooks";
import { Viewport } from "../../../lib";
import { ISelectionEvent } from "../../../lib/Selection";
import { convertToBordFeet, getObjectDimensions } from "../../../utils";
import "./style.scss";

type State = {
    object: Object3D;
    size: Vector3;
};

type Props = {
    viewport: Viewport;
    loading: boolean;
    isMobile: boolean;
};

export const ObjectPanel = ({ viewport, loading, isMobile }: Props) => {
    const [state, setState] = useState<State | null>(null);
    const outliner = useOutliner();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            if (e.object) {
                const objSize = getObjectDimensions(viewport, e.object);
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

        if (outliner.model && viewport.selection) {
            viewport.selection.addEventListener("change", selectionChange);
        } else {
            setState(null);
        }

        return () => {
            if (viewport.selection) {
                viewport.selection.removeEventListener("change", selectionChange);
            }
        };
    }, [outliner.model, viewport]);

    return outliner.model && state ? (
        <Panel
            title={state.object.name}
            className={clsx(isMobile && "mobile")}
            icon="box-1"
            contentCss="object-panel"
            opened={!isMobile}
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
