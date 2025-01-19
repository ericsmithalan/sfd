import { woodTextures } from "../data";
import { IMenuItem } from "../interface";

export const mapTextureToMenu = (): Array<IMenuItem> =>
    woodTextures.map((item) => ({
        name: item.displayName,
        image: item.thumbnail,
        id: item.id,
    }));
