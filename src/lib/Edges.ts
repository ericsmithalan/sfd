import {
    EdgesGeometry,
    Group,
    LineBasicMaterial,
    LineSegments,
    Mesh,
    Object3D,
    Scene,
    Vector3,
} from "three";
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

    get(obj: Object3D) {
        const edge = this.edgeGroup.getObjectByName(`${obj.name}__edge`);

        return edge;
    }

    add(mesh: Mesh) {
        mesh.updateMatrixWorld();
        let line: LineSegments;

        const edges = new EdgesGeometry(mesh.geometry, this.threshold);

        let wp = mesh.position;

        if (mesh.parent) {
            wp = mesh.parent.getWorldPosition(new Vector3());
        }

        line = new LineSegments(edges, new LineBasicMaterial({ color: "black", linewidth: 3 }));
        line.name = `${mesh.name}__edge`;
        line.userData = new ObjectUserData(null, null, { objectId: mesh.id, edgeId: line.id });
        mesh.userData = new ObjectUserData(null, null, { objectId: mesh.id, edgeId: line.id });

        // line.position.x = wp.x;
        // line.position.y = wp.y;
        // line.position.z = wp.z;

        line.position.copy(mesh.position);

        this.edgeGroup.add(line);

        disposeGeometry(edges);

        return line;
    }

    explodeEdge(obj: Mesh, direction: Vector3, subtract: boolean = false) {
        const edge = this.edgeGroup.getObjectByName(`${obj.name}__edge`);

        if (edge) {
            if (subtract) {
                edge.position.sub(direction);
            } else {
                edge.position.add(direction);
            }
        }
    }

    setPosition(edge: Object3D, mesh: Object3D) {
        if (mesh.parent) {
            edge.position.x = mesh.parent.position.x;
            edge.position.y = mesh.parent.position.y;
            edge.position.z = mesh.parent.position.z;

            edge.rotation.x = mesh.parent.rotation.x;
            edge.rotation.y = mesh.parent.rotation.y;
            edge.rotation.z = mesh.parent.rotation.z;
        } else {
            edge.position.x = mesh.position.x;
            edge.position.y = mesh.position.y;
            edge.position.z = mesh.position.z;

            edge.rotation.x = mesh.rotation.x;
            edge.rotation.y = mesh.rotation.y;
            edge.rotation.z = mesh.rotation.z;
        }
    }

    update(scene: Scene) {
        if (this.edgeGroup) {
            this.edgeGroup.traverse((item) => {
                if (item.userData instanceof ObjectUserData) {
                    if (item.userData.edgeInfo) {
                        const obj = scene.getObjectById(item.userData.edgeInfo?.objectId);

                        if (obj) {
                            // if obj has parent (from blender) other than scene
                            this.setPosition(item, obj);
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
