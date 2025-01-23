import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllWoodTextures = (): Array<ITexture> => {
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

    const URL = "/textures/wood";

    return [
        createTextureData(23231, "walnut", "Walnut", 1, URL, {
            ...settings,
            ao: false,
            coat: true,
            coatNormal: true,
            coatRough: true,
            diffuse: true,
            displace: true,
            normal: true,
            rough: true,
        }),
        createTextureData(92382, "birch", "Birch", 1, URL, {
            ...settings,
            coat: true,
            ao: true,
            diffuse: true,
            displace: true,
            normal: true,
            rough: true,
            coatRough: true,
            coatNormal: true,
        }),
    ];
};
