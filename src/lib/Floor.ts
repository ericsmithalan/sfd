import { Mesh, PlaneGeometry, ShadowMaterial } from "three";
import { disposeObject } from "../utils";

export class Floor extends Mesh {
    constructor() {
        super();

        const material = new ShadowMaterial();
        material.opacity = 0.2;

        const geometry = new PlaneGeometry(2000, 2000);

        this.name = "Floor";

        this.material = material;
        this.geometry = geometry;
        this.name = "Floor";
        this.receiveShadow = true;

        material.dispose();
        geometry.dispose();
    }

    dispose() {
        disposeObject(this);
    }
}
