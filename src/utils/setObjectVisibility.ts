import { Object3D } from "three";
import { Viewport } from "../lib";

import { getEdge } from "./getEdge";
import { getObject } from "./getObject";

export const setObjectVisibility = (
    viewport: Viewport | null,
    obj: number | Object3D,
    visible: boolean,
): Object3D | null => {
    if (viewport) {
        let object = getObject(viewport, obj, false);

        if (object) {
            let edge = getEdge(viewport, object.id);
            if (edge) {
                edge.visible = visible;
            }

            if (viewport.selection.object?.id === object.id) {
                viewport.selection.object = null;
            }

            object.visible = visible;
        }

        return object;
    }
    return null;
};
