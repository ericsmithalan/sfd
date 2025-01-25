import { Object3D } from "three";
import { Viewport } from "../lib";

export const getObjectsById = (
    viewport: Viewport,
    ids: Array<number>,
    callback: (obj: Object3D) => void,
): void => {
    for (const id of ids) {
        const obj = viewport.world.scene.getObjectById(id);
        if (obj) {
            callback(obj);
        }
    }
};
