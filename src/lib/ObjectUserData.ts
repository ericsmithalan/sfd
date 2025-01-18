import { UserData } from "../types";

export interface IObjectUserData<T extends UserData> {
    selectable: boolean;
    outliner: T | null;
}

export class ObjectUserData<T extends UserData> implements IObjectUserData<T> {
    selectable: boolean;
    outliner: T | null;
    constructor(selectable: boolean, outliner: T | null = null) {
        this.selectable = selectable;
        this.outliner = outliner;
    }
}
