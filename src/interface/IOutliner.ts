import { IImageResource } from "./IImageResource";
import { IStat } from "./IStats";

export interface IOutliner {
    parentName?: string;
    parentId?: number;
    group?: boolean;
    id: number;
    level?: number;
    name: string;
    displayName?: string;
    modelUrl?: string;
    imageResouce?: IImageResource;
    children?: Array<IOutliner>;
    stats?: Array<IStat>;
}
