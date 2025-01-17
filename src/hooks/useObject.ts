import { useContext } from "react";
import { Object3D } from "three";
import { IObjectContext, ObjectContext } from "../context";

export const useObject = <T extends Object3D>(): IObjectContext<T> => {
    const context = useContext(ObjectContext);

    // @ts-ignore
    return context;
};
