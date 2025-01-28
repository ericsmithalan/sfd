import { Easing, Tween, Group as TweenGroup } from "@tweenjs/tween.js";
import {
    Box3,
    Box3Helper,
    BoxGeometry,
    EventDispatcher,
    Group,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    Scene,
    Vector3,
} from "three";
import { AnimationState } from "../types";
import { Edges } from "./Edges";
export interface IExploderEvent {
    animated: { type: string; state: AnimationState; running: boolean };
}

export class Exploder extends EventDispatcher<IExploderEvent> {
    private mesh: Object3D;
    private edges: Edges;
    private center: Vector3;
    private tweenGroup = new TweenGroup();
    private _animating: boolean = false;
    private scene: Scene | null = null;
    private multiplier = 1;

    exploded: boolean = false;
    state: AnimationState = "closed";

    constructor(mesh: Object3D, edges: Edges) {
        super();
        this.mesh = mesh;
        this.edges = edges;

        const meshBox = new Box3();
        meshBox.setFromObject(this.mesh);
        const size = meshBox.getSize(new Vector3());
        const center = meshBox.getCenter(new Vector3());
        this.center = center;

        this.multiplier = size.y / 2;

        this.scene = this.mesh.parent as Scene;

        // this.createHelpers(meshBox);
    }

    private createHelpers(box3: Box3) {
        const helper = new Box3Helper(box3, "red");
        const centerRef = new Mesh(
            new BoxGeometry(0.01, 0.01, 0.01),
            new MeshBasicMaterial({ color: "blue" }),
        );

        centerRef.position.copy(this.center);

        if (this.scene) {
            this.scene.add(helper, centerRef);
        }
    }

    play() {
        if (!this.animating) {
            this.tweenGroup.removeAll();
            console.log("should play");

            this.mesh.traverse((child) => {
                if (child instanceof Mesh) {
                    const meshInfo = this.getMeshTweenInfo(child);
                    let edgeTween: Tween | null = null;

                    if (meshInfo.edge) {
                        edgeTween = new Tween(meshInfo.edge.position)
                            .to(meshInfo.to, 1000)
                            .easing(Easing.Quadratic.InOut)
                            .repeat(0);
                    }

                    const meshTween = new Tween(child.position)
                        .to(meshInfo.to, 1000)
                        .easing(Easing.Quadratic.InOut)
                        .repeat(0);

                    meshTween.onComplete(() => {
                        if (this.animating) {
                            this.animating = false;
                            if (this.exploded) {
                                this.exploded = false;
                            } else {
                                this.exploded = true;
                            }
                        }
                    });

                    if (edgeTween) {
                        this.tweenGroup.add(edgeTween);
                        edgeTween.start();
                    }

                    this.tweenGroup.add(meshTween);
                    meshTween.start();

                    this.animating = true;
                }
            });
        }
    }

    getMeshTweenInfo(mesh: Mesh): { to: Vector3; edge: Object3D | null } {
        if (!mesh.geometry.boundingSphere) {
            mesh.geometry.computeBoundingSphere();
        }

        // const pos = mesh.getWorldPosition(new Vector3());

        mesh.userData.oldPosition =
            mesh.userData.oldPosition || mesh.geometry.boundingSphere?.center.clone();

        let direction = mesh.userData.oldPosition.clone().sub(this.center).normalize();

        let to: Vector3 = direction.clone().multiplyScalar(this.exploded ? 0 : this.multiplier);

        const edge = this.edges.get(mesh) || null;

        return {
            to: to,
            edge: edge,
        };
    }

    get animating() {
        return this._animating;
    }

    animateExplosion() {
        if (this.animating) {
            this.tweenGroup.update();
        }
    }

    createTween(mesh: Mesh): { edge: Object3D | null; to: Vector3 } {
        if (!mesh.geometry.boundingSphere) {
            mesh.geometry.computeBoundingSphere();
        }

        const edge = this.edges.get(mesh) || null;

        mesh.userData.oldPosition =
            mesh.userData.oldPosition || mesh.geometry.boundingSphere?.center.clone();

        const direction = mesh.userData.oldPosition.clone().sub(this.center).normalize();
        const moveTo: Vector3 = direction.clone().multiplyScalar(0.3);

        return {
            to: moveTo,
            edge: edge,
        };
    }

    set animating(value: boolean) {
        this._animating = value;
        this.dispatchEvent({ type: "animated", running: value, state: this.state });
    }

    private getObjectInfo(obj: Object3D) {
        const childBox = new Box3();
        const groupBox = new Box3();
        const center = new Vector3();
        const size = new Vector3();

        if (obj.parent) {
            this.scene = obj.parent as Scene;
        }

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
            groupBox: groupBox,
        };
    }
}
