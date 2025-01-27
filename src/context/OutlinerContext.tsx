import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
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
    const [category, setCategory] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);
    const params = useParams();

    useEffect(() => {
        if (params.categoryId) {
            const item = DATA.rootOutliner.find((item) => item.id === Number(params.categoryId));
            setCategory(item || null);
        }

        if (category && !params.categoryId) {
            setCategory(null);
        }
    }, [category, params.categoryId]);

    useEffect(() => {
        if (category) {
            const loadModel = async (obj: IOutliner) => {
                await viewport.loadModel(obj);
                setModel(obj);
                console.log("loaded");
            };

            if (category && params.modelId && model?.id !== Number(params.modelId)) {
                const model =
                    category?.children?.find((item) => item.id === Number(params.modelId)) || null;

                if (model) {
                    loadModel(model);
                } else {
                    setModel(null);
                }
            }

            if (model && !params.modelId) {
                setModel(null);
                viewport.model = null;
            }
        }
    }, [model, params.modelId, category, viewport]);

    return (
        <OutlinerContext.Provider
            value={{
                categories: DATA.rootOutliner,
                model: model,
                isMobile: isMobile,
                category: category,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
