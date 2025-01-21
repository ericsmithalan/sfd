import { ColorRepresentation } from "three";
import { ITexture } from "../interface/ITexture";

const createMetalTexture = (
    id: string,
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
        createMetalTexture(
            "83722323-32321-2423-a0b8-b8b3b1b7c59b",
            "#000000",
            "black",
            "Black",
            1,
            size,
        ),
        createMetalTexture(
            "83722323-3233-2423-a0b8-b8b3b1b7c59b",
            "#555555",
            "white",
            "White",
            1,
            size,
        ),
        createMetalTexture(
            "09772398723-3222-1222-a0b8-b8b3b1b7c59b",
            "#ffffff",
            "white",
            "White",
            1,
            size,
        ),
    ];
};

export const metalTextures = getAllMetalTextures();

export const getMetalTextureById = (id: string): ITexture | null => {
    const result = metalTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultMetalexture = getMetalTextureById("83722323-32321-2423-a0b8-b8b3b1b7c59b");
