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

        let ao: Texture | null = null;
        let metal: Texture | null = null;
        let color: Texture | null = null;
        let bump: Texture | null = null;
        let normal: Texture | null = null;
        let rough: Texture | null = null;
        let coat: Texture | null = null;
        let coatRoughness: Texture | null = null;
        let coatNormal: Texture | null = null;
        let specular: Texture | null = null;

        if (texture.pbr.color) {
            color = await loader.loadAsync(formatUrl(texture.pbr.color, resolution));
            color.format = RGBAFormat;
            color.wrapS = wrap;
            color.wrapT = wrap;
            color.anisotropy = anisotropy;
            color.repeat.set(repeat.x, repeat.y);
            color.colorSpace = SRGBColorSpace;
            color.needsUpdate = true;
        }

        if (texture.pbr.displace) {
            bump = await loader.loadAsync(formatUrl(texture.pbr.displace, resolution));
            bump.format = RGBAFormat;
            bump.wrapS = wrap;
            bump.wrapT = wrap;
            bump.anisotropy = anisotropy;
            bump.repeat.set(repeat.x, repeat.y);
            bump.needsUpdate = true;
            bump.colorSpace = NoColorSpace;
        }

        if (texture.pbr.normal) {
            normal = await loader.loadAsync(formatUrl(texture.pbr.normal, resolution));
            normal.format = RGBAFormat;
            normal.wrapS = wrap;
            normal.wrapT = wrap;
            normal.anisotropy = anisotropy;
            normal.repeat.set(repeat.x, repeat.y);
            normal.needsUpdate = true;
            normal.colorSpace = NoColorSpace;
        }

        if (texture.pbr.rough) {
            rough = await loader.loadAsync(formatUrl(texture.pbr.rough, resolution));
            rough.format = RGBAFormat;
            rough.wrapS = wrap;
            rough.wrapT = wrap;
            rough.anisotropy = anisotropy;
            rough.repeat.set(repeat.x, repeat.y);
            rough.needsUpdate = true;
            rough.colorSpace = NoColorSpace;
        }

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

        if (texture.pbr.coat) {
            coat = await loader.loadAsync(formatUrl(texture.pbr.coat, resolution));
            coat.format = RGBAFormat;
            coat.wrapS = wrap;
            coat.wrapT = wrap;
            coat.anisotropy = anisotropy;
            coat.repeat.set(repeat.x, repeat.y);
            coat.colorSpace = NoColorSpace;
            coat.needsUpdate = true;
        }

        if (texture.pbr.coatRough) {
            coatRoughness = await loader.loadAsync(formatUrl(texture.pbr.coatRough, resolution));
            coatRoughness.format = RGBAFormat;
            coatRoughness.wrapS = wrap;
            coatRoughness.wrapT = wrap;
            coatRoughness.anisotropy = anisotropy;
            coatRoughness.repeat.set(repeat.x, repeat.y);
            coatRoughness.colorSpace = NoColorSpace;
            coatRoughness.needsUpdate = true;
        }

        if (texture.pbr.coatNormal) {
            coatNormal = await loader.loadAsync(formatUrl(texture.pbr.coatNormal, resolution));
            coatNormal.format = RGBAFormat;
            coatNormal.wrapS = wrap;
            coatNormal.wrapT = wrap;
            coatNormal.anisotropy = anisotropy;
            coatNormal.repeat.set(repeat.x, repeat.y);
            coatNormal.colorSpace = NoColorSpace;
            coatNormal.needsUpdate = true;
        }

        if (texture.pbr.specular) {
            specular = await loader.loadAsync(formatUrl(texture.pbr.specular, resolution));
            specular.format = RGBAFormat;
            specular.wrapS = wrap;
            specular.wrapT = wrap;
            specular.anisotropy = anisotropy;
            specular.repeat.set(repeat.x, repeat.y);
            specular.colorSpace = NoColorSpace;
            specular.needsUpdate = true;
        }

        const material = new MeshPhysicalMaterial({
            map: color,
            envMap: environment,
            envMapIntensity: 1,
            metalnessMap: metal,
            metalness: metal ? 1 : 0,
            roughnessMap: rough,
            roughness: 1,
            normalMap: normal,
            normalScale: new Vector2(0.2, 0.2),
            bumpMap: bump,
            specularColor: new Color("#ffffff"),
            clearcoatMap: coat,
            clearcoatRoughnessMap: coatRoughness,
            clearcoatNormalMap: coatNormal,
            specularIntensity: 1,
            specularIntensityMap: specular,
            ior: 1.52,
            bumpScale: 1,
            aoMap: ao,
            aoMapIntensity: ao ? 1 : 0,
            // shadowSide: DoubleSide,
        });

        rough?.dispose();
        normal?.dispose();
        color?.dispose();
        bump?.dispose();
        ao?.dispose();
        metal?.dispose();
        coat?.dispose();
        coatNormal?.dispose();
        coatRoughness?.dispose();
        specular?.dispose();

        resolve(material);
    });
};
