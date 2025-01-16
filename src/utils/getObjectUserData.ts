import { IObjectUserData, ObjectUserData, UserData, Viewport } from "@/lib";
import { getObject } from "./getObject";
import { Object3D } from "three";

export const isUserDataType = <T extends UserData>(
    obj: Record<string, any>
): obj is T => {
    if (obj["models"]) {
        return true;
    } else if (obj["url"]) {
        return true;
    } else {
        if (obj["icon"]) {
            return true;
        }
    }
    return false;
};

export const getObjectUserData = <T extends UserData>(
    viewport: Viewport,
    obj?: number | Object3D
): T | null => {
    if (obj) {
        const object = getObject(viewport, obj, false);
        if (object && object.userData instanceof ObjectUserData) {
            if (isUserDataType<T>(object.userData)) {
                return object.userData;
            }
        }
    }

    return null;
};
