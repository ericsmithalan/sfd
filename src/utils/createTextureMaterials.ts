import {
    DoubleSide,
    Material,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
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

const loadTexture = async (
    url: string | null,
    resolution: TextureResolution,
    colorSpace: string = SRGBColorSpace,
): Promise<Texture | null> => {
    if (url) {
        const texture = await loader.loadAsync(formatUrl(url, resolution));
        texture.format = RGBAFormat;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        // texture.anisotropy = anisotropy;
        texture.repeat.set(1, 1);
        texture.colorSpace = colorSpace;

        return texture;
    }
    return null;
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
            const textr = await loadTexture(texture.basic.url, resolution);

            material = new MeshStandardMaterial({
                map: textr,
                metalness: texture.type === "metal" || texture.type === "hardware" ? 1 : 0,
                roughness: 0.4,
                shadowSide: DoubleSide,
            });

            if (textr) {
                textr.dispose();
            }

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
        let ao: Texture | null = await loadTexture(texture.pbr.ao, resolution);
        let metal: Texture | null = await loadTexture(texture.pbr.metal, resolution);
        let color: Texture | null = await loadTexture(texture.pbr.diffuse, resolution);
        let bump: Texture | null = await loadTexture(texture.pbr.displace, resolution);
        let normal: Texture | null = await loadTexture(texture.pbr.normal, resolution);
        let rough: Texture | null = await loadTexture(texture.pbr.rough, resolution);
        let coat: Texture | null = await loadTexture(texture.pbr.coat, resolution);
        let coatRoughness: Texture | null = await loadTexture(texture.pbr.coatRough, resolution);
        let coatNormal: Texture | null = await loadTexture(texture.pbr.coatNormal, resolution);
        let specular: Texture | null = await loadTexture(texture.pbr.specular, resolution);

        const material = new MeshPhysicalMaterial({
            map: color,
            envMap: environment,
            envMapIntensity: 0.6,
            metalnessMap: metal,
            // metalness: metal ? 1 : 0,
            roughnessMap: rough,
            // sheenColorMap: rough,
            // roughness: 1,
            // anisotropy: 1,
            normalMap: normal,
            normalScale: new Vector2(0.2, 0.2),
            bumpMap: bump,
            // sheen: 1,
            // sheenColor: new Color("red"),
            // thickness: 0,
            // specularColor: new Color("#ffffff"),
            clearcoatMap: coat,
            clearcoatRoughnessMap: coatRoughness,
            clearcoatNormalMap: coatNormal,
            // specularIntensity: 1,
            specularIntensityMap: specular,
            reflectivity: 1,
            // iridescenceThicknessRange
            ior: 1.5,
            // specularIntensity: 10,
            // bumpScale: 1,
            aoMap: ao,
            // aoMapIntensity: ao ? 1 : 0,
            shadowSide: DoubleSide,
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
