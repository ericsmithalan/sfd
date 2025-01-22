import {
    Color,
    DoubleSide,
    Material,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    NoColorSpace,
    RepeatWrapping,
    RGBAFormat,
    SRGBColorSpace,
    Texture,
    TextureLoader,
    Vector2,
} from "three";
import { ITexture } from "../interface/ITexture";
import { TextureResolution } from "../types";

const loader = new TextureLoader();
const formatUrl = (url: string, resolution: TextureResolution) => {
    return `${url}-${resolution}.png`;
};

const getRepeat = (resolution: TextureResolution): Vector2 => {
    switch (resolution) {
        case "1k":
            return new Vector2(1, 1);
        case "2k":
            return new Vector2(1, 1);
        case "3k":
            return new Vector2(1, 1);
        case "4k":
            return new Vector2(1, 1);
    }
};

export const createTextureMaterials = async (
    texture: ITexture,
    environment: Texture | null,
    resolution: TextureResolution,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        let material: Material;
        let repeat = getRepeat(resolution);

        if (resolution !== "1k") {
            material = await getPBRTexture(texture, environment, resolution);
            resolve(material);
        } else {
            const textr = await loader.loadAsync(formatUrl(texture.basic.url, resolution));
            textr.wrapS = RepeatWrapping;
            textr.wrapT = RepeatWrapping;
            textr.colorSpace = SRGBColorSpace;
            textr.repeat.set(repeat.x, repeat.y);

            material = new MeshStandardMaterial({
                map: textr,
                metalness: texture.type === "metal" || texture.type === "hardware" ? 1 : 0,
                roughness: 0.4,
                shadowSide: DoubleSide,
            });

            textr.dispose();
            resolve(material);
        }
    });
};

const getPBRTexture = async (
    texture: ITexture,
    environment: Texture | null,
    resolution: TextureResolution,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        const anisotropy = 0.3;
        const wrap = RepeatWrapping;
        let repeat = getRepeat(resolution);

        const color = await loader.loadAsync(formatUrl(texture.pbr.color, resolution));
        color.format = RGBAFormat;
        color.wrapS = wrap;
        color.wrapT = wrap;
        color.anisotropy = anisotropy;
        color.repeat.set(repeat.x, repeat.y);
        color.colorSpace = SRGBColorSpace;
        color.needsUpdate = true;

        const bump = await loader.loadAsync(formatUrl(texture.pbr.bump, resolution));
        bump.format = RGBAFormat;
        bump.wrapS = wrap;
        bump.wrapT = wrap;
        bump.anisotropy = anisotropy;
        bump.repeat.set(repeat.x, repeat.y);
        bump.needsUpdate = true;
        bump.colorSpace = NoColorSpace;

        const normal = await loader.loadAsync(formatUrl(texture.pbr.normal, resolution));
        normal.format = RGBAFormat;
        normal.wrapS = wrap;
        normal.wrapT = wrap;
        normal.anisotropy = anisotropy;
        normal.repeat.set(repeat.x, repeat.y);
        normal.needsUpdate = true;
        normal.colorSpace = NoColorSpace;

        const rough = await loader.loadAsync(formatUrl(texture.pbr.rough, resolution));
        rough.format = RGBAFormat;
        rough.wrapS = wrap;
        rough.wrapT = wrap;
        rough.anisotropy = anisotropy;
        rough.repeat.set(repeat.x, repeat.y);
        rough.needsUpdate = true;
        rough.colorSpace = NoColorSpace;

        let ao: Texture | null = null;
        let metal: Texture | null = null;

        if (texture.pbr.metal) {
            metal = await loader.loadAsync(formatUrl(texture.pbr.metal, resolution));
            metal.format = RGBAFormat;
            metal.wrapS = wrap;
            metal.wrapT = wrap;
            metal.anisotropy = anisotropy;
            metal.repeat.set(repeat.x, repeat.y);
            metal.colorSpace = NoColorSpace;
            metal.needsUpdate = true;
        }

        if (texture.pbr.ao) {
            ao = await loader.loadAsync(formatUrl(texture.pbr.ao, resolution));
            ao.format = RGBAFormat;
            ao.wrapS = wrap;
            ao.wrapT = wrap;
            ao.anisotropy = anisotropy;
            ao.repeat.set(repeat.x, repeat.y);
            ao.colorSpace = NoColorSpace;
            ao.needsUpdate = true;
        }

        const material = new MeshPhysicalMaterial({
            map: color,
            envMap: environment,
            metalnessMap: metal,
            metalness: metal ? 1 : 0,
            roughnessMap: rough,
            roughness: 1,
            normalMap: normal,
            normalScale: new Vector2(0.15, 0.15),
            bumpMap: bump,
            specularColor: new Color("#ffffff"),
            specularIntensity: 1,
            // specularIntensityMap: rough,
            ior: 1.52,
            bumpScale: 1,
            aoMap: ao,
            aoMapIntensity: ao ? 1 : 0,
            shadowSide: DoubleSide,
        });

        rough.dispose();
        normal.dispose();
        color.dispose();
        bump.dispose();
        ao?.dispose();
        metal?.dispose();

        resolve(material);
    });
};
