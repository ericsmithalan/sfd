import { IOutlinerObject } from "./IOutlinerObject";

export interface IOutlinerModel {
    id: string;
    name: string;
    url: string;
    children: Array<IOutlinerObject>;
}
