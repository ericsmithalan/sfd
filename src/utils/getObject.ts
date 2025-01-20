import { Object3D } from "three";
import { Viewport } from "../lib";

export const getObject = <T extends Object3D>(
    viewport: Viewport,
    obj?: number | T,
    select: boolean = false,
): T | null => {
    let object = null;

    if (typeof obj === "number") {
        object = viewport.scene.getObjectById(obj);
    }

    return (object as T) || null;
};
