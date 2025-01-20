import { createContext, useState } from "react";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutletContenxt {
    root: IOutliner;
}

export const OutlinerContext = createContext<IOutletContenxt>({} as IOutletContenxt);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerContextProps) => {
    const [root, setRoot] = useState<IOutliner>({} as IOutliner);

    return <OutlinerContext.Provider value={{ root: root }}>{children}</OutlinerContext.Provider>;
};
