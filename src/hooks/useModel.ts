import { useContext } from "react";
import { IModelContext, ModelContext } from "../context";

export const useModel = (): IModelContext => {
    const context = useContext(ModelContext);

    return context;
};
