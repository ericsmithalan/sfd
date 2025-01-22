import { ITexture } from "../interface/ITexture";

const createWoodTexture = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    size: number,
    pbr: boolean,
): ITexture => {
    const BASE_WOOD_TEXTURE_URL = "/textures/wood";

    return {
        id: id,
        type: "wood",
        displayName: displayName,
        name: name,
        thumbnail: `${BASE_WOOD_TEXTURE_URL}/${pbr ? "pbr" : "basic"}/${name}/${variant}-thumb.png`,
        textureUrl: `${BASE_WOOD_TEXTURE_URL}/${
            pbr ? "pbr" : "basic"
        }/${name}/${variant}-${size}.png`,
        resolution: size,
    };
};

const getAllWoodTextures = (pbr: boolean = false, size = 1024): Array<ITexture> => {
    return [
        createWoodTexture(34023, "none", "None", 1, size, pbr),
        createWoodTexture(92382, "oak", "Oak", 1, size, pbr),
        createWoodTexture(73623, "oak", "Oak", 2, size, pbr),
        createWoodTexture(46289, "cherry", "Cherry", 1, size, pbr),
        createWoodTexture(93282, "cherry", "Cherry", 2, size, pbr),
        createWoodTexture(52372, "walnut", "Walnut", 1, size, pbr),
        createWoodTexture(63292, "walnut", "Walnut", 2, size, pbr),
        createWoodTexture(40239, "walnut", "Walnut", 3, size, pbr),
        createWoodTexture(12121, "maple", "Maple", 1, size, pbr),
        createWoodTexture(
            32323,
            "applewood",
            "Applewood",
            1,

            size,
            pbr,
        ),
        createWoodTexture(34343, "hickory", "Hickory", 1, size, pbr),
        createWoodTexture(98989, "wenge", "Wenge", 1, size, pbr),
        createWoodTexture(67676, "wenge", "Wenge", 2, size, pbr),
    ];
};

export const woodTextures = getAllWoodTextures(false, 1024);

export const getWoodTextureById = (id: number): ITexture | null => {
    const result = woodTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultWoodTexture = getWoodTextureById(34023);
