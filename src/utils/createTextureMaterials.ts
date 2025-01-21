import { Color, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";
import { ITexture } from "../interface/ITexture";

export const createTextureMaterials = (texture: ITexture): Promise<MeshStandardMaterial> => {
    return new Promise(async (resolve) => {
        if (texture.color) {
            const material = new MeshStandardMaterial({
                color: new Color(texture.color),
                metalness: 0.6,
                roughness: 0.2,
            });
            resolve(material);
        } else {
            const loader = new TextureLoader();
            const face = await loader.loadAsync(texture.textureUrl);
            face.wrapS = RepeatWrapping;
            face.wrapT = RepeatWrapping;
            face.colorSpace = SRGBColorSpace;

            const material = new MeshStandardMaterial({ map: face });

            resolve(material);
        }
    });
};
