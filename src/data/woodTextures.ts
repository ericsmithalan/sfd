import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllWoodTextures = (): Array<ITexture> => {
    const settings = {
        coat: true,
        ao: true,
        color: true,
        displace: true,
        metal: false,
        normal: true,
        rough: true,
        coatRough: true,
        coatNormal: true,
        specular: false,
    };

    const URL = "/textures/wood";

    return [createTextureData(92382, "birch", "Birch", 1, URL, settings)];
};
