import { createContext, useEffect, useState } from "react";
import { IModel } from "../interface/IModel";
import { IViewportEvent, Viewport } from "../lib";

export interface IModelContext {
    viewport: Viewport;
    model: IModel | null;
    isMobile: boolean;
}

export const ModelContext = createContext<IModelContext>({} as IModelContext);

type ModelContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
    isMobile: boolean;
};

export const ModelProvider = ({ children, viewport, isMobile }: ModelContextProps) => {
    const [model, setModel] = useState<IModel | null>(null);

    useEffect(() => {
        const modelChanged = (e: IViewportEvent["modelChanged"]) => {
            setModel(e.model);
        };

        viewport.addEventListener("modelChanged", modelChanged);

        return () => {
            viewport.removeEventListener("modelChanged", modelChanged);
        };
    }, [viewport]);

    return (
        <ModelContext.Provider
            value={{
                viewport: viewport,
                model: model,
                isMobile: isMobile,
            }}
        >
            {children}
        </ModelContext.Provider>
    );
};
