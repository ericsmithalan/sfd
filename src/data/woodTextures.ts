import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllWoodTextures = (): Array<ITexture> => {
    return [createTextureData(92382, "dark", "Dark", 1, "/textures/wood")];
};
