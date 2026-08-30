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
            object.visible = visible;

            if (viewport.selection?.object?.id === object.id) {
                viewport.selection.object = null;
            }

            if (visible) {
                edge?.layers.set(0);
                object?.layers.set(0);
            } else {
                edge?.layers.set(1);
                object?.layers.set(1);
            }
        }

        return object;
    }
    return null;
};
