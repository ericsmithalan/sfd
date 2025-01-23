import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllMetalTextures = (): Array<ITexture> => {
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

    const url = "/textures/metal";

    return [
        createTextureData(23232, "black", "Black", 2, url, {
            ...settings,
            specular: true,
            color: true,
            displace: true,
            normal: true,
            metal: true,
        }),
    ];
};
