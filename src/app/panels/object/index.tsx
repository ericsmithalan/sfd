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
                <div className="col-1">WIDTH</div>
                <div className="col-2">
                    {size.x} <span className="unit">in</span>
                </div>
                <div className="col-1">LENGTH</div>
                <div className="col-2">
                    {size.y} <span className="unit">in</span>
                </div>
                <div className="col-1">THICKNESS</div>
                <div className="col-2">
                    {size.z} <span className="unit">in</span>
                </div>
                <div className="col-1">BF</div>
                <div className="col-2">
                    {convertToBordFeet(size)} <span className="unit">bf</span>
                </div>
            </div>
        </Panel>
    ) : null;
};
