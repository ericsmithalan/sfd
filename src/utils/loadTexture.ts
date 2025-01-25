import { RGBAFormat, RepeatWrapping, SRGBColorSpace, Texture, TextureLoader } from "three";

const loader = new TextureLoader();

export const loadTexture = async (url: string | null): Promise<Texture | null> => {
    if (url) {
        const texture = await loader.loadAsync(url).catch((e) => {
            console.log(e);
        });

        if (texture) {
            texture.format = RGBAFormat;
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            // texture.anisotropy = 1;
            texture.repeat.set(1, 1);
            texture.colorSpace = SRGBColorSpace;
            return texture;
        }
    }
    return null;
};
