import { Box3, EventDispatcher, Group, Mesh, Object3D, Vector3 } from "three";
import { AnimationState } from "../types";
import { Edges } from "./Edges";

export interface IExploderEvent {
    animated: { type: string; state: AnimationState; running: boolean };
}

export class Exploder extends EventDispatcher<IExploderEvent> {
    private mesh: Object3D;
    private edges: Edges;
    private center = new Vector3(0, 0, 0);
    private explosionFactor = 0.001;
    private frames = 0;
    private maxFrames = 180;
    exploded: boolean = false;
    state: AnimationState = "closed";

    private _animate: boolean = false;

    constructor(mesh: Object3D, edges: Edges) {
        super();
        this.mesh = mesh;
        this.edges = edges;
        const info = this.getObjectInfo(mesh);
        const max = info.size.max(new Vector3());
        console.log(max);
        this.explosionFactor = max.z > 2 ? 0.002 : 0.001;
        this.maxFrames = max.z > 2 ? 180 : 180;
        this.center = info.center;
    }

    get animate() {
        return this._animate;
    }

    set animate(value: boolean) {
        this._animate = value;
        this.dispatchEvent({ type: "animated", running: value, state: this.state });
    }

    private getObjectInfo(obj: Object3D) {
        const childBox = new Box3();
        const groupBox = new Box3();
        const center = new Vector3();
        const size = new Vector3();

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

            const box = new Box3().setFromObject(obj);
            box.getSize(size);
            // All computations are in world space
            // But the group might not be in world space
            groupBox.applyMatrix4(obj.matrixWorld.invert());
            groupBox.getCenter(center);
        }
        return {
            center: center,
            size: size,
        };
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
            if (this.animate) {
                this.state = "closed";
                this.exploded = false;
                this.frames = 0;
                this.animate = false;
            }
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
            if (this.animate) {
                this.state = "opened";
                this.exploded = true;
                this.frames = 0;
                this.animate = false;
            }
        }

        this.frames++;
    }

    reset() {
        this.frames = 0;
    }
}
