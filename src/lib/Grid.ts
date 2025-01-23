import { BufferGeometry, Color, LineBasicMaterial, LineSegments, Object3D, Vector3 } from "three";
import { disposeObject } from "../utils";

export class Grid extends Object3D {
    private size: number;
    private divisions: number;
    private color: Color;

    private hLine: LineSegments | null = null;
    private vLine: LineSegments | null = null;

    constructor() {
        super();

        // @ts-ignore
        this.type = "Grid";
        this.size = 300;
        this.divisions = 500;
        this.color = new Color("#444444");
        this.name = "Grid";

        this.update();
    }

    private update() {
        if (this.hLine) {
            this.remove(this.hLine);
        }

        if (this.vLine) {
            this.remove(this.vLine);
        }

        const hpoints: Array<Vector3> = [];
        const vpoints: Array<Vector3> = [];

        const stepHeight = (2 * this.size) / this.divisions;
        const stepWidth = (2 * this.size) / this.divisions;

        const material = new LineBasicMaterial({
            color: this.color,
            opacity: 0.2,
        });

        // Add horizontal lines
        for (var i = -this.size; i <= this.size; i += stepHeight) {
            hpoints.push(new Vector3(-this.size, i, 0));
            hpoints.push(new Vector3(this.size, i, 0));
        }

        // Add vertical lines
        for (var i = -this.size; i <= this.size; i += stepWidth) {
            vpoints.push(new Vector3(i, -this.size, 0));
            vpoints.push(new Vector3(i, this.size, 0));
        }

        const hLine = new BufferGeometry().setFromPoints(hpoints);
        const vLine = new BufferGeometry().setFromPoints(vpoints);
        this.vLine = new LineSegments(hLine, material);
        this.hLine = new LineSegments(vLine, material);
        this.rotateX(Math.PI / 2);

        this.add(this.vLine, this.hLine);

        hLine.dispose();
        vLine.dispose();
        material.dispose();
    }

    dispose() {
        disposeObject(this.vLine);
        disposeObject(this.hLine);
        disposeObject(this);
    }
}
