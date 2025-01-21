import { useContext } from "react";
import { IOutlinerContext, OutlinerContext } from "../context";

export const useOutliner = (): IOutlinerContext => {
    const context = useContext(OutlinerContext);

    return context;
};
