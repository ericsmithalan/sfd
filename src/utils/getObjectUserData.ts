import { Object3D } from "three";
import { ObjectUserData, Viewport } from "../lib";
import { getObject } from "./getObject";

export const getObjectUserData = (
    viewport: Viewport,
    obj?: number | Object3D,
): ObjectUserData | null => {
    if (obj) {
        const object = getObject(viewport, obj, false);
        if (object && object.userData instanceof ObjectUserData) {
            return object.userData;
        }
    }

    return null;
};
