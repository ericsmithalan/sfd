import { createContext, useState } from "react";
import { DATA } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
    viewport: Viewport;
    categories: Array<IOutliner>;
    category: IOutliner | null;
    model: IOutliner | null;
    isMobile: boolean;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
    isMobile: boolean;
};

export const OutlinerProvider = ({ children, viewport, isMobile }: OutlinerContextProps) => {
    const [categories] = useState<Array<IOutliner>>(DATA.rootOutliner);
    const [category, setCategory] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);

    // useEffect(() => {
    //     if (params.categoryId) {
    //         const item = categories.find((item) => item.id === Number(params.categoryId));
    //         setCategory(item || null);
    //     }

    //     if (category && !params.categoryId) {
    //         setCategory(null);
    //     }
    // }, [categories, category, params.categoryId]);

    // useEffect(() => {
    //     const loadModel = async (obj: IOutliner) => {
    //         await viewport.loadModel(obj);
    //     };

    //     if (params.modelId) {
    //         const model = category?.children?.find((item) => item.id === Number(params.modelId));

    //         setModel(model || null);

    //         if (model) {
    //             loadModel(model);
    //         }
    //     }

    //     if (model && !params.modelId) {
    //         setModel(null);
    //         viewport.model = null;
    //     }
    // }, [model, params.modelId, category, viewport]);

    return (
        <OutlinerContext.Provider
            value={{
                viewport: viewport,
                categories: categories,
                model: model,
                isMobile: isMobile,
                category: category,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
