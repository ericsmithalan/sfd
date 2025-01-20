import { IOutlinerObject } from "./IOutlinerObject";

interface IOutlinerTexture {
    name: string;
}

export interface IOutlinerModel {
    id: string;
    name: string;
    url: string;
    children: Array<IOutlinerObject>;
    // textures: IOutlinerTexture;
}
