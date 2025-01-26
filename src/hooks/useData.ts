import { useContext } from "react";
import { DataContext, IDataContext } from "../context";

export const useData = (): IDataContext => {
    const context = useContext(DataContext);

    return context;
};
