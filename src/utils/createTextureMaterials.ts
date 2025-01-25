import { Material, MeshStandardMaterial, Texture } from "three";
import { ITexture } from "../interface/ITexture";
import { TextureResolution } from "../types";
import { formatTextureUrl } from "./formatTextureUrl";
import { loadTexture } from "./loadTexture";

export const createTextureMaterials = async (
    texture: ITexture,
    environment: Texture | null,
    resolution: TextureResolution,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        let material: Material;

        const url = formatTextureUrl(texture.basic.url, resolution);
        const textr = await loadTexture(url);

        material = new MeshStandardMaterial({
            envMap: environment,
            envMapIntensity: 1,
            map: textr,
            metalness: texture.type === "metal" || texture.type === "hardware" ? 1 : 0,
            roughness: texture.type === "metal" || texture.type === "hardware" ? 0.2 : 0.6,
            // shadowSide: DoubleSide,
            // depthTest: true,
            // depthWrite: true,
            // side: DoubleSide,
        });

        if (textr) {
            textr.dispose();
        }

        resolve(material);
    });
};
