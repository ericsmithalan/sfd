import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllFabricTextures = (): Array<ITexture> => {
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

    const url = "/textures/fabric";

    return [
        createTextureData(189, "wood", "none", "None", 1, url, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(283, "fabric", "green", "Green", 1, url, {
            ...settings,
            ao: true,
            normal: true,
            rough: true,
            diffuse: true,
        }),
    ];
};
