import { AnimationClip, Object3D } from "three";
import { Edges } from "../lib";
import { IObjectMaterial } from "./IObjectMaterial";
import { IOutliner } from "./IOutliner";

export interface IModel {
    object: Object3D;
    outliner: IOutliner;
    edges: Edges;
    materials: Map<string, IObjectMaterial>;
    animations: Array<AnimationClip> | null;
}
