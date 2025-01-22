import { ITexture } from "../interface/ITexture";

const BASE_FABRIC_TEXTURE_URL = "/textures/fabric";

const createFabricTexture = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    size: number,
    pbr: boolean,
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

const getAllFabricTextures = (pbr: boolean = false, size = 1024): Array<ITexture> => {
    return [
        createFabricTexture(29823, "none", "None", 1, size, pbr),
        createFabricTexture(98743, "gray", "Gray", 1, size, pbr),
        createFabricTexture(72832, "gray", "Gray", 2, size, pbr),
        createFabricTexture(39832, "blue", "Blue", 1, size, pbr),
        createFabricTexture(73262, "blue", "Blue", 2, size, pbr),
        createFabricTexture(62322, "green", "Green", 1, size, pbr),
    ];
};

export const fabricTextures = getAllFabricTextures(false, 1024);

export const getFabricTextureById = (id: number): ITexture | null => {
    const result = fabricTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultFabricTexture = getFabricTextureById(29823);
