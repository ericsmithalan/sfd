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
        createTextureData(23232, "black", "Black", 2, url, {
            ...settings,
            diffuse: true,
            displace: true,
            metal: true,
            normal: true,
            specular: true,
        }),
    ];
};
