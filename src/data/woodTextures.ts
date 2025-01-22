import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

const URL = "/textures/wood";

export const getAllWoodTextures = (): Array<ITexture> => {
    return [
        createTextureData(92382, "dark", "Dark", 1, URL),
        createTextureData(12221, "plywood", "Plywood", 1, URL),
    ];
};
