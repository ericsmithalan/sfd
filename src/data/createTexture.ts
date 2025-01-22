import { ITexture } from "../interface/ITexture";

export const createTextureData = (
    id: number,
    name: string,
    displayName: string,
    variant: number,
    url: string,
): ITexture => {
    return {
        id: id,
        type: "fabric",
        displayName: displayName,
        name: name,
        thumbnail: `${url}/${name}/${variant}-thumb.png`,
        basic: {
            url: `${url}/${name}/${variant}-color`,
        },
        pbr: {
            color: `${url}/${name}/${variant}-color`,
            ao: `${url}/${name}/${variant}-ao`,
            bump: `${url}/${name}/${variant}-bump`,
            metal: `${url}/${name}/${variant}-bump`,
            normal: `${url}/${name}/${variant}-normal`,
            rough: `${url}/${name}/${variant}-rough`,
        },
    };
};
