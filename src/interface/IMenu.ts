import { MouseEvent } from "react";
import { IconName } from "../types";

export interface IMenuItem {
    id?: string;
    name: string;
    icon?: IconName;
    image?: string;
    onClick?: (tool: IMenuItem, e: MouseEvent) => void;
}

export interface IMenu {
    items: Array<IMenuItem>;
}
