import { Object3D } from "three";
import { Viewport } from "../lib";

export const getObject = <T extends Object3D>(
    viewport: Viewport,
    obj?: number | T,
    select: boolean = true
): T | null => {
    let object = obj;

    if (typeof obj === "number") {
        object = viewport.scene.getObjectById(obj) as T;
    }

    if (object && select) {
        viewport.selection.object = object as T;
    }

    return object as T;
};
