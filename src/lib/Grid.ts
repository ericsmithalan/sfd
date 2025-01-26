import {
    BufferGeometry,
    ColorRepresentation,
    LineBasicMaterial,
    LineSegments,
    Object3D,
    Vector3,
} from "three";
import { disposeGeometry, disposeMaterial, disposeObject } from "../utils";

export class Grid extends Object3D {
    constructor(
        size: number = 300,
        divisions: number = 500,
        color: ColorRepresentation = "#444444",
    ) {
        super();

        this.name = "Grid";

        const hpoints: Array<Vector3> = [];
        const vpoints: Array<Vector3> = [];

        const stepHeight = (2 * size) / divisions;
        const stepWidth = (2 * size) / divisions;

        const material = new LineBasicMaterial({
            color: color,
            opacity: 0.2,
        });

        // Add horizontal lines
        for (var i = -size; i <= size; i += stepHeight) {
            hpoints.push(new Vector3(-size, i, 0));
            hpoints.push(new Vector3(size, i, 0));
        }

        // Add vertical lines
        for (var i = -size; i <= size; i += stepWidth) {
            vpoints.push(new Vector3(i, -size, 0));
            vpoints.push(new Vector3(i, size, 0));
        }

        const hLine = new BufferGeometry().setFromPoints(hpoints);
        const vLine = new BufferGeometry().setFromPoints(vpoints);

        const vert = new LineSegments(hLine, material);
        const horiz = new LineSegments(vLine, material);

        this.rotateX(Math.PI / 2);

        this.add(vert, horiz);

        disposeGeometry(hLine);
        disposeGeometry(vLine);
        disposeMaterial(material);
    }

    dispose() {
        disposeObject(this);
    }
}
