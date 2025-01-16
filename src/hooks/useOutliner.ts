import { IOutlinerContext, OutlinerContext } from "@/context";
import { useContext } from "react";

export const useOutliner = (): IOutlinerContext => {
    const context = useContext(OutlinerContext);

    return context;
};
