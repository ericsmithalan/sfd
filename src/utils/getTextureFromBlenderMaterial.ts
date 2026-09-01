import { MeshStandardMaterial } from "three";
import { DATA } from "../data";
import { ITexture } from "../interface/ITexture";
import { TextureType } from "../types";

export const getTextureFromBlenderMaterial = (
    material: MeshStandardMaterial,
): { type: TextureType; texture: ITexture; formattedName: string } | null => {
    const wood = material.name?.indexOf("wood") !== -1;
    const primary = material.name?.indexOf("primary") !== -1;
    const contrast = material.name?.indexOf("contrast") !== -1;
    const fabric = material.name?.indexOf("fabric") !== -1;
    const metal = material.name?.indexOf("metal") !== -1;
    const hardware = material.name?.indexOf("hardware") !== -1;

    let id = 1;

    if (material.name) {
        const regex = /[-](\d)/;
        const match = regex.exec(material.name);
        if (match) {
            id = Number(match[1]) || 1;
        }
    }

    if (wood || primary) {
        return {
            type: "wood",
            texture: DATA.woodTextures[0],
            formattedName: "Base",
        };
    }

    if (contrast) {
        return {
            type: "wood",
            texture: DATA.woodTextures[0],
            formattedName: "Accent",
        };
    }

    if (fabric) {
        return {
            type: "fabric",
            texture: DATA.fabricTextures[0],
            formattedName: "fabric",
        };
    }
    if (metal || hardware) {
        return {
            type: "metal",
            texture: DATA.metalTextures[0],
            formattedName: "metal",
        };
    }
    return null;
};
