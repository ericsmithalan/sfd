import { IModelOutliner, IObjectOutliner, IRootOutliner } from "@/interface";
import { IconName } from "../types";

export type UserData = IRootOutliner | IModelOutliner | IObjectOutliner;

export interface IObjectUserData<T extends UserData> {
    selectable: boolean;
    outliner: T;
}

export class ObjectUserData<T extends UserData> implements IObjectUserData<T> {
    selectable: boolean;
    outliner: T;
    constructor(props: Partial<IObjectUserData<T>>) {
        this.selectable = props.selectable || true;
        this.outliner = props.outliner as T;
    }
}
