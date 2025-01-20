import { MeshStandardMaterial } from "three";

export interface IObjectMaterial {
    objects: Array<number>;
    material: MeshStandardMaterial;
}
