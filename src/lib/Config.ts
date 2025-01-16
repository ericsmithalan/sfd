import {
    Color,
    NeutralToneMapping,
    PCFSoftShadowMap,
    ShadowMapType,
    ToneMapping,
    Vector3,
} from "three";

export interface IConfig {
    scene: {
        name: string;
        backgroundColor: Color;
    };
    camera: {
        near: number;
        fov: number;
        far: number;
        defaultPosition: Vector3;
        up: Vector3;
        zoom: number;
        name: string;
    };
    renderer: {
        antialias: boolean;
        alpha: boolean;
        shadowMap: boolean;
        toneMapping: ToneMapping;
        toneMappingExposure: number;
        shadowMapType: ShadowMapType;
    };
    selection: {
        helperName: string;
        borderColor: Color;
        tranformScale: Vector3;
        transformHelperName: string;
    };
    views: {
        debug: boolean;
    };
}

export const Config: IConfig = {
    scene: {
        name: "Scene",
        backgroundColor: new Color("#333333"),
    },
    camera: {
        fov: 40,
        near: 0.1,
        far: 100,
        defaultPosition: new Vector3(5, 2, 4),
        up: new Vector3(0, 0, 1),
        zoom: 2,
        name: "Camera",
    },
    renderer: {
        antialias: true,
        alpha: true,
        shadowMap: true,
        toneMapping: NeutralToneMapping,
        toneMappingExposure: 1,
        shadowMapType: PCFSoftShadowMap,
    },
    selection: {
        helperName: "Selection Helper",
        borderColor: new Color("red"),
        tranformScale: new Vector3(0.7, 0.7, 0.7),
        transformHelperName: "Transform Helper",
    },
    views: {
        debug: false,
    },
};
