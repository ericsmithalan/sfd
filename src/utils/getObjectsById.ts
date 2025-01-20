import { Object3D } from "three";
import { Viewport } from "../lib";

export const getObjectsById = (viewport: Viewport, ids: Array<number>): Array<Object3D> => {
    let objects = [];

    for (const id of ids) {
        const obj = viewport.scene.getObjectById(id);
        if (obj) {
            objects.push(obj);
        }
    }

    return objects;
};
