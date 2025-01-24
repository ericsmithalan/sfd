import { IImageResource } from "./IImageResource";
import { IStat } from "./IStats";

export interface IOutliner {
    group?: boolean;
    id: number;
    level?: number;
    parentId?: number;
    name: string;
    displayName?: string;
    modelUrl?: string;
    imageResouce?: IImageResource;
    children?: Array<IOutliner>;
    stats?: Array<IStat>;
}
