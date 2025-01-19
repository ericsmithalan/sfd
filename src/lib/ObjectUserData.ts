import { UserData } from "../types";

export interface IObjectUserData<T extends UserData> {
    selectable: boolean;
    outliner: T | null;
    edgeId: number | null;
}

export class ObjectUserData<T extends UserData> implements IObjectUserData<T> {
    selectable: boolean;
    outliner: T | null;
    edgeId: number | null;

    constructor(selectable: boolean, outliner: T | null = null, edgeId: number | null = null) {
        this.selectable = selectable;
        this.outliner = outliner;
        this.edgeId = edgeId;
    }
}
