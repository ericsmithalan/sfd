import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllMetalTextures = (): Array<ITexture> => {
    const settings = {
        coat: false,
        ao: false,
        diffuse: false,
        displace: false,
        metal: false,
        normal: false,
        rough: false,
        coatRough: false,
        coatNormal: false,
        specular: false,
    };

    const url = "/textures/metal";

    return [
        createTextureData(1212, "wood", "none", "None", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2312, "metal", "black", "Black", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(43231, "metal", "gray", "Gray", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(5343, "metal", "gray", "Gray", 2, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2333, "metal", "brass", "Brass", 1, url, {
            ...settings,
            diffuse: true,
        }),
    ];
};
