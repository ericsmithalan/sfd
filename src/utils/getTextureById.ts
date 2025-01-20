import { woodTextures } from "../data";
import { ITexture } from "../interface/ITexture";

export const getTextureById = (id: string): ITexture | null => {
    const result = woodTextures.find((texture) => texture.id === id);
    return result || null;
};

export const defaultTexture = getTextureById("0a875cc1-3233-4896-a0b8-b8b3b1b7c59b");
