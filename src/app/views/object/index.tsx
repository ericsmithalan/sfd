import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Object3D } from "three";
import { Panel } from "../../../components";
import { Viewport } from "../../../lib";
import { getObject } from "../../../utils";
import "./style.scss";

export const ObjectView = () => {
    const context = useOutletContext<{ viewport: Viewport }>();
    const [object, setObject] = useState<Object3D | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params.objectId && context.viewport) {
            const object = getObject(
                context.viewport,
                Number(params.objectId),
                true,
            );

            setObject(object);
        }
    }, [params.objectId, context.viewport]);
    return (
        <Panel className="object-view" title={object?.name} icon="box">
            object view
        </Panel>
    );
};
