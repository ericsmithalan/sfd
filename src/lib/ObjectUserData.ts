import { IconName } from "../types";

export interface IOutlinerUserData {
    isModel: boolean;
    url: string;
    name: string;
    icon: IconName;
    children: Array<IOutlinerUserData>;
}

export interface IObjectUserData {
    selectable: boolean;
    outliner: IOutlinerUserData | null;
}

export class ObjectUserData implements IObjectUserData {
    selectable: boolean;
    outliner: IOutlinerUserData | null;
    constructor(props: Partial<IObjectUserData>) {
        this.selectable = props.selectable || true;
        this.outliner = props.outliner || null;
    }
}
