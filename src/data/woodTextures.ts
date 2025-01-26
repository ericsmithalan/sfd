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
        createTextureData(138, "wood", "none", "None", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(299, "wood", "ash", "Ash", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(390, "wood", "birch", "Birch", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(464, "wood", "hickory", "Hickory", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(584, "wood", "maple", "Maple", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(699, "wood", "oak", "Oak", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(392, "wood", "oak", "Oak", 2, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(8372, "wood", "oak", "Oak", 3, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2039, "wood", "oak", "Oak", 4, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(8472, "wood", "oak", "Oak", 5, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(6632, "wood", "oak", "Oak", 6, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(2292, "wood", "oak", "Oak", 7, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(745, "wood", "cherry", "Cherry", 1, URL, {
            ...settings,
            diffuse: true,
        }),
        createTextureData(888, "wood", "walnut", "Walnut", 1, URL, {
            ...settings,
            diffuse: true,
        }),
    ];
};
