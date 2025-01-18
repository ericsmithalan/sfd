import { Mesh, PlaneGeometry, ShadowMaterial } from "three";
import { ObjectUserData } from "./";

export class Floor extends Mesh {
    constructor() {
        super();

        const material = new ShadowMaterial();
        material.opacity = 0.2;

        const geometry = new PlaneGeometry(2000, 2000);

        this.name = "Floor";

        this.userData = new ObjectUserData({
            selectable: false,
            outliner: null,
        });

        this.material = material;
        this.geometry = geometry;
        this.name = "Floor";
        this.receiveShadow = true;
    }
}
