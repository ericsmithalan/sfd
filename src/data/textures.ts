import { ITexture } from "../interface/ITexture";

const BASE_TEXTURE_URL = "/textures";

const createWoodTexture = (
    id: string,
    type: string,
    variant: number,
    name: string,
    size: number,
): ITexture => {
    return {
        id: id,
        type: type,
        name: name,
        thumbnail: `${BASE_TEXTURE_URL}/${type}/${type}-${variant}-thumb.png`,
        faceUrl: `${BASE_TEXTURE_URL}/${type}/${type}-${variant}-face-${size}.png`,
        endUrl: `${BASE_TEXTURE_URL}/${type}/${type}-${variant}-end-${size}.png`,
        sideUrl: `${BASE_TEXTURE_URL}/${type}/${type}-${variant}-side-${size}.png`,
        resolution: size,
    };
};

const getAllWoodTextures = (size = 1024): Array<ITexture> => {
    return [
        createWoodTexture("0a875cc1-3233-4896-a0b8-b8b3b1b7c59b", "none", 1, "None", size),
        createWoodTexture("0a875cc1-ed33-4896-a0b8-b8b3b1b7c59b", "oak", 1, "Oak", size),
        createWoodTexture("1d0fb485-375c-4721-9f36-890e6826c638", "cherry", 1, "Cherry", size),
        createWoodTexture("5b3e1243-f4a9-4480-8b5e-a663971762ed", "walnut", 1, "Walnut", size),
        createWoodTexture("6310fa39-5518-4686-b66f-3c8414a0c25f", "maple", 1, "Maple", size),
        createWoodTexture("6b436d8e-87a9-49c0-80b7-422f3e3b2fea", "test", 1, "Test", size),
    ];
};

export const woodTextures = getAllWoodTextures();

export const getTextureById = (id: string): ITexture | null => {
    const result = woodTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultTexture = getTextureById("0a875cc1-3233-4896-a0b8-b8b3b1b7c59b");
