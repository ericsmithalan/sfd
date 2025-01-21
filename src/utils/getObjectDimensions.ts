import { Box3, Mesh, Object3D, Vector3 } from "three";

import { Viewport } from "../lib";
import { getObject } from "./getObject";
import { convertMeterToInch } from "./unitConversions";

export const getObjectDimensions = (
    viewport: Viewport,
    obj?: number | Object3D,
): Vector3 | null => {
    if (obj) {
        const object = getObject(viewport, obj);

        if (object && object instanceof Mesh) {
            let sizeX = object.geometry.parameters?.width;
            let sizeY = object.geometry.parameters?.depth;
            let sizeZ = object.geometry.parameters?.height;

            if (sizeX && sizeY && sizeZ) {
                return new Vector3(sizeX, sizeY, sizeZ);
            } else {
                const box = new Box3().setFromObject(object);
                const size = box.getSize(new Vector3());

                const converted = convertMeterToInch(size);
                return new Vector3(converted.x, converted.y, converted.z);
            }
        }
    }

    return null;
};

//   const object = getObject(viewport, obj, false);

//         if (object && object instanceof Mesh) {
//             const sizeX = object.geometry.parameters?.width || 1;
//             const sizeY = object.geometry.parameters?.depth || 1;
//             const sizeZ = object.geometry.parameters?.height || 1;

//             return new Vector3(sizeX, sizeY, sizeZ);
//         }
