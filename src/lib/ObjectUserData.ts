import { UserData } from "../types";

export interface IObjectUserData<T extends UserData> {
    selectable: boolean;
    outliner: T | null;
    edgeId: number | null;
    textureId: string | null;
}

export class ObjectUserData<T extends UserData> implements IObjectUserData<T> {
    constructor(
        public selectable: boolean,
        public outliner: T | null = null,
        public edgeId: number | null = null,
        public textureId: string | null = null,
    ) {
        this.selectable = selectable;
        this.outliner = outliner;
        this.edgeId = edgeId;
        this.textureId = textureId;
    }
}
