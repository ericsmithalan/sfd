import { ColorRepresentation } from "three";
import { ITexture } from "../interface/ITexture";

const createMetalTexture = (
    id: number,
    color: ColorRepresentation,
    name: string,
    displayName: string,
    variant: number,
    size: number,
): ITexture => {
    return {
        id: id,
        type: "metal",
        displayName: displayName,
        name: name,
        thumbnail: "",
        textureUrl: "",
        resolution: size,
        color: color,
    };
};

const getAllMetalTextures = (size = 1024): Array<ITexture> => {
    return [
        createMetalTexture(982139, "#000000", "black", "Black", 1, size),
        createMetalTexture(982111, "#555555", "white", "White", 1, size),
        createMetalTexture(236139, "#ffffff", "white", "White", 1, size),
    ];
};

export const metalTextures = getAllMetalTextures();

export const getMetalTextureById = (id: number): ITexture | null => {
    const result = metalTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultMetalexture = getMetalTextureById(982139);
