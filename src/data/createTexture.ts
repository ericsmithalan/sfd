import { ITexture } from "../interface/ITexture";
import { TextureType } from "../types";

export const createTextureData = (
    id: number,
    type: TextureType,
    name: string,
    displayName: string,
    variant: number,
    url: string,
    options: {
        ao: boolean;
        diffuse: boolean;
        displace: boolean;
        metal: boolean;
        normal: boolean;
        rough: boolean;
        coat: boolean;
        coatRough: boolean;
        coatNormal: boolean;
        specular: boolean;
    },
): ITexture => {
    return {
        id: id,
        type: type,
        displayName: displayName,
        name: name,
        thumbnail: `${url}/${name}/${variant}-thumb.png`,
        basic: {
            url: `${url}/${name}/${variant}-diffuse`,
        },
        pbr: {
            diffuse: options.diffuse ? `${url}/${name}/${variant}-diffuse` : null,
            ao: options.ao ? `${url}/${name}/${variant}-ao` : null,
            displace: options.displace ? `${url}/${name}/${variant}-disp` : null,
            metal: options.metal ? `${url}/${name}/${variant}-metallic` : null,
            normal: options.normal ? `${url}/${name}/${variant}-normal` : null,
            rough: options.rough ? `${url}/${name}/${variant}-roughness` : null,
            coat: options.coat ? `${url}/${name}/${variant}-coat` : null,
            coatNormal: options.coatNormal ? `${url}/${name}/${variant}-coatNormal` : null,
            coatRough: options.coatRough ? `${url}/${name}/${variant}-coatRoughness` : null,
            specular: options.specular ? `${url}/${name}/${variant}-spec` : null,
        },
    };
};
