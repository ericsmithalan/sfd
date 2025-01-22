import { createContext, useEffect, useState } from "react";
import { Loading } from "../components";
import { IModel } from "../interface/IModel";
import { IViewportEvent, Viewport } from "../lib";

export interface IModelContext {
    viewport: Viewport;
    loading: boolean;
    model: IModel | null;
    setLoading: (loading: boolean) => void;
}

export const ModelContext = createContext<IModelContext>({} as IModelContext);

type ModelContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const ModelProvider = ({ children, viewport }: ModelContextProps) => {
    const [model, setModel] = useState<IModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
                loading: loading,
                setLoading: setLoading,
            }}
        >
            {loading && <Loading message="loading..." />}
            {children}
        </ModelContext.Provider>
    );
};
