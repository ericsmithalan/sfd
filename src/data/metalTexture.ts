import { ITexture } from "../interface/ITexture";

const createMetalTexture = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    hasAo: boolean,
): ITexture => {
    const BASE_METAL_TEXTURE_URL = "/textures/metal";
    return {
        id: id,
        type: "metal",
        displayName: displayName,
        thumbnail: `${BASE_METAL_TEXTURE_URL}/${name}/${variant}-thumb.png`,
        name: name,
        basic: {
            url: `${BASE_METAL_TEXTURE_URL}/${name}/basic/${variant}-color`,
        },
        pbr: {
            color: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-color`,
            ao: hasAo ? `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-ao` : undefined,
            bump: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-bump`,
            metal: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-metal`,
            normal: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-normal`,
            normalBump: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-normal-bump`,
            normalRough: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-normal-rough`,
            rough: `${BASE_METAL_TEXTURE_URL}/${name}/pbr/${variant}-rough`,
        },
    };
};

export const getAllMetalTextures = (): Array<ITexture> => {
    return [createMetalTexture(982111, "bronze", "Bronze", 1, false)];
};
