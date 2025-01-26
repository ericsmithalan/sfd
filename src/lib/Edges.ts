import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh } from "three";
import { disposeGeometry, disposeObject } from "../utils";
import { ObjectUserData } from "./ObjectUserData";

export class Edges {
    edgeGroup: Group;
    threshold: number;

    constructor() {
        this.edgeGroup = new Group();
        this.threshold = 20;
    }

    add(mesh: Mesh) {
        let line: LineSegments;

        const edges = new EdgesGeometry(mesh.geometry, this.threshold);

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black", linewidth: 3 }));
        line.userData = new ObjectUserData(null, null, { objectId: mesh.id });

        this.edgeGroup.add(line);

        disposeGeometry(edges);

        return line;
    }

    dispose() {
        disposeObject(this.edgeGroup);
    }
}
