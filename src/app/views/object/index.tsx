import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutlinerObject, IViewContext } from "../../../interface";
import { getObject } from "../../../utils";
import "./style.scss";

export const ObjectView = () => {
    const [object, setObject] = useState<IOutlinerObject>();
    const context = useOutletContext<IViewContext>();

    useEffect(() => {
        if (context.params) {
            if (context.params.objectId) {
                const obj = getObject(context.viewport, Number(context.params.objectId));

                if (obj) {
                    setObject(obj);
                }
            }
        }
    }, [context.params, context.viewport]);

    return <div className="object-view">object view</div>;
};
