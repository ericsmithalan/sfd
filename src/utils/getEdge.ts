import { Object3D } from "three";
import { ObjectUserData, Viewport } from "../lib";

export const getEdge = (viewport: Viewport, id: number): Object3D | null => {
    const edges = viewport.modelFile.edges;
    let edge: Object3D | null = null;

    if (edges) {
        edges.traverse((item) => {
            if (item.userData instanceof ObjectUserData) {
                if (id === item.userData.edgeId) {
                    edge = item;
                    return;
                }
            }
        });
    }

    return edge;
};
