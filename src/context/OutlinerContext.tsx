import { createContext, useState } from "react";
import { rootOutliner } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutletContenxt {
    viewport: Viewport;
    root: Array<IOutliner>;
}

export const OutlinerContext = createContext<IOutletContenxt>({} as IOutletContenxt);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerContextProps) => {
    const [root] = useState<Array<IOutliner>>(rootOutliner);

    return (
        <OutlinerContext.Provider value={{ viewport: viewport, root: root }}>
            {children}
        </OutlinerContext.Provider>
    );
};
