import { ITexture } from "../interface/ITexture";

const BASE_WOOD_TEXTURE_URL = "/textures/wood";

const createWoodTexture = (
    id: string,
    name: string,
    displayName: string,
    variant: number,
    size: number,
): ITexture => {
    return {
        id: id,
        type: "wood",
        displayName: displayName,
        name: name,
        thumbnail: `${BASE_WOOD_TEXTURE_URL}/${name}/${variant}-thumb.png`,
        textureUrl: `${BASE_WOOD_TEXTURE_URL}/${name}/${variant}-${size}.png`,
        resolution: size,
    };
};

const getAllWoodTextures = (size = 1024): Array<ITexture> => {
    return [
        createWoodTexture("0a875cc1-3233-4896-a0b8-b8b3b1b7c59b", "none", "None", 1, size),
        createWoodTexture("0a875cc1-ed33-4896-a0b8-b8b3b1b7c59b", "oak", "Oak", 1, size),
        createWoodTexture("63ddd323-5518-4686-b66f-aadd14a0c25f", "oak", "Oak", 2, size),
        createWoodTexture("1d0fb485-375c-4721-9f36-890ddd26c638", "cherry", "Cherry", 1, size),
        createWoodTexture("1d0fb485-375c-4721-9f36-890e6826c638", "cherry", "Cherry", 2, size),
        createWoodTexture("5b3e1243-f4a9-4480-8b5e-a663971762ed", "walnut", "Walnut", 1, size),
        createWoodTexture("63ddd323-5518-4686-b66f-cadd14a0c25f", "walnut", "Walnut", 2, size),
        createWoodTexture("63ddd323-5518-4686-b66f-cadd14a0sdfa", "walnut", "Walnut", 3, size),
        createWoodTexture("6310fa39-5518-4686-b66f-3c8414a0c25f", "maple", "Maple", 1, size),
        createWoodTexture(
            "63102323-5518-4686-b66f-3c8414a0c25f",
            "applewood",
            "Applewood",
            1,

            size,
        ),
        createWoodTexture("63102323-5518-4686-b66f-aadd14a0c25f", "hickory", "Hickory", 1, size),
        createWoodTexture("63ddd323-2323-4686-b66f-cadd14a0c25f", "wenge", "Wenge", 1, size),
        createWoodTexture("63ddd323-2323-4686-b66f-cadd1231ac25f", "wenge", "Wenge", 2, size),
    ];
};

export const woodTextures = getAllWoodTextures();

export const getWoodTextureById = (id: string): ITexture | null => {
    const result = woodTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultWoodTexture = getWoodTextureById("0a875cc1-3233-4896-a0b8-b8b3b1b7c59b");
