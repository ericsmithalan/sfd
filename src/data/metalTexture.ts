import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllMetalTextures = (): Array<ITexture> => {
    return [createTextureData(982111, "iron", "Iron", 1, "/textures/metal")];
};
