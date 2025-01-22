import { ITexture } from "../interface/ITexture";

const createWoodTexture = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    hasAo: boolean,
): ITexture => {
    const BASE_WOOD_TEXTURE_URL = "/textures/wood";

    return {
        id: id,
        type: "wood",
        displayName: displayName,
        name: name,
        thumbnail: `${BASE_WOOD_TEXTURE_URL}/${name}/${variant}-thumb.png`,
        basic: {
            url: `${BASE_WOOD_TEXTURE_URL}/${name}/basic/${variant}-color`,
        },
        pbr: {
            color: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-color`,
            ao: hasAo ? `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-ao` : undefined,
            bump: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-bump`,
            metal: undefined,
            normalBump: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-normal-bump`,
            normalRough: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-normal-rough`,
            normal: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-normal`,
            rough: `${BASE_WOOD_TEXTURE_URL}/${name}/pbr/${variant}-rough`,
        },
    };
};

export const getAllWoodTextures = (): Array<ITexture> => {
    return [
        createWoodTexture(92382, "dark", "Dark", 1, false),

        // createWoodTexture(73623, "oak", "Oak", 2),
        // createWoodTexture(46289, "cherry", "Cherry", 1),
        // createWoodTexture(93282, "cherry", "Cherry", 2),
        // createWoodTexture(52372, "walnut", "Walnut", 1),
        // createWoodTexture(63292, "walnut", "Walnut", 2),
        // createWoodTexture(40239, "walnut", "Walnut", 3),
        // createWoodTexture(12121, "maple", "Maple", 1),
        // createWoodTexture(32323, "applewood", "Applewood", 1),
        // createWoodTexture(34343, "hickory", "Hickory", 1),
        // createWoodTexture(98989, "wenge", "Wenge", 1),
        // createWoodTexture(67676, "wenge", "Wenge", 2),
    ];
};
