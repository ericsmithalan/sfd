import { IOutliner } from "../interface";
import { ITexture } from "../interface/ITexture";
import { getAllFabricTextures } from "./fabricTextures";
import { getAllMetalTextures } from "./metalTexture";
import { rootOutliner } from "./outliner";
import { getAllWoodTextures } from "./woodTextures";

export interface IData {
    defaultWoodTexture: ITexture;
    woodTextures: Array<ITexture>;
    defaultFabricTexture: ITexture;
    fabricTextures: Array<ITexture>;
    metalTextures: Array<ITexture>;
    defaultMetalTexture: ITexture;
    rootOutliner: Array<IOutliner>;
}

const wood = getAllWoodTextures();
const metal = getAllMetalTextures();
const fabric = getAllFabricTextures();

export const DATA: IData = {
    woodTextures: wood,
    defaultWoodTexture: wood[0],
    defaultFabricTexture: fabric[0],
    fabricTextures: fabric,
    metalTextures: metal,
    defaultMetalTexture: metal[0],
    rootOutliner: rootOutliner,
};
