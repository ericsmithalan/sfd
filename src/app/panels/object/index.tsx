import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import { Panel } from "../../../components";
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
            }
            console.log(e.object?.up);

            setObject(e.object);
        };
        outliner.viewport.selection.addEventListener("change", selectionChange);

        return () => {
            outliner.viewport.selection.removeEventListener("change", selectionChange);
        };
    }, [outliner.viewport]);

    return object ? (
        <Panel title={object.name} icon="box-1" contentCss="object-panel">
            <div className="stats">
                <div>WIDTH</div>
                <div>{size.x} in</div>
                <div>LENGTH</div>
                <div>{size.y} in</div>
                <div>THICKNESS</div>
                <div>{size.z} in</div>
                <div>BF</div>
                <div>{convertToBordFeet(size)}</div>
            </div>
        </Panel>
    ) : null;
};
