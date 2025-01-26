import { ITexture } from "../interface/ITexture";

export type MappedTextures = Map<string, Array<ITexture>>;

export const mapTextures = (textures: Array<ITexture>): MappedTextures => {
    const map: MappedTextures = new Map();

    textures.forEach((item) => {
        const m = map.get(item.name);

        if (m) {
            m.push(item);
        } else {
            map.set(item.name, [item]);
        }
    });

    return map;
};
