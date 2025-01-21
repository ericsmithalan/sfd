import { ColorRepresentation } from "three";
import { TextureType } from "../types";

export interface ITexture {
    id: string;
    resolution: number;
    type: TextureType;
    name: string;
    displayName: string;
    thumbnail: string;
    textureUrl: string;
    color?: ColorRepresentation;
}
