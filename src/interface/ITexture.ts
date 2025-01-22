import { ColorRepresentation } from "three";
import { TextureType } from "../types";

export interface ITexture {
    id: number;
    resolution: number;
    type: TextureType;
    name: string;
    displayName: string;
    thumbnail: string;
    textureUrl: string;
    color?: ColorRepresentation;
}
