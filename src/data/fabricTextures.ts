import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllFabricTextures = (): Array<ITexture> => {
    const settings = {
        coat: false,
        ao: true,
        color: true,
        displace: false,
        metal: false,
        normal: true,
        rough: true,
        coatRough: false,
        coatNormal: false,
        specular: false,
    };

    const url = "/textures/fabric";

    return [createTextureData(98743, "green", "Green", 1, url, settings)];
};
