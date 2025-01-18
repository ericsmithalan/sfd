import { Vector3 } from "three";

export interface IStats {
    size: Vector3;
    peices: number;
}

export interface IProjectContent {
    id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    stats: IStats;
}
