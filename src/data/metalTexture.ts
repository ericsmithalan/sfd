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
        createTextureData(112, "wood", "none", "None", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(233, "metal", "black", "Black", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(354, "metal", "gray", "Gray", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(476, "metal", "gray", "Gray", 2, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(598, "metal", "brass", "Brass", 1, url, {
            ...settings,
            diffuse: true,
        }),
    ];
};
