import { IImageResource } from "./IImageResource";
import { IOutlinerModel } from "./IOutlinerModel";

export interface IOutlinerProject {
    id: string;
    name: string;
    models: Array<IOutlinerModel>;
    image: IImageResource;
}
