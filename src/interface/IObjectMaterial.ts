import { MeshStandardMaterial } from "three";

export interface IObjectMaterial {
    type: string;
    objects: Array<number>;
    material: MeshStandardMaterial;
}
