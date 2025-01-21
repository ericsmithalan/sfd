import { IImageResource } from "./IImageResource";
import { IStat } from "./IStats";

export interface IOutliner {
    id: number;
    level: number;
    categories?: Array<string>;
    name: string;
    modelUrl?: string;
    models?: Array<IOutliner>;
    imageResouce?: IImageResource;
    children?: Array<IOutliner>;
    stats?: Array<IStat>;
}
