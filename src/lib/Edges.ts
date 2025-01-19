import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Object3D } from "three";

export class Edges {
    edgeGroup: Group;
    threshold: number;

    constructor() {
        this.edgeGroup = new Group();
        this.threshold = 45;
    }

    add(mesh: Object3D) {
        let line: LineSegments;
        const thresholdAngle = 45;

        //@ts-ignore
        const edges = new EdgesGeometry(mesh.geometry, thresholdAngle);

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black" }));

        this.edgeGroup.add(line);

        return line;
    }
}
