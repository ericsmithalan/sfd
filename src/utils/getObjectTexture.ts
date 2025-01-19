import { Object3D } from "three";
import { ITexture } from "../interface/ITexture";
import { ObjectUserData, Viewport } from "../lib";
import { getObject } from "./getObject";
import { getTextureById } from "./getTextureById";

export const getObjectTexture = (
    viewport: Viewport,
    obj: number | Object3D,
    type: string,
): ITexture | null => {
    if (obj && type) {
        const object = getObject(viewport, obj);
        if (object) {
            if (object.userData instanceof ObjectUserData) {
                if (object.userData.textureId) {
                    const woodTexture = getTextureById(object.userData.textureId);
                    return woodTexture;
                }
            }
        }
    }
    return null;
};
