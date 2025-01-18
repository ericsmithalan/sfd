import { Params, useOutletContext } from "react-router-dom";
import { Object3D } from "three";
import { Panel } from "../../../components";
import { Viewport } from "../../../lib";
import "./style.scss";

export const ObjectView = () => {
    const context = useOutletContext<{
        viewport: Viewport;
        object: Object3D | null;
        params: Params<string>;
    }>();

    // useEffect(() => {
    //     if (params.objectId && context.viewport) {
    //         const object = getObject(
    //             context.viewport,
    //             Number(params.objectId),
    //             true,
    //         );
    //     }
    // }, [params.objectId, context.viewport]);
    return (
        <Panel className="object-view" title={context.object?.name} icon="box">
            object view
        </Panel>
    );
};
