import { Config } from "@/Config";
import { IModelOutliner, IRootOutliner } from "@/interface";
import { ISelectionEvent, Viewport } from "@/lib";
import { getObjectUserData } from "@/utils";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Object3D } from "three";

export interface IOutlinerContext {
    root: Array<IRootOutliner>;
    modelOutliner: Array<IModelOutliner>;
    model: IModelOutliner | null;
    setModel: (model: IModelOutliner) => Promise<void>;
}

export const OutlinerContext = createContext<IOutlinerContext>(
    {} as IOutlinerContext
);

type OutlinerProviderProps = {
    children?: ReactNode;
    viewport: Viewport;
};

export const OutlinerProvider = ({
    children,
    viewport,
}: OutlinerProviderProps) => {
    const [rootOutline] = useState<Array<IRootOutliner>>(Config.rootOutliner);
    const [model, setModel] = useState<IModelOutliner | null>(null);
    const [modelOutliner, setModelOutliner] = useState<Array<IModelOutliner>>(
        []
    );

    const handleSetModel = async (model: IModelOutliner) => {
        const file = await viewport.gltfFile.load(model);
        if (file) {
            viewport.clear();

            const selected = modelOutliner.find((item) => item.id === model.id);

            if (selected) {
                setModel(selected);
            }
        }
        if (file.outliner) {
            setModelOutliner(file.outliner);
        }
    };

    return (
        <OutlinerContext.Provider
            value={{
                root: rootOutline,
                setModel: handleSetModel,
                modelOutliner: modelOutliner,
                model: model,
            }}
        >
            {children}
        </OutlinerContext.Provider>
    );
};
