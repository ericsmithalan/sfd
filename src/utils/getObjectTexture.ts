import { Object3D } from "three";
import { getWoodTextureById } from "../data";
import { ITexture } from "../interface/ITexture";
import { ObjectUserData, Viewport } from "../lib";
import { getObject } from "./getObject";

export const getObjectTexture = (
    viewport: Viewport,
    obj: number | Object3D,
    type: string,
): ITexture | null => {
    if (obj && type) {
        const object = getObject(viewport, obj);
        if (object) {
            if (object.userData instanceof ObjectUserData) {
                if (object.userData.textureInfo?.textureId) {
                    const woodTexture = getWoodTextureById(object.userData.textureInfo?.textureId);
                    return woodTexture;
                }
            }
        }
    }
    return null;
};
