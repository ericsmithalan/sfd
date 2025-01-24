import { ITexture } from "../interface/ITexture";
import { createTextureData } from "./createTexture";

export const getAllWoodTextures = (): Array<ITexture> => {
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

    const URL = "/textures/wood";

    return [
        createTextureData(1111, "wood", "none", "None", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2323, "wood", "ash", "Ash", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2434, "wood", "birch", "Birch", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(6543, "wood", "cherry", "Cherry", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(7643, "wood", "hickory", "Hickory", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(9900, "wood", "maple", "Maple", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(5894, "wood", "oak", "Oak", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(9887, "wood", "walnut", "Walnut", 1, URL, {
            ...settings,
            diffuse: true,
        }),
    ];
};
