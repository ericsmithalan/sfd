import { Box3, Group, Mesh, Object3D, Vector3 } from "three";
import { Edges } from "./Edges";

export class Exploder {
    private mesh: Object3D;
    private edges: Edges;
    private center = new Vector3(0, 0, 0);
    private explosionFactor = 0.001;
    private frames = 0;
    private maxFrames = 100;
    exploded: boolean = false;
    animate: boolean = false;

    constructor(mesh: Object3D, edges: Edges) {
        this.mesh = mesh;
        this.edges = edges;
        this.center = this.getCenter(mesh);
    }

    private getCenter(obj: Object3D) {
        const childBox = new Box3();
        const groupBox = new Box3();
        const center = new Vector3();

        if (obj instanceof Group) {
            obj.traverse(function (child) {
                if (child instanceof Mesh) {
                    if (!child.geometry.boundingBox) {
                        child.geometry.computeBoundingBox();

                        childBox.copy(child.geometry.boundingBox);

                        child.updateMatrixWorld(true);

                        childBox.applyMatrix4(child.matrixWorld);

                        groupBox.min.min(childBox.min);
                        groupBox.max.max(childBox.max);
                    }
                }
            });

            // All computations are in world space
            // But the group might not be in world space
            groupBox.applyMatrix4(obj.matrixWorld.invert());
            groupBox.getCenter(center);
        }
        return center;
    }

    animateExplosion() {
        if (this.animate) {
            if (this.exploded) {
                this.implode();
            } else {
                this.explode();
            }
        }
    }

    implode() {
        if (this.frames <= this.maxFrames) {
            if (this.mesh instanceof Group) {
                this.mesh.traverse((child) => {
                    if (child instanceof Mesh) {
                        if (!child.geometry.boundingSphere) {
                            child.geometry.computeBoundingSphere();
                        }

                        child.userData.oldPosition =
                            child.userData.oldPosition ||
                            child.geometry.boundingSphere.center.clone();

                        const direction = child.userData.oldPosition
                            .clone()
                            .sub(this.center)
                            .normalize();

                        const moveTo = direction.clone().multiplyScalar(this.explosionFactor);

                        child.position.sub(moveTo);

                        this.edges.explodeEdge(child, moveTo, true);
                    }
                });
            }
        } else {
            this.animate = false;
            this.exploded = false;
            this.frames = 0;
        }

        this.frames++;
    }

    explode() {
        if (this.frames <= this.maxFrames) {
            if (this.mesh instanceof Group) {
                this.mesh.traverse((child) => {
                    if (child instanceof Mesh) {
                        if (!child.geometry.boundingSphere) {
                            child.geometry.computeBoundingSphere();
                        }

                        child.userData.oldPosition =
                            child.userData.oldPosition ||
                            child.geometry.boundingSphere.center.clone();

                        const direction = child.userData.oldPosition
                            .clone()
                            .sub(this.center)
                            .normalize();

                        const moveTo = direction.clone().multiplyScalar(this.explosionFactor);

                        child.position.add(moveTo);

                        this.edges.explodeEdge(child, moveTo);
                    }
                });
            }
        } else {
            this.animate = false;
            this.exploded = true;
            this.frames = 0;
        }

        this.frames++;
    }

    reset() {
        this.frames = 0;
    }
}
