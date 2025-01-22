import { ITexture } from "../interface/ITexture";

const createFabricTexture = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    hasAo: boolean,
): ITexture => {
    const BASE_FABRIC_TEXTURE_URL = "/textures/fabric";

    return {
        id: id,
        type: "fabric",
        displayName: displayName,
        name: name,
        thumbnail: `${BASE_FABRIC_TEXTURE_URL}/${name}/${variant}-thumb.png`,
        basic: {
            url: `${BASE_FABRIC_TEXTURE_URL}/${name}/basic/${variant}-color`,
        },
        pbr: {
            color: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-color`,
            ao: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-ao`,
            bump: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-bump`,
            metal: undefined,
            normal: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-normal`,
            normalBump: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-normal-bump`,
            normalRough: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-normal-rough`,
            rough: `${BASE_FABRIC_TEXTURE_URL}/${name}/pbr/${variant}-rough`,
        },
    };
};

export const getAllFabricTextures = (): Array<ITexture> => {
    return [createFabricTexture(98743, "green", "Green", 1, true)];
};
