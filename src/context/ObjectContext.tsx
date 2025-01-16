import { ISelectionEvent, Viewport } from "@/lib";
import { getObjectUserData } from "@/utils";
import { ReactNode, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Object3D } from "three";

export interface IObjectContext<T extends Object3D = Object3D> {
    object: T | null;
    setObject: (object: T | null) => void;
}

export const ObjectContext = createContext<IObjectContext>(
    {} as IObjectContext
);

type ObjectProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export type ObjectState = {};

export const ObjectProvider = ({ children, viewport }: ObjectProviderProps) => {
    const [object, setObject] = useState<Object3D | null>(null);

    const navigate = useNavigate();

    const handleSetObject = <T extends Object3D | null>(obj: T) => {
        setObject(obj);
    };

    useEffect(() => {
        const selectionChange = (e: ISelectionEvent["selectionChange"]) => {
            handleSetObject(e.object);

            if (e.object) {
                const outlinerUserData = getObjectUserData(
                    viewport,
                    e.object.id
                );

                if (outlinerUserData) {
                    navigate(`/viewer/mesh/${e.object.id}`);
                } else {
                    navigate(`/viewer`);
                }
            } else {
                navigate(`/viewer`);
            }
        };

        viewport.selection.addEventListener("selectionChange", selectionChange);

        return () => {
            viewport.selection.removeEventListener(
                "selectionChange",
                selectionChange
            );
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
