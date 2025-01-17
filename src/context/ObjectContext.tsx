import { createContext, ReactNode, useEffect, useState } from "react";
import { Object3D } from "three";
import { ISelectionEvent, Viewport } from "../lib";

export interface IObjectContext<T extends Object3D = Object3D> extends ObjectState {
    object: T | null;
    setObject: (object: T | null) => void;
}

export const ObjectContext = createContext<IObjectContext>({} as IObjectContext);

type ObjectProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export type ObjectState = {};

export const ObjectProvider = ({ children, viewport }: ObjectProviderProps) => {
    const [object, setObject] = useState<Object3D | null>(null);

    const handleSetObject = <T extends Object3D | null>(obj: T) => {
        setObject(obj);
    };

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            handleSetObject(e.object);

            // if (e.object) {
            //     const outlinerUserData = getObjectUserData<IOutlinerObject>(viewport, e.object.id);

            //     if (outlinerUserData) {
            //         navigate(`/edit/${outlinerUserData.id}/${e.object.id}`);
            //     } else {
            //         navigate(`/edit`);
            //     }
            // } else {
            //     navigate(`/edit`);
            // }
        };

        viewport.selection.addEventListener("selectionChange", selectionChange);

        return () => {
            viewport.selection.removeEventListener("selectionChange", selectionChange);
        };
    }, [viewport, object]);

    return (
        <ObjectContext.Provider
            value={{
                object: object,
                setObject: handleSetObject,
            }}
        >
            {children}
        </ObjectContext.Provider>
    );
};
