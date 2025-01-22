import { Material } from "three";
import { TextureType } from "../types";

export interface IObjectMaterial {
    type: TextureType;
    objects: Array<number>;
    material: Material;
}
