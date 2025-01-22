import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllFabricTextures = (): Array<ITexture> => {
    return [createTextureData(98743, "green", "Green", 1, "/textures/fabric")];
};
