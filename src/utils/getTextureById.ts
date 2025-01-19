import { woodTextures } from "../data";
import { ITexture } from "../interface/ITexture";

export const getTextureById = (id: string): ITexture | null => {
    const result = woodTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultTexture = getTextureById("6b436d8e-87a9-49c0-80b7-422f3e3b2fea");
