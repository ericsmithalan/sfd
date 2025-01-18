import { Object3D } from "three";
import { Viewport } from "../lib";
import { getObject } from "./getObject";

export const setObjectVisibility = (
    viewport: Viewport | null,
    obj: number | Object3D,
    visible: boolean,
): Object3D | null => {
    if (viewport) {
        let object = getObject(viewport, obj, false);

        if (object) {
            object.visible = visible;
        }

        return object;
    }
    return null;
};
