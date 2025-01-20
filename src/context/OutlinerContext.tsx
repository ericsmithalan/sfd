import { createContext, useState } from "react";
import { rootOutliner } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
    viewport: Viewport;
    root: Array<IOutliner>;
    project: IOutliner | null;
    model: IOutliner | null;
    setProject: (value: IOutliner | null) => void;
    setModel: (value: IOutliner | null) => void;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerContextProps) => {
    const [root] = useState<Array<IOutliner>>(rootOutliner);
    const [project, setProject] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);

    return (
        <OutlinerContext.Provider
            value={{
                viewport: viewport,
                root: root,
                project: project,
                model: model,
                setModel,
                setProject,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
