import { Box3, Group, Mesh, Object3D, Vector3 } from "three";

import { Viewport } from "../lib";
import { getObject } from "./getObject";
import { convertMeterToInch, convertMeterToInchRaw } from "./unitConversions";

export const getObjectDimensions = (
    viewport: Viewport,
    obj: number | Object3D,
    raw: boolean = false,
): Vector3 | null => {
    if (obj) {
        const object = getObject(viewport, obj);

        if (object && object instanceof Group) {
            const box = new Box3().setFromObject(object);
            const size = box.getSize(new Vector3());

            let converted;

            if (raw) {
                converted = convertMeterToInchRaw(size);
            } else {
                converted = convertMeterToInch(size);
            }

            return new Vector3(converted.x, converted.y, converted.z);
        }

        if (object && object instanceof Mesh) {
            let sizeX = object.geometry.parameters?.width;
            let sizeY = object.geometry.parameters?.depth;
            let sizeZ = object.geometry.parameters?.height;

            if (sizeX && sizeY && sizeZ) {
                return new Vector3(sizeX, sizeY, sizeZ);
            } else {
                const box = new Box3().setFromObject(object);
                const size = box.getSize(new Vector3());
                let converted;

                if (raw) {
                    converted = convertMeterToInchRaw(size);
                } else {
                    converted = convertMeterToInch(size);
                }

                return new Vector3(converted.x, converted.y, converted.z);
            }
        }
    }

    return null;
};
