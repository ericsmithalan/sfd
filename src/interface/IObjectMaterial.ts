import { TextureType } from "../types";
import { ITexture } from "./ITexture";

export interface IObjectMaterial {
    type: TextureType;
    objects: Array<number>;
    texture: ITexture;
}
