import {
    BufferGeometry,
    Color,
    LineBasicMaterial,
    LineSegments,
    Object3D,
    Vector3,
} from "three";

export class Grid extends Object3D {
    private _size: number;
    private _divisions: number;
    private _color: Color;

    private _hLine: LineSegments | null = null;
    private _vLine: LineSegments | null = null;

    constructor() {
        super();

        // @ts-ignore
        this.type = "Grid";

        this._size = 300;
        this._divisions = 200;
        this._color = new Color("#555555");

        this.update();
        // this.rotateX(Math.PI / 2);

        this.name = "Grid";
    }

    private update() {
        if (this._hLine) {
            this.remove(this._hLine);
        }

        if (this._vLine) {
            this.remove(this._vLine);
        }

        const hpoints: Array<Vector3> = [];
        const vpoints: Array<Vector3> = [];

        const stepHeight = (2 * this._size) / this._divisions;
        const stepWidth = (2 * this._size) / this._divisions;

        const material = new LineBasicMaterial({
            color: this._color,
            opacity: 0.2,
        });

        // Add horizontal lines
        for (var i = -this._size; i <= this._size; i += stepHeight) {
            hpoints.push(new Vector3(-this._size, i, 0));
            hpoints.push(new Vector3(this._size, i, 0));
        }

        // Add vertical lines
        for (var i = -this._size; i <= this._size; i += stepWidth) {
            vpoints.push(new Vector3(i, -this._size, 0));
            vpoints.push(new Vector3(i, this._size, 0));
        }

        const hLine = new BufferGeometry().setFromPoints(hpoints);

        const vLine = new BufferGeometry().setFromPoints(vpoints);
        this._vLine = new LineSegments(hLine, material);
        this._hLine = new LineSegments(vLine, material);

        this.add(this._vLine, this._hLine);
    }

    set size(value: number) {
        if (value !== this._size) {
            this._size = value;
            this.update();
        }
    }

    get size() {
        return this._size;
    }

    set divisions(value: number) {
        if (value !== this._divisions) {
            this._divisions = value;
            this.update();
        }
    }

    get divisions() {
        return this._divisions;
    }

    set color(value: Color) {
        if (value !== this._color) {
            this._color = value;
            this.update();
        }
    }

    get color() {
        return this._color;
    }
}
