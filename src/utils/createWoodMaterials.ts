import { MeshBasicMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";
import { ITexture } from "../interface/ITexture";

export const createWoodMaterials = (texture: ITexture): Promise<MeshBasicMaterial[]> => {
    return new Promise(async (resolve) => {
        const loader = new TextureLoader();
        const face = await loader.loadAsync(texture.faceUrl);
        face.wrapS = RepeatWrapping;
        face.wrapT = RepeatWrapping;
        face.colorSpace = SRGBColorSpace;

        const side = await loader.loadAsync(texture.sideUrl);
        side.wrapS = RepeatWrapping;
        side.wrapT = RepeatWrapping;
        side.colorSpace = SRGBColorSpace;

        const end = await loader.loadAsync(texture.endUrl);
        end.wrapS = RepeatWrapping;
        end.wrapT = RepeatWrapping;
        end.colorSpace = SRGBColorSpace;

        const cubeMaterials = [
            new MeshBasicMaterial({ map: side }), //right side
            new MeshBasicMaterial({ map: side }), //left side

            new MeshBasicMaterial({ map: face }), //front side
            new MeshBasicMaterial({ map: face }), //back side
            new MeshBasicMaterial({ map: end }), //top side
            new MeshBasicMaterial({ map: end }), //bottom side
        ];

        resolve(cubeMaterials);
    });
};
