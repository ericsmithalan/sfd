import { createContext, ReactNode, useEffect, useState } from "react";
import { Object3D } from "three";
import { Loading } from "../components";
import { IModelEvent, ISelectionEvent, Viewport } from "../lib";

export interface IObjectContext<T extends Object3D = Object3D> {
    object: T | null;
    model: Object3D | null;
    loading: boolean;
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
    const [model, setModel] = useState<Object3D | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            setObject(e.object);
        };

        const modelChanged = (e: IModelEvent["changed"]) => {
            setModel(e.model);
            setLoading(false);
        };

        const modelLoading = (e: IModelEvent["load"]) => {
            setLoading(true);
        };

        if (viewport) {
            viewport.selection.addEventListener(
                "selectionChange",
                selectionChange,
            );
            viewport.modelFile.addEventListener("changed", modelChanged);
            viewport.modelFile.addEventListener("load", modelLoading);
        }

        return () => {
            if (viewport) {
                viewport.modelFile.removeEventListener("changed", modelChanged);
                viewport.selection.removeEventListener(
                    "selectionChange",
                    selectionChange,
                );
            }
        };
    }, [viewport, object]);

    return (
        <ObjectContext.Provider
            value={{
                object: object,
                model: model,
                loading: loading,
            }}
        >
            {loading && <Loading message="loading" />}
            {children}
        </ObjectContext.Provider>
    );
};
