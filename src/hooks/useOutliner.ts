import { useContext } from "react";
import { IOutletContenxt, OutlinerContext } from "../context";

export const useOutliner = (): IOutletContenxt => {
    const context = useContext(OutlinerContext);

    // @ts-ignore
    return context;
};
