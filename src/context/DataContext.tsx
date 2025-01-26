import {
    getAllFabricTextures,
    getAllMetalTextures,
    getAllWoodTextures,
    rootOutliner,
} from "@/data";
import { IOutliner, ITexture } from "@/interface";
import { createContext, useState } from "react";

export interface IDataContext {
    woodTextures: Array<ITexture>;
    metalTextures: Array<ITexture>;
    fabricTextures: Array<ITexture>;
    outliner: Array<IOutliner>;
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

type Props = {
    children?: React.ReactNode;
};

export const DataProviderProvider = ({ children }: Props) => {
    const [outliner] = useState<Array<IOutliner>>(rootOutliner);
    const [woodTextures] = useState<Array<ITexture>>(getAllWoodTextures());
    const [fabricTextures] = useState<Array<ITexture>>(getAllFabricTextures());
    const [metalTextures] = useState<Array<ITexture>>(getAllMetalTextures());

    return (
        <DataContext.Provider
            value={{
                outliner: outliner,
                woodTextures: woodTextures,
                fabricTextures: fabricTextures,
                metalTextures: metalTextures,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
