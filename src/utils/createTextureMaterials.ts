import {
    Color,
    DoubleSide,
    Material,
    MeshStandardMaterial,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";
import { ITexture } from "../interface/ITexture";

export const createTextureMaterials = (texture: ITexture): Promise<Material> => {
    return new Promise(async (resolve) => {
        if (texture.type === "metal" || (texture.type === "hardware" && texture.color)) {
            const material = new MeshStandardMaterial({
                color: new Color(texture.color),
                metalness: 0.0,
                roughness: 0.7,
            });

            resolve(material);
        } else {
            const loader = new TextureLoader();
            const face = await loader.loadAsync(texture.textureUrl);
            face.wrapS = RepeatWrapping;
            face.wrapT = RepeatWrapping;
            face.colorSpace = SRGBColorSpace;

            const material = new MeshStandardMaterial({
                map: face,
                metalness: 0,
                roughness: 0.1,
                shadowSide: DoubleSide,
            });

            resolve(material);
        }
    });
};
