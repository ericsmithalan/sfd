import { IconName } from "@/types";

export interface IObjectOutliner {
    id: number;
    level: number;
    name: string;
    icon: IconName;
}

export interface IModelOutliner {
    id: string;
    name: string;
    url: string;
    children: Array<IObjectOutliner>;
}

export interface IRootOutliner {
    id: string;
    name: string;
    models: Array<IModelOutliner>;
}
