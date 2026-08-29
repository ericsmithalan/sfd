import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATA } from "../data";
import { IOutliner } from "../interface";
import { Viewport } from "../lib";

export interface IOutlinerContext {
    categories: Array<IOutliner>;
    category: IOutliner | null;
    model: IOutliner | null;
    models: Array<IOutliner>;
}

export const OutlinerContext = createContext<IOutlinerContext>({} as IOutlinerContext);

type OutlinerContextProps = {
    viewport: Viewport;
    children?: React.ReactNode;
};

export const OutlinerProvider = ({ children, viewport }: OutlinerContextProps) => {
    const [category, setCategory] = useState<IOutliner | null>(null);
    const [model, setModel] = useState<IOutliner | null>(null);
    const [models, setModels] = useState<Array<IOutliner>>([]);
    const params = useParams();

    useEffect(() => {
        const ms = new Array<IOutliner>();

        if (DATA) {
            for (let categ of DATA.rootOutliner) {
                if (categ.children) {
                    categ.children.forEach((mod) => {
                        if (mod) {
                            mod.parentId = categ.id;
                            mod.parentName = categ.name;
                            ms.push(mod);
                        }
                    });
                }
            }

            setModels(ms);
        }
    }, [setModels]);

    useEffect(() => {
        if (params.categoryName) {
            const item = DATA.rootOutliner.find((item) => item.name === params.categoryName);
            setCategory(item || null);
        }

        if (category && !params.categoryName) {
            setCategory(null);
        }
    }, [category, params.categoryName]);

    useEffect(() => {
        if (category) {
            const loadModel = async (obj: IOutliner) => {
                await viewport.loadModel(obj);
                setModel(obj);
            };

            if (category && params.modelName && model?.name !== params.modelName) {
                const model =
                    category?.children?.find((item) => item.name === params.modelName) || null;

                if (model) {
                    loadModel(model);
                } else {
                    setModel(null);
                }
            }

            if (model && !params.modelName) {
                setModel(null);
                viewport.model = null;
            }
        }
    }, [model, category, viewport, params.modelName]);

    return (
        <OutlinerContext.Provider
            value={{
                categories: DATA.rootOutliner,
                model: model,
                category: category,
                models: models,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
