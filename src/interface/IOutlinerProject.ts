import { IOutlinerModel } from "./IOutlinerModel";

export interface IOutlinerProject {
    id: string;
    name: string;
    models: Array<IOutlinerModel>;
}
