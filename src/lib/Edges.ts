import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Object3D } from "three";
import { ObjectUserData } from "./ObjectUserData";

export class Edges {
    edgeGroup: Group;
    threshold: number;

    constructor() {
        this.edgeGroup = new Group();
        this.threshold = 20;
    }

    add(mesh: Object3D) {
        let line: LineSegments;

        //@ts-ignore
        const edges = new EdgesGeometry(mesh.geometry, this.threshold);

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black", linewidth: 3 }));
        line.userData = new ObjectUserData(null, null, { objectId: mesh.id });

        this.edgeGroup.add(line);

        edges.dispose();

        return line;
    }
}
