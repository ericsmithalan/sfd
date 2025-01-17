import { IconName } from "../types";

export interface IObjectOutliner {
    id: number;
    level: number;
    name: string;
    icon: IconName;
}

export interface IModelOutliner {
    id: string;
    name: string;
    url: string;
    children: Array<IObjectOutliner>;
}

export interface IProjectOutliner {
    id: string;
    name: string;
    models: Array<IModelOutliner>;
}

export type UserData = IProjectOutliner | IModelOutliner | IObjectOutliner;

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
