import clsx from "clsx";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import { Panel, Stats } from "../../../components";
import { useOutliner } from "../../../hooks";
import { ISelectionEvent } from "../../../lib/Selection";
import { convertToBordFeet, getObjectDimensions } from "../../../utils";
import "./style.scss";

export const ObjectPanel = () => {
    const [object, setObject] = useState<Object3D | null>(null);
    const [size, setSize] = useState<Vector3>(new Vector3());
    const outliner = useOutliner();

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["change"]) => {
            if (e.object) {
                const objSize = getObjectDimensions(outliner.viewport, e.object);
                if (objSize) {
                    setSize(objSize);
                }
                console.log(e.object);
            }

            setObject(e.object);
        };
        if (outliner.model) {
            outliner.viewport.selection.addEventListener("change", selectionChange);
        } else {
            setObject(null);
            setSize(new Vector3());
        }

        return () => {
            outliner.viewport.selection.removeEventListener("change", selectionChange);
        };
    }, [outliner.model, outliner.viewport]);

    return object ? (
        <Panel
            title={object.name}
            className={clsx(outliner.isMobile && "mobile")}
            icon="box-1"
            contentCss="object-panel"
            opened={!outliner.isMobile}
        >
            <Stats
                stats={[
                    {
                        name: "Width",
                        value: String(size.x),
                        unit: "in",
                    },
                    {
                        name: "Length",
                        value: String(size.y),
                        unit: "in",
                    },
                    {
                        name: "Thickness",
                        value: String(size.z),
                        unit: "in",
                    },
                    {
                        name: "Board Ft",
                        value: String(convertToBordFeet(size)),
                        unit: "bf",
                    },
                ]}
            />
        </Panel>
    ) : null;
};
