import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllWoodTextures = (): Array<ITexture> => {
    const settings = {
        coat: false,
        ao: false,
        color: false,
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
        createTextureData(92382, "birch", "Birch", 1, URL, {
            ...settings,
            coat: true,
            ao: true,
            color: true,
            displace: true,
            normal: true,
            rough: true,
            coatRough: true,
            coatNormal: true,
        }),
    ];
};
