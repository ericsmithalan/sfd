import { useContext } from "react";
import { IViewportContext, ViewportContext } from "../context";

export const useViewport = (): IViewportContext => {
    const context = useContext(ViewportContext);

    return context;
};
