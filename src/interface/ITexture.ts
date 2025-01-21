export interface ITexture {
    id: string;
    resolution: number;
    type: "wood" | "fabric" | "hardware";
    name: string;
    displayName: string;
    thumbnail: string;
    textureUrl: string;
}
