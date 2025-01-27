import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh, Scene } from "three";
import { disposeGeometry, disposeObject } from "../utils";
import { ObjectUserData } from "./ObjectUserData";

export class Edges {
    edgeGroup: Group;
    threshold: number;
    needsUpdate: boolean = true;

    constructor() {
        this.edgeGroup = new Group();
        this.threshold = 30;
    }

    add(mesh: Mesh) {
        let line: LineSegments;

        const edges = new EdgesGeometry(mesh.geometry, this.threshold);

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black", linewidth: 3 }));
        line.name = mesh.name;
        line.userData = new ObjectUserData(null, null, { objectId: mesh.id });

        this.edgeGroup.add(line);

        disposeGeometry(edges);

        return line;
    }

    update(scene: Scene) {
        if (this.edgeGroup) {
            this.edgeGroup.traverse((item) => {
                if (item.userData instanceof ObjectUserData) {
                    if (item.userData.edgeInfo) {
                        const obj = scene.getObjectById(item.userData.edgeInfo?.objectId);

                        if (obj) {
                            // if obj has parent (from blender) other than scene
                            if (obj.parent && obj.parent instanceof Mesh) {
                                item.position.x = obj.parent.position.x;
                                item.position.y = obj.parent.position.y;
                                item.position.z = obj.parent.position.z;
                            } else {
                                item.position.x = obj.position.x;
                                item.position.y = obj.position.y;
                                item.position.z = obj.position.z;
                            }
                        }
                    }
                }
            });
        }
    }

    dispose() {
        disposeObject(this.edgeGroup);
    }
}
