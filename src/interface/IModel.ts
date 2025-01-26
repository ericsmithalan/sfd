import { AnimationClip, Group, Object3D } from "three";
import { IObjectMaterial } from "./IObjectMaterial";
import { IOutliner } from "./IOutliner";

export interface IModel {
    object: Object3D;
    outliner: IOutliner;
    edges: Group;
    materials: Map<string, IObjectMaterial>;
    animations: AnimationClip[];
}
