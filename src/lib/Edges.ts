import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh, Scene, Vector3 } from "three";
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
        let wp = mesh.getWorldPosition(new Vector3());

        if (mesh.parent) {
            wp = mesh.parent.getWorldPosition(new Vector3());
        }

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black", linewidth: 3 }));
        line.name = mesh.name;
        line.userData = new ObjectUserData(null, null, { objectId: mesh.id });

        line.position.x = wp.x;
        line.position.y = wp.y;
        line.position.z = wp.z;

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
                            if (obj.parent) {
                                item.position.x = obj.parent.position.x;
                                item.position.y = obj.parent.position.y;
                                item.position.z = obj.parent.position.z;

                                item.rotation.x = obj.parent.rotation.x;
                                item.rotation.y = obj.parent.rotation.y;
                                item.rotation.z = obj.parent.rotation.z;
                            } else {
                                item.position.x = obj.position.x;
                                item.position.y = obj.position.y;
                                item.position.z = obj.position.z;

                                item.rotation.x = obj.rotation.x;
                                item.rotation.y = obj.rotation.y;
                                item.rotation.z = obj.rotation.z;
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
