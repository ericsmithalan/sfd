import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllFabricTextures = (): Array<ITexture> => {
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

    const url = "/textures/fabric";

    return [
        createTextureData(98743, "green", "Green", 1, url, {
            ...settings,
            ao: true,
            normal: true,
            rough: true,
            color: true,
        }),
    ];
};
