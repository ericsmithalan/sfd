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
        createTextureData(3211, "wood", "ash", "Ash", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(5322, "wood", "birch", "Birch", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(8743, "wood", "hickory", "Hickory", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(9999, "wood", "maple", "Maple", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(4323, "wood", "oak", "Oak", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(6543, "wood", "cherry", "Cherry", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(9887, "wood", "walnut", "Walnut", 1, URL, {
            ...settings,
            diffuse: true,
        }),
    ];
};
