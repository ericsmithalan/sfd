import { Params } from "react-router-dom";
import { Viewport } from "../lib";
import { IOutlinerModel } from "./IOutlinerModel";
import { IOutlinerObject } from "./IOutlinerObject";
import { IOutlinerProject } from "./IOutlinerProject";

export interface IViewContext {
    params: Readonly<Params<string>>;
    viewport: Viewport;
    modelOutliner: IOutlinerModel | null;
    projectOutliner: IOutlinerProject | null;
    objectOutliner: IOutlinerObject | null;
}
