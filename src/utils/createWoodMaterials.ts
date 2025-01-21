import { MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";
import { ITexture } from "../interface/ITexture";

export const createSingleWoodMaterials = (texture: ITexture): Promise<MeshStandardMaterial> => {
    return new Promise(async (resolve) => {
        const loader = new TextureLoader();
        const face = await loader.loadAsync(texture.textureUrl);
        face.wrapS = RepeatWrapping;
        face.wrapT = RepeatWrapping;
        face.colorSpace = SRGBColorSpace;

        const material = new MeshStandardMaterial({ map: face });

        resolve(material);
    });
};
