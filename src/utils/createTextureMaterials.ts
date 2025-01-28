import { Material, MeshStandardMaterial, Texture } from "three";
import { ITexture } from "../interface/ITexture";
import { AppCache } from "../lib";
import { TextureResolution } from "../types";
import { formatTextureUrl } from "./formatTextureUrl";
import { loadTexture } from "./loadTexture";

const cached = new AppCache<number, Material>();

export const createTextureMaterials = async (
    texture: ITexture,
    environment: Texture | null,
    resolution: TextureResolution,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        let material: Material;

        const cache = cached.get(texture.id);

        if (cache) {
            return resolve(cache);
        } else {
            const url = formatTextureUrl(texture.basic.url, resolution);
            const textr = await loadTexture(url);

            material = new MeshStandardMaterial({
                envMap: environment,
                envMapIntensity: 1,
                map: textr,
                metalness: texture.type === "metal" || texture.type === "hardware" ? 1 : 0,
                roughness: texture.type === "metal" || texture.type === "hardware" ? 0.1 : 0.4,
            });

            if (textr) {
                textr.dispose();
            }

            cached.set(texture.id, material);

            resolve(material);
        }
    });
};
