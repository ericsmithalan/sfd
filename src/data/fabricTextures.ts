import { ITexture } from "../interface/ITexture";

const BASE_FABRIC_TEXTURE_URL = "/textures/fabric";

const createFabricTexture = (
    id: string,
    name: string,
    displayName: string,
    variant: number,
    size: number,
): ITexture => {
    return {
        id: id,
        type: "fabric",
        displayName: displayName,
        name: name,
        thumbnail: `${BASE_FABRIC_TEXTURE_URL}/${name}/${variant}-thumb.png`,
        textureUrl: `${BASE_FABRIC_TEXTURE_URL}/${name}/${variant}-${size}.png`,
        resolution: size,
    };
};

const getAllFabricTextures = (size = 1024): Array<ITexture> => {
    return [
        createFabricTexture("0a875cc1-3233-2423-a0b8-b8b3b1b7c59b", "none", "None", 1, size),
        createFabricTexture("0a875cc1-3222-1222-a0b8-b8b3b1b7c59b", "gray", "Gray", 1, size),
        createFabricTexture("0a875cc1-9878-1222-a0b8-b8b3b1b7c59b", "gray", "Gray", 2, size),
        createFabricTexture("0a875cc1-6782-1222-a0b8-b8b3b1b7c59b", "blue", "Blue", 1, size),
        createFabricTexture("0a875cc1-4322-1222-a0b8-b8b3b1b7c59b", "blue", "Blue", 2, size),
        createFabricTexture("0a875cc1-1293-1222-a0b8-b8b3b1b7c59b", "green", "Green", 1, size),
    ];
};

export const fabricTextures = getAllFabricTextures();

export const getFabricTextureById = (id: string): ITexture | null => {
    const result = fabricTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultFabricTexture = getFabricTextureById("0a875cc1-3233-2423-a0b8-b8b3b1b7c59b");
