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
const loader = new TextureLoader();
const formatUrl = (url: string, highDef: boolean) => {
    const resolution = highDef ? "3k" : "1k";
    if (highDef) {
        return `${url}-${resolution}.png`;
    }

    return `${url}-${resolution}.png`;
};

export const createTextureMaterials = async (
    texture: ITexture,
    environment: Texture | null,
    highDef: boolean,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        let material: Material;

        if (highDef) {
            material = await getPBRTexture(texture, environment, highDef);
            resolve(material);
        } else {
            const textr = await loader.loadAsync(formatUrl(texture.basic.url, highDef));
            textr.wrapS = RepeatWrapping;
            textr.wrapT = RepeatWrapping;
            textr.colorSpace = SRGBColorSpace;

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
    highDef: boolean,
): Promise<Material> => {
    return new Promise(async (resolve) => {
        const anisotropy = 0.3;
        const wrap = RepeatWrapping;
        const repeat = new Vector2(10, 24);

        const color = await loader.loadAsync(formatUrl(texture.pbr.color, highDef));
        color.format = RGBAFormat;
        color.wrapS = wrap;
        color.wrapT = wrap;
        color.anisotropy = anisotropy;
        color.repeat.set(repeat.x, repeat.y);
        color.colorSpace = SRGBColorSpace;
        color.needsUpdate = true;

        const bump = await loader.loadAsync(formatUrl(texture.pbr.bump, highDef));
        bump.format = RGBAFormat;
        bump.wrapS = wrap;
        bump.wrapT = wrap;
        bump.anisotropy = anisotropy;
        bump.repeat.set(repeat.x, repeat.y);
        bump.needsUpdate = true;
        bump.colorSpace = NoColorSpace;

        const normal = await loader.loadAsync(formatUrl(texture.pbr.normal, highDef));
        normal.format = RGBAFormat;
        normal.wrapS = wrap;
        normal.wrapT = wrap;
        normal.anisotropy = anisotropy;
        normal.repeat.set(repeat.x, repeat.y);
        normal.needsUpdate = true;
        normal.colorSpace = NoColorSpace;

        const rough = await loader.loadAsync(formatUrl(texture.pbr.rough, highDef));
        rough.format = RGBAFormat;
        rough.wrapS = wrap;
        rough.wrapT = wrap;
        rough.anisotropy = anisotropy;
        rough.repeat.set(repeat.x, repeat.y);
        rough.needsUpdate = true;
        rough.colorSpace = NoColorSpace;

        let ao: Texture | null = null;
        let metal: Texture | null = null;
        let normalBump: Texture | null = null;
        let normalRough: Texture | null = null;

        if (texture.pbr.metal) {
            metal = await loader.loadAsync(formatUrl(texture.pbr.metal, highDef));
            metal.format = RGBAFormat;
            metal.wrapS = wrap;
            metal.wrapT = wrap;
            metal.anisotropy = anisotropy;
            metal.repeat.set(repeat.x, repeat.y);
            metal.colorSpace = NoColorSpace;
            metal.needsUpdate = true;
        }

        if (texture.pbr.ao) {
            ao = await loader.loadAsync(formatUrl(texture.pbr.ao, highDef));
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
            normalScale: new Vector2(0.2, 0.2),
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
