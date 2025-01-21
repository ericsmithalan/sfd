import { IImageResource } from "./IImageResource";
import { IStat } from "./IStats";

export interface IOutliner {
    id: number;
    level: number;
    name: string;
    modelUrl?: string;
    imageResouce?: IImageResource;
    children?: Array<IOutliner>;
    stats?: Array<IStat>;
}
