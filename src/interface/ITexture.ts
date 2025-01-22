import { TextureType } from "../types";

export interface IPBRTexture {
    color: string;
    ao?: string;
    bump: string;
    metal?: string;
    rough: string;
    normal: string;
    normalRough: string;
    normalBump: string;
}

export interface IBasicTexture {
    url: string;
}

export interface ITexture {
    id: number;
    type: TextureType;
    name: string;
    thumbnail: string;
    displayName: string;
    pbr: IPBRTexture;
    basic: IBasicTexture;
}
