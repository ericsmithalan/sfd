import { UserData } from "../types";

export interface IObjectUserData<T extends UserData> {
    selectable: boolean;
    outliner: T | null;
}

export class ObjectUserData<T extends UserData> implements IObjectUserData<T> {
    selectable: boolean;
    outliner: T | null;
    constructor(props: Partial<IObjectUserData<T>>) {
        this.selectable = props.selectable || true;
        this.outliner = (props.outliner as T) || null;
    }
}
