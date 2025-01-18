import { createContext, ReactNode, useEffect, useState } from "react";
import { Object3D } from "three";
import { Loading } from "../components";
import { IOutlinerModel } from "../interface";
import { IModelEvent, Viewport } from "../lib";

export interface IObjectContext<T extends Object3D = Object3D> {
    object: T | null;
}

export const ObjectContext = createContext<IObjectContext>(
    {} as IObjectContext,
);

type ObjectProviderProps = {
    children?: ReactNode;
    viewport: Viewport | null;
};

export const ObjectProvider = ({ children, viewport }: ObjectProviderProps) => {
    const [object, setObject] = useState<Object3D | null>(null);
    const [loading, setLoading] = useState<IOutlinerModel | null>(null);

    useEffect(() => {
        const modelChanged = (e: IModelEvent["changed"]) => {
            setLoading(null);
        };

        const modelLoading = (e: IModelEvent["load"]) => {
            setLoading(e.outliner);
        };

        if (viewport) {
            viewport.modelFile.addEventListener("changed", modelChanged);
            viewport.modelFile.addEventListener("load", modelLoading);
        }

        return () => {
            if (viewport) {
                viewport.modelFile.removeEventListener("changed", modelChanged);
            }
        };
    }, [viewport, object]);

    return (
        <ObjectContext.Provider
            value={{
                object: object,
            }}
        >
            {loading && <Loading message={`loading ${loading.name}...`} />}
            {children}
        </ObjectContext.Provider>
    );
};
