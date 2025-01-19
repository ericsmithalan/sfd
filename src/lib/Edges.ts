import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Object3D } from "three";
import { ObjectUserData } from "./ObjectUserData";

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
        line.userData = new ObjectUserData(false, null, mesh.id);

        this.edgeGroup.add(line);

        return line;
    }
}
