import { woodTextures } from "../data";
import { IMenuItem } from "../interface";

export const mapTextureToMenu = (): Array<IMenuItem> =>
    woodTextures.map((item) => ({
        name: item.name,
        image: item.thumbnail,
        id: item.id,
    }));
