import {
    Color,
    NeutralToneMapping,
    PCFSoftShadowMap,
    ShadowMapType,
    ToneMapping,
    Vector3,
} from "three";
import { IRootOutliner } from "./interface";

export interface IConfig {
    rootOutliner: Array<IRootOutliner>;
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
    rootOutliner: [
        {
            id: "16fb15fe-b194-4eaa-8983-14275479ef12",
            name: "Bunk Beds",
            models: [
                {
                    url: "models/bunks/beds.glb",
                    id: "1e70bd1c-7f2c-42b5-aae2-36dd544b9eef",
                    name: "Beds",
                    children: [],
                },
                {
                    url: "models/bunks/mockups.glb",
                    id: "c6d2e5f4-8650-42e3-a9ea-fb17f97df556",
                    name: "Mockups",
                    children: [],
                },
            ],
        },
        {
            id: "16fb15fe-b194-4eaa-8983-142ds329ef12",
            name: "Cabinet",
            icon: "stack",
            models: [
                {
                    url: "models/john/case-1.glb",
                    id: "1e70bd1c-7f2c-42b5-34sd-36dd544b9eef",
                    name: "Case",
                    children: [],
                    icon: "box",
                },
            ],
        },
    ],
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
