import { TextureResolution } from "../types";

export const formatTextureUrl = (url: string, resolution: TextureResolution) => {
    return `${url}-${resolution}.png`;
};
