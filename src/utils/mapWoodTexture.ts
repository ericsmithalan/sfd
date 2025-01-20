import { ITexture } from "../interface/ITexture";

export const mapWoodTexture = (
    id: string,
    type: string,
    variant: number,
    displayName: string,
    size: number,
    basePath: string,
): ITexture => {
    return {
        id: id,
        type: type,
        name: displayName,
        thumbnail: `${basePath}/${type}/${type}-${variant}-thumb.png`,
        faceUrl: `${basePath}/${type}/${type}-${variant}-face-${size}.png`,
        endUrl: `${basePath}/${type}/${type}-${variant}-end-${size}.png`,
        sideUrl: `${basePath}/${type}/${type}-${variant}-side-${size}.png`,
        resolution: size,
    };
};
