import { createContext, useEffect, useState } from "react";
import { IModel } from "../interface/IModel";
import { IViewportEvent, Viewport } from "../lib";

export interface IModelContext {
    model: IModel | null;
}

export const ModelContext = createContext<IModelContext>({} as IModelContext);

type ModelContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const ModelProvider = ({ children, viewport }: ModelContextProps) => {
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
                model: model,
            }}
        >
            {children}
        </ModelContext.Provider>
    );
};
